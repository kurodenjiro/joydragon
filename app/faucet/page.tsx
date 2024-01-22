"use client"
import React, { useState, useEffect , useCallback } from 'react';
import { providers, utils } from "near-api-js";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";
import {Image,Button ,Input} from "@nextui-org/react";
export default function FaucetPage() {
	const [addressFaucet, setAddressFaucet] = useState<any>(null)
	const [messages, setMessages] = useState<any>(null)
	const [hash, setHash] = useState<any>(null)
	const { selector, modal, accounts, accountId } = useWalletSelector();
	const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
	
	
	const handleChangeAddress = ( event : any )=> {
     
		setAddressFaucet(event.target.value);
	  };
			const onFaucet = async() => {
			//	const { contract } = selector.store.getState();
				const wallet = await selector.wallet();
				wallet
			  .signAndSendTransaction({
				signerId: accountId!,
				receiverId: "faucet.joychi.testnet",
				actions: [
				  {
					type: "FunctionCall",
					params: {
					  methodName: "get_joychi",
					  args: {addr_to:accountId},
					  gas: BOATLOAD_OF_GAS,
					  deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
					},
				  },
				],
			  })
			  .then((nextMessages:any) => {
				console.log(nextMessages);
				setHash(nextMessages.transaction.hash);
				setMessages(nextMessages.receipts_outcome[1].outcome.logs[0])
			  })
			  .catch((err) => {
				alert("Failed to add message");
				console.log("Failed to add message");
	
				throw err;
			  });
			} 
			
		
				
	return (
		<>
		<div className='pt-10'>
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
		<Image
      width={150}
      alt="joy gotchi"
      src="/gotchi/coin.gif"
    />	
		</section>
	
	<Input
      type="address"
      label="Input your Address"
      className="w-full"
	  color={"primary"}
	  onChange={handleChangeAddress}
    />
	<br/>
		<Button color="primary" className="w-full" onPress={(e)=>onFaucet(e)}>
		faucet $Joy Token
	  </Button>
	  <br/>
	  {messages && (
        <div className='pt-5'>
          ${messages}
          <div>
            <a className="text-green-400" href={`${process.env.EXPLORER_URL}/txns/${hash}` }>View</a>
          </div>
        </div>
      )}
		</div>
		</>
	);
}
