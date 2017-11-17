# Events
Events are the heart of Sprucebot. They are what make your Skill powerful. Example; texting "Welcome to ``${`user.Location.name`}``, ``${`user.User.firstName || user.User.name`}``!" is way more powerful when it's sent on `did-arrive`!

## Core Events
These events are built in. The `event` data is always the same.

 * `did-signup` - When a guest joins wifi at a location for the first time
 * `did-enter` - When a guest returns and their phone hits the wifi
 * `did-leave` - Triggered an hour after a guest leaves
 * `did-message` - A guest has sent a text to Sprucebot
 * `did-add-device` - When a guest adds a new device to a location. Like adding their laptop.

## Listening to events


## Event Model

```js

```