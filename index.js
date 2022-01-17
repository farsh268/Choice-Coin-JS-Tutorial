// all examples are portray using es6;

import algosdk from  'algosdk'; //importing algosdk
import inquirer from 'inquirer'; // importing inquirer

// open a purestaker api and get a unique API KEY
const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
  "X-API-Key": "" //your API key gotten from purestake API, 
};
const algodClient = new algosdk.Algodv2(token, server, port); //connecting to algodclient

// create a testnet account with myalgowallet, keep the mmemonic key;
const mnemonic = 'YOUR MNEMONIC HERE'; //the mmemonic 25 characters seperated by a whitespace should be imported here

// get account from mmemonic key;
const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic); 

//choice coin asset ID 
const ASSET_ID = 21364625

// voting address
const voting_address = 'JJT4MJLJPNEWPO3B4DDTXP34B2DOVLIRY5O456M4T2I2RZUVWOC2ZCUSMQ' //input a voting address wallet you can send choice to, make sure choice is opt-in to receive votes

//Press '1' to vote for candidate 'one' and '0' to vote for candidate 'Zero"
const chooseVotingOption = async () => {
    inquirer.prompt(["Press 0 for candidate Zero or Press 1 for candidate One:"])
    .then((options) => {
        const option = options[0];
        let param = await algodClient.getTransactionParams().do(); //get params
        let encoder = new TextEncoder();  //message encoder
        if (option === "1") {
            try {
                let txn = await algosdk.makeAssetTransferTxnWithSuggestedParams(
                    recoveredAccount.addr,
                    voting_address,
                    undefined,
                    undefined,
                    1,
                    encoder.encode("Voting with Choice coin"),
                    ASSET_ID,
                    param
                )
            let signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk);
            const response = await algodClient.sendRawTransaction(signedTxn.blob).do();
        }

    
}
    })
}

    