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

This Webtask outputs a JSON object with a `hello` property and a value of either Anonymous or the `name` query string value.

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

You've just seen the basics of using the Webtask editor to create your first Webtask. You've then seen how to invoke the Webtask from the runner, in the browser, and then as a Github Webhook. Wasn't that easy? This is just scratching the surface.

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

First list out your webtasks.

```bash
wt ls
```

If you just created your account today, you should see 2 tasks listed, the one we created the in the browser `wt1` and the second one you created in the cli.

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

Next you'll create a task locally. Using your favorite editor, let's create a new task file `wt2.js`. Put the same task that you used earlier:

```javascript
module.exports = function(ctx, cb) {
  console.log("Webhook invoked");
  cb(null, { hello: ctx.data.name || 'Anonymous' });
};
```

You can test the task locally.

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
