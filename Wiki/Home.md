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

## Resource coverage

| Resource | Methods |
|---|---|
| `api.lead` | search, create, read, update, delete, merge |
| `api.contact` | search, create, read, update, delete |
| `api.activity` | search |
| `api.activity.note` | search, create, read, update, delete |
| `api.activity.email` | search, create, read, update, delete |
| `api.activity.call` | search, create, read, update, delete |
| `api.activity.sms` | search, create, read, update, delete |
| `api.activity.meeting` | search, create, read, update, delete |
| `api.activity.whatsapp_message` | search, create, read, update, delete |
| `api.activity.creation` | search, read _(read-only)_ |
| `api.activity.form_submission` | search, read _(read-only)_ |
| `api.activity.lead_status_change` | search, read _(read-only)_ |
| `api.activity.opportunity_status_change` | search, read _(read-only)_ |
| `api.activity.lead_merge` | search, read _(read-only)_ |
| `api.activity.task_completion` | search, read _(read-only)_ |
| `api.opportunity` | search, create, read, update, delete |
| `api.task` | search, create, read, update, delete |
| `api.custom_field.{lead\|contact\|opportunity\|activity\|custom_object_type}` | list, create, read, update, delete |
| `api.custom_field.shared` | list, create, read, update, delete + associations |
| `api.custom_field_schema` | read, update |
| `api.custom_activity` | search, create, read, update, delete |
| `api.custom_object_type` | list, create, read, update, delete |
| `api.custom_object` | list, create, read, update, delete |
| `api.user` | me, list, read, update, availability |
| `api.organization` | list, read, update |
| `api.membership` | list, create, read, update, delete |
| `api.role` | list, create, read, update, delete |
| `api.group` | list, create, read, update, delete |
| `api.pipeline` | list, create, read, update, delete |
| `api.status.lead` | list, create, read, update, delete |
| `api.status.opportunity` | list, create, read, update, delete |
| `api.email_template` | search, create, read, update, delete, render |
| `api.sms_template` | list, create, read, update, delete |
| `api.saved_search` / `api.smart_view` | list, create, read, update, delete |
| `api.sequence` | search, create, read, update, delete |
| `api.sequence_subscription` | list, create, read, update, delete |
| `api.report` | activity_metrics, activity, sent_emails, lead_statuses, opportunity_statuses, custom, custom_fields, funnel_totals, funnel_stages |
| `api.event` | search, read |
| `api.webhook` | list, create, read, update, delete |
| `api.email_thread` | list, read |
| `api.connected_account` | list, read |
| `api.comment` | list, create, read, update, delete |
| `api.comment_thread` | list, read |
| `api.file` | upload |
| `api.unsubscribed_email` | list, create, delete |
| `api.outcome` | list, create, read, update, delete |
| `api.integration_link` | list, create, read, update, delete |
| `api.export` | list, read, lead, opportunity |
| `api.field_enrichment` | enrich |
| `api.scheduling_link` | list, create, read, update, delete |
| `api.phone_number` | list, create |
| `api.dialer` | list, create, read, update, delete |
| `api.send_as` | list, create, read, update, delete |
| `api.bulk` | delete, email, update, action + emails/edits/deletes/sequence_subscriptions |

## Changelog

### v2.0.0
- Added **Comments** and **Comment Threads** (`api.comment`, `api.comment_thread`)
- Added **File upload** (`api.file.upload`)
- Added **SMS Templates** (`api.sms_template`)
- Added **Email Template render** (`api.email_template.render`)
- Added **Unsubscribed Emails** (`api.unsubscribed_email`)
- Added **Outcomes** (`api.outcome`)
- Added **Integration Links** (`api.integration_link`)
- Added **Memberships**, **Roles**, **Groups** (`api.membership`, `api.role`, `api.group`)
- Added **Exports** (`api.export.lead`, `api.export.opportunity`)
- Added **Field Enrichment** (`api.field_enrichment.enrich`)
- Added **Scheduling Links** (`api.scheduling_link`)
- Added **Phone Numbers** (`api.phone_number`)
- Added **Dialer** (`api.dialer`)
- Added **Send As** (`api.send_as`)
- Added **Shared Custom Fields** + associations (`api.custom_field.shared`)
- Added **Custom Field Schema** (`api.custom_field_schema`)
- Added **User Availability** (`api.user.availability`)
- Added system read-only activity types: `creation`, `form_submission`, `lead_status_change`, `opportunity_status_change`, `lead_merge`, `task_completion`
- Fixed: **SMS** now supports `update`
- Extended **Bulk Actions** with structured sub-resources (`api.bulk.emails`, `api.bulk.edits`, `api.bulk.deletes`, `api.bulk.sequence_subscriptions`)
