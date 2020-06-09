# eos
eosjs wrapper that bundles eosjs eosjs-ecc

## Install the dependencies
```bash
yarn add @piecesnbits/eos
```
or

```bash
npm install @piecesnbits/eos
```

```bash
const {Eos} = require("@piecesnbits/eos");
const eos = new Eos([/*rpc nodes*/], [/*optional private keys*/] );
...
eos.api.transact({actions: actions}, {blocksBehind: 3, expireSeconds: 300, broadcast: true});
...
```
