# Application config
[Full Documentation](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

Node-config reads configuration files in the ./config directory for the running process, typically the application root. This can be overridden by setting the $NODE_CONFIG_DIR environment variable to the directory containing your configuration files.

$NODE_CONFIG_DIR can be a full path from your root directory, or a relative path from the process if the value begins with ./ or ../.

## Whitelisting config variables for interface pages
Remove one or more keys from they client.json that gets exported to the browser. Use this as a chance to keep your secrets safe.

`config.sanitizeClientConfig()`
```javascript
// config/default.js
const config = {
    public: 'delivered to browser',
    key: {
        path: 'sensative data'
    },
    sanitizeClientConfig:
        (config) => omit(config, ['key.path'])
}
// interface/client.json
// {
//    "public": "delivered to browser",
// }
```