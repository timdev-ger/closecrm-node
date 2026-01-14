# Pagination

Close uses `_skip` and `_limit` to paginate list/search endpoints.

## Basic pagination

Example (100 per page):

- Page 1: `?_skip=0&_limit=100`
- Page 2: `?_skip=100&_limit=100`
- Page 3: `?_skip=200&_limit=100`

Responses usually look like:

```json
{
  "data": [ /* items */ ],
  "has_more": true
}
```

## Using this library

You can use either the Close style (`_skip`, `_limit`) or the convenience aliases (`skip`, `limit`).

```js
const res = await api.lead.search({
  query: 'company:"Acme"',
  limit: 100,
  skip: 0
});

console.log(res.data.length, res.has_more);
```

## Deep pagination notes

Close warns that very large `_skip` values can be inefficient or even blocked (max `_skip` varies by resource). For large exports, consider:

- reducing the dataset per request (e.g. using a `date_created` range)
- using the Export API

Reference: https://developer.close.com/topics/pagination/
