# Storage

Sometimes webtasks need to persist state. Auth0 Webtasks includes a built in [storage API](https://webtask.io/docs/storage) that you can use within your tasks. You can persist and retreive a single JSON object in the store that is <= 500KB in size. Storage also supports concurrency, to prevent loss of data. It's use is primarly to maintain lightweight and transient state. To access storage you use the `storage` object on the `context`. 

For the slack example, you can imagine using storage to keep a counter of issues created for each repo. This is a good fit as the number of repos should be relatively small.

You'll change the task to persist a counter for each repo, and you'll add logic to allow retrieving the stats.

First you'll add the code, and then we'll review the new parts.

```javascript
module.exports = function(ctx, cb) {
  var slack = require("slack-notify")(ctx.secrets.SLACK_URL);
  var body = ctx.body;
  var attempts;
  
  if (ctx.data.showstats === "true") {
    return getStats();
  }
  else if (body.issue && body.action === "opened") {
    console.log("issue created");
    var issue = body.issue;

    var text='*New Issue*\n\n' + 
             `Repository: ${body.repository.full_name}\n` +
             `Number: ${issue.number}\n` +
             `Url: ${issue.url}\n` +
             `Title: ${issue.title}\n\n` +
             `${issue.body}`;
             
    slack.send({text:text, username: "webtask-bot", icon_emoji: ":robot_face:"}); 
    incrementCounter();
  }

  function incrementCounter() {
    ctx.storage.get(function(error, data){
      if (data === undefined) {
        data={};
      }
      var repoName = body.repository.full_name
      data[repoName] === undefined ? data[repoName] = 1 : data[repoName]++;
      attempts = 3 ;
      ctx.storage.set(data, function(error) {
        setStorage(error, data);
      });
    });
  }
  
  function setStorage(error,data) {
    if(error) {
      if (error.code == 409 && attempts--) {
        data.counter = Math.max(data.counter, error.conflict.counter) + 1;
        return ctx.storage.set(data, setStorage);
      }
      else {
        return cb(error);
      }
    }
    cb();
  }
  
  function getStats() {
    ctx.storage.get(function(error,data){
      cb(null, data); 
    });
  }
}; 
```

Now to what the new code does:

* When the request is received, if the query string value of "getstats" is true, then any collected stats will be returned. The `get` function of Storage retrieves the persisted data object. If data has not previously been set then it will return undefined.
* After the Slack event is created:
 * The `get` function will be used to retrieve the data.
 * If no data was stored, then data will be initialized as an empty JSON object.
 * On the data object, the value for the repo name key will be incremented by 1. If it was previously undefined, then it will be initialized to 1.
 * The data object will be persisted using the `set` function on Storage.
 * If there is a 409 conflict (meaning another instance of the task updated storage AFTER this instance read the data), then it will resolve the conflict by choosing the greatest number between the current value and the conflicting value. It will then add 1 and try again.
 * After 3 total attempts to resolve it will return an error.