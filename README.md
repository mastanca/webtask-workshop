# Introduction to Webtask

## Webtask
Webtask is a platform for easily creating a serverless HTTP Endpoint / Webhook. Webtask executes node.js code in a secure and safe manner. There's no servers to deploy, no tools you have to install, just code. 

* Every Webtask is an HTTP endpoint
* Simple Node.js programming model
* High fidelity of HTTP, Webtasks can even return HTML
* 1000+ node modules available out of the box, support for any node module with package.json
* Rich browser based editing experience
* Middleware 
* Multi-tenant
* Extremely low latency

## How does it differ from other Serverless offerings.

* Designed from scratch for web-based / user interactions rather than plumbing between backend services.
* Specialized for Node.js
* Low configuration
* Highly customizable

## Hello Webtask

Let's jump in and create your first Webtask. Open your browser to [https://webtask.io/make](https://webtask.io/make)

This will give you a prompt to log in. Choose any of the credentials listed.

<a href="https://webtask.io/images/docs/editor/wt-editor-login.png" target="_blank"><img src="https://webtask.io/images/docs/editor/wt-editor-login.png" width="50%"/></a>

After you have logged in, you'll be taken to the Webtask `Create New` screen.

<a href="https://webtask.io/images/docs/editor/wt-editor-create.png" target="_blank"><img src="https://webtask.io/images/docs/editor/wt-editor-create.png" width="50%"/></a>

From here you can choose the type of Webtask to create. For now just choose "Webtask". You'll then be prompted for a name for your Webtask, enter `wt1` and click `Save`. Once you do you'll be taken right to the Webtask editor with a starter Webtask.

<a href="https://webtask.io/images/docs/editor/wt-editor-newtask.png" target="_blank"><img src="https://webtask.io/images/docs/editor/wt-editor-newtask.png" width="50%"/></a>

This Webtask outputs a JSON object with a `hello` property and a value of either Anonymous or the `name` query string value. Notice the two params of the function. `ctx` is the Webtask Context object. We'll come back to this later. The second param is `cb` which is the callback. The callback accepts two params `error` and `body` and must be called when the task completes execution, in order to return some data and a resposne code.

Go run it. Click on the `play` button <img src="https://cloud.githubusercontent.com/assets/141124/26714892/55023a52-4728-11e7-9026-03d9f6bcd2d3.png"/> which will bring up the runner. Now click `Run`. You'll see you Webtask is instantly executed and the message `{"hello":"Anonymous"}` is returned in the Runner window.

<img src="https://cloud.githubusercontent.com/assets/141124/26714955/a0a7f1ae-4728-11e7-96e1-d5b3d71c401d.png"/>

Now click on the Gear icon in the upper right of the runner.

Click on URL Params(0) and you will get an area to enter query string key/value pairs. Put the parameter `name` and then your name for the value

<img src="https://cloud.githubusercontent.com/assets/141124/26715131/52a3e296-4729-11e7-90db-616318770e29.png"/>

Then run it again. You'll see that the name is outputted.

<img src="https://cloud.githubusercontent.com/assets/141124/26715198/9a4e089c-4729-11e7-8c88-f9fc9139c79d.png"/>

Notice also the realtime log viewer that show each time the task is executed and how the long the execution takes.

<img src="https://cloud.githubusercontent.com/assets/141124/26715348/40428aa2-472a-11e7-84e5-0d1fbde9b282.png"/>


## Calling a Webtask from the browser
Each Webtask you create is automatically an HTTP endpoint. There's no special configuration, as soon as you create it, it is available over HTTP.

Let's try this out. If you look in the editor, you'll see a url with a copy/paste button. Press it and it will copy your URL to the clipboard.

<img src="https://cloud.githubusercontent.com/assets/141124/26715476/bb686abc-472a-11e7-96d1-c0f9be65396a.png"/>

Now open up a seperate browser tab and paste that URL in your address bar and hit `return`. You'll see your Webtask return the anonymous result.

```javascript
{
    hello: "Anonymous"
}
```

Now go modify the URL and add the name param i.e. `?name=Glenn` (using your name). Hit `return` and you'll see as before that your name is returned.

```javascript
{
    hello: "Glenn"
}
```

## Using a Webtask as a Webhook
That URL can now easily be plugged in as a Webhook. You can try that out using one of our favorite Webhook based services, Github.

First modify the code of your Webtask and add a `console.log` statement in the code. This will send output to the log viewer. The code shoud look like the following

```javascript
module.exports = function(ctx, cb) {
  console.log("Webhook invoked");
  cb(null, { hello: ctx.data.name || 'Anonymous' });
};
```

Save the Webtask. Open a new tab to Github and create a new repo, or choose an existing fork / personal repo that you can modify. Go the `settings` page on the repo and then click `Webhooks`

<a href="https://cloud.githubusercontent.com/assets/141124/26735390/ad0835a0-4776-11e7-8dcb-4ceb2e5d96be.png" target="_blank"><img src="https://cloud.githubusercontent.com/assets/141124/26735390/ad0835a0-4776-11e7-8dcb-4ceb2e5d96be.png" width="50%"/></a>

Now go click the `Add webhook` button to create a new Webhook. For the payload URL, paste in the URL of your Webtask which you copied earlier (without any query params). Change the content-type to application/json. For events, put `Send me everything`. Leave all the other values to their defaults. Then click `Add webhook`.

<a href="https://cloud.githubusercontent.com/assets/141124/26736562/898a51ee-477b-11e7-8297-90294b025e8c.png" target="_blank"><img src="https://cloud.githubusercontent.com/assets/141124/26736562/898a51ee-477b-11e7-8297-90294b025e8c.png" width="50%"/><a>

As soon as the Webhook is created, it will get invoked. Go check the log viewer for your Webtask and you should see the "Webhook invoked" message in the console.

<img src="https://cloud.githubusercontent.com/assets/141124/26736848/97815bac-477c-11e7-9db7-a264db858d7e.png"/>

# Simple management in the browser
## Opening an existing task

In the same way that you can create a task from the browser, you can also open an existing task. To do this you use `webtask.io/edit/[task]` as the url. 

To open the task you created before, use this url: [https://webtask.io/edit/wt1](https://webtask.io/edit/wt1). This will bring you right into the editor

## Listing tasks
You can also list tasks. To do this press `<CMD> + p` (Windows Key on Windows) which will display a list of tasks. 

## Filtering tasks
On the list is displayed you can type into the search bar to filter.

## Deleting tasks
From the list you can delete tasks by clicking on the trash icon next to each task.

You've just seen the basics of using the Webtask editor to create your first Webtask. You've then seen how to invoke the Webtask from the runner, in the browser, and then as a Github Webhook. Wasn't that easy? This is just scratching the surface. Now you'll learn how to use the CLI.

# The wt-cli
In the first section you authored a Webtask via the browser. Webtask also offers wt-cli to create, edit, and manage your webtasks from the command line. One advantage of the CLI is you can create tasks using your favorite text editor / IDE and then upload them. The CLI also allows you to run tasks locally and even debug them! 

## Installing the CLI
Head over to [https//webtask.io/cli](https://webtask.io/cli) and follow the instuctions to install and test the wt-cli. You will receive a code via email which you will need to enter into the CLI in order to activate it.

### Common CLI commands
The CLI will let you do a number of things. Here are the most common commands:

* ls - List Webtasks. `wt ls`
* create - Creates a new webtask based on an existing file. The prefix for the file is used as the Webtask name by default. `wt create wt1.js`
* edit - Edits an existing Webtask in the Webtask editor. If no args are passed, then it will create a new Webtask in the editor. `wt edit wt1`
* mv - Renames a webtask. `wt mv wt1 wt2`
* logs - View realtime logs `wt logs`
* serve - Runs a webtask locally `wt serve wt1.js`
* debug - Debugs a webtask locally.

### Using the CLI
Now you'll do some basic things with the cli.

#### List
First list out your webtasks.

```bash
wt ls
```

If you just created your account today, you should see 2 tasks listed, the one we created the in the browser `wt1` and the second one you created in the cli.


#### Edit
Let's edit the first one.

```bash
wt edit wt1
```

This should open up the editor to view your Webtask.

```bash
gbmac:workshop glennblock$ wt edit wt1
Attempting to open the following url in your browser:

https://webtask.it.auth0.com/edit/wt-glenn-block-gmail-com-0#/...

If the webtask editor does not automatically open, please copy this address and paste it into your browser.
gbmac:workshop glennblock$
```

#### Serve
Next you'll create a task locally. Using your favorite editor, let's create a new task file `wt2.js`. Put the same task that you used earlier:

```javascript
module.exports = function(ctx, cb) {
  console.log("Webhook invoked");
  cb(null, { hello: ctx.data.name || 'Anonymous' });
};
```

You can run the task locally.

```bash
wt serve wt2.js
```

You'll see a message indicating your task is running.

```bash
gbmac:workshop glennblock$ wt serve wt2.js
Your webtask is now listening for IPv4 traffic on 127.0.0.1:8080
```

Open your browser to `localhost:8080`. You'll see your task has executed and you got back the response

```javascript
{
    hello: "Anonymous"
}
```

#### Create
You can now upload it to the cloud.

```bash
wt create wt2.js.
```

This will immediately create your task and share the URL.

```bash
gbmac:workshop glennblock$ wt create wt2.js
Webtask created

You can access your webtask at the following url:

https://wt-glenn-block-gmail-com-0.run.webtask.io/wt2.js
```

#### Logs
Before invoking your task, you can start viewing realtime logs from the cli.

```bash
wt logs
```

This will output to show you that the stream is connected and waiting for output.

```bash
gbmac:workshop glennblock$ wt logs
[20:42:49.638Z]  INFO wt: connected to streaming logs (container=wt-glenn-block-gmail-com-0)
```

Now go copy the task URL and open it in the browser. When you do you will see the realtime logs are displayed.

```bash
[20:45:04.443Z]  INFO wt: new webtask request 1496436304360.977826
[20:45:04.483Z]  INFO wt: Webhook invoked
[20:45:04.483Z]  INFO wt: finished webtask request 1496436304360.977826 with HTTP 200 in 44ms
```

# Deeper dive into Webtasks
So far you've created Webtasks that write to the console, access query strings, and return simple payloads. That's fun, but not that useful in the real world. We'll now go deeper into what you can do with Webtask.

## Accessing the payload
The first Webtask you created `wt1` was wired up to a Github Webhook. When the Webhook fires the message `Webhook invoked` is outputted to the console from the Webtask. To really do anything useful, the Webtask needs to access the payload Github sends which gives details about the invocation. 

You already saw how using `ctx.data` you were able to access querys string params. Webtask also lets you access the body of the request. In you code, you can use `ctx.body` to get the body. `body` will either be a JSON object if the payload is JSON and content-type is 'application/json' OR it will be the raw payload.

Go and edit your first task using the cli. `wt edit wt1.js`. Modify the code so it outputs the body to the console, instead of a static message. To do this you're going to use the built in `util` node module. Webtask also supports 3rd party modules which we'll discuss later. You'll use the `util` module to output the JSON object that Github sends.

```javascript
var util = require('util');
module.exports = function(ctx, cb) {
  console.log(util.inspect(ctx.body, {depth:null}));
  cb();
};
```

Now go back to your github repo and make a change either editing a file, adding an issue, etc. As soon as you do, you should see the Webhook is invoked and the Github payload will appear in the console window.

<a href="https://cloud.githubusercontent.com/assets/141124/26745585/fd3aa7dc-479f-11e7-8405-c55c2d0454f8.png" target="_blank"><img src="https://cloud.githubusercontent.com/assets/141124/26745585/fd3aa7dc-479f-11e7-8405-c55c2d0454f8.png" width="70%"/></a>

## Secrets
A very common use case for Webtask is to be a bridge between another service. For example you might want to send a notification to a Slack channel whenever an issue is filed in a Github repo. Using Webtask provides a real easy way to handle this kind of logic. 

In order to send to Slack though, you will need to provide an SLACK URL. This URL is a secret, similar to an API key that would use to talk to a service like Twilio, or it may be connection string information to connect to a Database. Generally you don't want this kind of information sitting in the code. For one thing it is a security risk to have keys loosely exposed in text. Another is it makes the code hard to reuse and test.

Webtask lets you store this kind of information seperately from the code in a secure manner using `Secrets`. Each Webtask can have one or more secrets with are then accessible off of the `secrets` param of the context object. Secrets are useful for more than just secure keys and connection strings, you can use them for general configuration as well.

You'll now see how you can use secrets to connecting your Webtask to Slack. Before you move forward the first thing you need is an incoming Slack URL. If one is not provided to you, you can create one in any Slack group that you are an admin. Once you have the URL, copy it to the clipboard.

<img src="secrets"/>

Now you'll go add a Secret. In the editor (editing wt1) you can create Secrets using the Secrets panel. Click on the `Key` icon and then select `Secrets`. The Secrets panel will be displayed. Add a new secret called `SLACK_URL` and then place the URL you copied to the clipbard as the value. Click `Save` to save your secret.

As mentioned earlier, secrets can be accessed of the Context object using the name. To access the `SLACK_URL` you can use the code `ctx.secrets.SLACK_URL`.

To put everything together you now need to add logic to your task to send to Slack whenever there is an issue. For the actual sending to Slack you're going to take advantage of a 3rd party node module, `slack-notify`. Webtask has over 1000 modules available out of the box without any configuration, which you can just `require`. `slack-notify` is one such modules. We'll cover much more about Module later including how you can access ANY npm module.

Below is the updated code to send to Slack.


```javascript
module.exports = function(ctx, cb) {
  var slack = require("slack-notify")(ctx.secrets.SLACK_URL);
  var body = ctx.body;
  if (body.issue && body.action === "opened") {
    var issue = body.issue;

    var text=`Repository: ${body.repository.full_name}\n` +
             `Id: ${issue.id}\n` +
             `Url: ${issue.url}` +
             `Title: ${issue.title}\n\n` +
             `${issue.body}`;

    slack.send({channel:"#github", title:"New issue"}); //put your channel here.
  }
  cb();
};
```
