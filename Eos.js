const { Api, JsonRpc, Serialize, RpcError } = require("@jafri/eosjs2");
const {JsSignatureProvider}  = require('@jafri/eosjs2/dist/eosjs-jssig');
const fetch = require("node-fetch");
const { TextEncoder, TextDecoder } = require("util");
const ecc = require('eosjs-ecc'); //https://github.com/EOSIO/eosjs-ecc

class Eos {
    constructor(nodes=[], private_keys=[]){
        console.log(`Eos initialize`)
        this.nodes = Array.isArray(nodes) ? nodes : [nodes];
        this.pks = Array.isArray(private_keys) ? private_keys : [private_keys];
        this.Serialize = Serialize;
        this.RpcError = RpcError;
        this.api = null;
        this.ecc = ecc;
        this.validatePks();
        this.build();
    }

    build(){
        const signatureProvider = this.pks.length ? new JsSignatureProvider(this.pks) : null;
        const rpc = new JsonRpc(this.nodes, { fetch });
        const api = new Api({
          rpc,
          signatureProvider,
          textDecoder: new TextDecoder(),
          textEncoder: new TextEncoder()
        });
        this.api = api;
    }

    switchNode(){
        if(this.nodes.length > 1){
            this.nodes.push(this.nodes.shift());
            this.build();
        }
        else{
            console.log(`Only one Rpc node available.`);
        }
    }

    setNode(rpc_node_url){
        //todo
    }

    validatePks(){
        for(let i = 0; i < this.pks.length; i++){
            if(this.ecc.isValidPrivate(this.pks[i]) === false){
                throw new Error("Invalid private key detected.");
            }
            else{
                console.log(`Private key #${i+1} validated`);
            }
        }
    }

}

module.exports = {
    Eos
};