# Building your first skill
Before you can build a skill, you must email `scientists@sprucelabs.ai` to receive your skill's `ID`, `API_KEY`, and `slug`. Having to do this is temporary.

- Clone this repository
- Rename the `sprucebot-skills-kit` directory to your new `slug`
    - Slug is the hyphen separated name of your skill
    - VIP Alerts -> vip-alerts
    - Scratch & Win -> scratch-win
- Delete `.git` folder
- Copy `.env.example` to `.env` and configure it
- Run `yarn install`
- Run `yarn run local`

## Env
Below is a description of every setting in your `.env` and a description of what each setting does.`

* `DEV_MODE` - (Bool) Show's `DevControls` so you can switch roles easily for testing. Keep true when running locally, but never in production!
* `API_HOST` - (String) Where is Sprucebot's API hosted? Best to leave as is.
* `API_SSL_ALLOW_SELF_SIGNED` - (Bool) Only relevant to core Sprucebot developers. Allows us to test using self signed certificates. Best to leave as is.
* `ID` - (UUID4) Your skill's id.
* `NAME` - (String) Your skill's name, make it short and sweet
* `DESCRIPTION` - (String) Describe your skill in as few words as possible.
* `VIMEO_ID` - (Number) Before a skill can go public, it needs a good marketing video. It must be hosted on Vimeo. Get the video`s id from the URL.
* `PORT` - (Number) The port `Server` will using when serving.
* `SERVER_HOST` - (String) When the `Interface` is making requests, it'll look here.
* `INTERFACE_HOST` - (String) How do we reach your `Interface`? Usually the same as above.
* `INTERFACE_SSL_ALLOW_SELF_SIGNED` - (Bool) If you are hosting your interface using a self signed cert. Best to leave false.

## Tunneling
In order to work inside of Sprucebot, you will need a tunnel (such as [ngrok](ngrok.io)). Here is how we would set ourselves up.

First we would start ngrok and point it to port `3006`.

```bash
ngrok http 3006
```

It'll output something like:
```bash
Forwarding https://whatever.ngrok.io -> localhost:3006    
```

* `PORT=3006` 
* `SERVER_HOST=https://whatever.ngrok.io`
* `INTERFACE_HOST=https://whatever.ngrok.io`


Now you can visit `API_HOST` (https://hello.sprucebot.com) directly and navigate to your `Location` and enable your skill.

# What's next?
Now that you're up and running, dive into the [`server`](server.md) guide.