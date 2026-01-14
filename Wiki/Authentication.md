# Authentication

Close API keys use **HTTP Basic Authentication**.

## API base URL

Default base URL:

- `https://api.close.com/api/v1`

This is also the default for `closecrm-node`.

## How the API key is sent

Per the Close docs, the API key acts as the username and the password is empty. That means the Basic Auth value is base64 of:

- `YOUR_API_KEY:` (note the trailing colon)

## Using this library

```js
const Closecom = require('closecrm-node');

const api = new Closecom(process.env.CLOSE_API_KEY);

const me = await api.user.me();
```

## OAuth?

This library is primarily built around API keys. If you need to build a public app, refer to Close’s OAuth docs.

Reference: https://developer.close.com/topics/authentication/
