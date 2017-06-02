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

From here you can choose the type of Webtask to create. For now just choose "Webtask". You'll then be prompted for a name for your Webtask, after you enter it, click `Save`. Once you do you'll be taken right to the Webtask editor with a starter Webtask.

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

Head over to Github and create a new repo, or choose an existing fork / personal repo that you can modify. Go the `settings` page on the repo and then click `Webhooks`

<a href="https://cloud.githubusercontent.com/assets/141124/26735390/ad0835a0-4776-11e7-8dcb-4ceb2e5d96be.png" target="_blank"><img src="https://cloud.githubusercontent.com/assets/141124/26735390/ad0835a0-4776-11e7-8dcb-4ceb2e5d96be.png"/></a>


## Summary

You've just seen the basics of using the Webtask editor and created your first Webtask. Wasn't that easy? This is just scratching the surface.
