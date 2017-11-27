# Building your first skill
Before you can build a skill, you must email `scientists@sprucelabs.ai` to receive your skill's `ID`, `API_KEY`, and `slug`. This process will be automated soon.

- Clone the `sprucebot-skills-kit` repository
- Rename the `sprucebot-skills-kit` directory to your new `slug`
    - Slug is the hyphen separated name of your skill
    - VIP Alerts -> vip-alerts
    - Scratch & Win -> scratch-win
- Delete `.git` folder
- Modify `name` and `description` in `package.json`
- Copy `.env.example` to `.env` and configure it
- `yarn install`
- `yarn run local`

## Env
Below is a description of every setting in your `.env` and a description of what each setting does.`

* `DEV_MODE` - (Bool) Show's `DevControls` so you can switch roles easily for testing. Keep true when running locally, but never in production!
* `API_HOST` - (String) Where is Sprucebot's API hosted? Best to leave as is.
* `API_SSL_ALLOW_SELF_SIGNED` - (Bool) Only relevant to core Sprucebot developers. Allows us to test using self signed certificates. Best to leave as is.
* `ID` - (UUID4) Your skill's id.
* `NAME` - (String) Your skill's name, make it short and sweet
* `DESCRIPTION` - (String) Describe your skill in as few words as possible.
* `VIMEO_ID` - (Number) Before a skill can go public, it needs a good marketing video. It must be hosted on Vimeo. Get the video's id from the URL.
* `PORT` - (Number) The port `Server` will using when serving.
* `SERVER_HOST` - (String) When the `Interface` is making requests, it'll look here.
* `INTERFACE_HOST` - (String) How do we reach your `Interface`? Usually the same as above.
* `INTERFACE_SSL_ALLOW_SELF_SIGNED` - (Bool) Leave `false` unless you are hosting using a self-signed cert. Always leave `false` in production.

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

Next, we would drop our ngrok url into our `.env.`. Notice the `PORT` should match (3006 in our case).

* `PORT=3006` 
* `SERVER_HOST=https://whatever.ngrok.io`
* `INTERFACE_HOST=https://whatever.ngrok.io`


Now you can visit `API_HOST` (https://hello.sprucebot.com) directly and navigate to your `Location` and enable your skill.

## Debugging
This kit comes with a `.vscode` folder with a `launch.json` configured for debugging with [Visual Studio Code](https://code.visualstudio.com). Simply open this project in VS Code and start launch the debugger.

## File Structure
 * `.vscode` - Settings for `Visual Studio Code`, our preferred IDE
 * `config` - Per environment settings, managed via [config](https://github.com/lorenwest/node-config)
 * `coverage` - Testing courtesy [Jest](https://facebook.github.io/jest/). No need to touch anything here.
 * `docs` - All the docs you could ever want!
 * [`interface`](interface.md) - Holds your React pages. Powered by [Nextjs](https://github.com/zeit/next.js/). 
    * `.next` - Caching for Nextjs.
    * `components` - Anything reusable that will not contain much (if any) logic.
    * `.containers` - Logic containing `components`. Most of the time a `container` will render one or more `components`, passing `props` down.
    * `lang` - Language control.
    * `pages` - Each page of your `interface`. Rendered using Nextjs.
    * `store` - `Actions` and `reducers`. Powered by [react-redux](https://github.com/reactjs/react-redux)
        * `actions` - Where your `https` requests are made (or state is changed in any way).
        * `reducers` - How your app handles those `https` requests (or state changes).
 * `node_modules` - You know this one.
 * [`server`](server.md) - Backend powered by [sprucebot-skills-kit-server](https://github.com/sprucelabsai/sprucebot-skills-kit-server) + [koajs](http://koajs.com).
    * `controllers` - Where your routes are defined.
        * `1.0` - Helps to version your controllers
            * `guest` - All routes available to `guests`, `teammates`, and `owners`.
            * `owner` - All routes only available to `owners`.
            * `teammate` - Routes for `teammates` and `owners`
        * `cron.js` - Drop in logic that runs on a schedule.
    * `events` - All your event listeners.
    * `middleware` - Koajs middleware.
    * `models` - Models brought to you by [Sequelize](http://docs.sequelizejs.com).
    * `services` - Anything that is a long running, or I/O based operation, drop it in a `service`.
    * `static` - Host your flat files here. Available at `/${filename}`.
    * `utilities` - Any bit of code you need to use often that is synchronous.
    * `server.js` - Hands control over to `sprucebot-skills-kit-server`.
* `.babelrc` - Transpiling code.
* `.editorconfig` - Holds our formatting preferences.h
* `.env.example` - Your starter `.env` file.
* `.eslintrc` - Our [eslint](https://eslint.org) preferences. Formats code automatically!
* `.gitignore` - Files we don't want included in version control.
* `.nvmrc` - For user with [nvm](https://github.com/creationix/nvm) so we can always be using the same version of node.
* `.travis.yml` - Continuous integration with [Travis CI](https://travis-ci.org).
* `package.json` - Dependencies n' such.
* `README.md` - Readme about your skill.

# What's next?
Now that you're up and running, dive into the [`server`](server.md) guide to get yourself familiar with the backend.