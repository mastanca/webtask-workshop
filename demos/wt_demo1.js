// Download the cli at https//webtask.io/cli
// wt serve to run locally
// wt create to upload to auth0

module.exports = function(ctx, cb) {
    console.log("Webhook Invoked");
    cb(null, {hello: ctx.data.name || 'Anonymaus'});
}