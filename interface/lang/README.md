#Language support
All text output to a user should be a inside default.js.

Server
```js
const botName = cxt.getText('botName')
```

Client
```js
const botName = this.props.lang.getText('botName')
```