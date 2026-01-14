# Close.com Node.js Client – Wiki

Welcome to the Wiki for **`closecrm-node`** — a modern Node.js wrapper for the **Close.com REST API**.

This Wiki is structured so you can quickly see:

- which resources exist (Leads, Contacts, Activities, …)
- which methods the client exposes (search/list/read/create/update/delete)
- how pagination, rate limits, and error handling work

## Quick Links

- [Getting Started](./Getting-Started.md)
- [Authentication](./Authentication.md)
- [Client Basics (Requests, Params, Retries)](./Client-Basics.md)
- [Pagination](./Pagination.md)
- [Error Handling & Rate Limits](./Errors-and-Rate-Limits.md)
- [Resources (Overview)](./Resources.md)

## The basic idea

Create a client once, then use the resource objects:

```js
const Closecom = require('closecrm-node');

const api = new Closecom(process.env.CLOSE_API_KEY);

const me = await api.user.me();
const leads = await api.lead.search({ query: 'company:"Acme"', limit: 100 });
```

> Note: The official Close documentation is at https://developer.close.com
