# whmcs-node

A Typescript/Javascript API wrapper for WHMCS, using `ky` so it works in a browser environment.

## Example use

`yarn add @dan-online/whmcs-not-node`
`npm i @dan-online/whmcs-not-node`

```js
// typescript
import { WhmcsApi } from '@dan-online/whmcs-not-node';

// javascript
const { WhmcsApi } = require('@dan-online/whmcs-not-node');

const whmcs = new WhmcsApi({
  identifier: "",
  secret: "",
  apiUrl: "https://example.com/billing/includes/api.php"
});

whmcs.tickets.getTicketCounts({})
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
```
