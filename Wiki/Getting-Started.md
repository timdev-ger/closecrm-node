# Getting Started

This guide gets you from zero to your first API call.

## Requirements

- Node.js 18+ (this library uses the native `fetch()`)

## Install

```bash
npm install closecrm-node
```

## Create a client

```js
const Closecom = require('closecrm-node');

const api = new Closecom(process.env.CLOSE_API_KEY);
```

## First call: “Who am I?”

```js
const me = await api.user.me();
console.log(me);
```

## Project structure (what you get)

- **CommonJS** entry (`require('closecrm-node')`)
- Resources grouped by name, e.g. `api.lead`, `api.contact`, `api.activity.note`
- Built-in retry behavior for **429 Too Many Requests** (rate limiting)

## Next

- [Authentication](./Authentication.md)
- [Client Basics](./Client-Basics.md)
- [Resources Overview](./Resources.md)
