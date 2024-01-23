"use client"
import React, { useState, useEffect } from 'react';
import {Card, CardBody , CardHeader , Divider , Image ,Button} from "@nextui-org/react";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import { providers, utils } from "near-api-js";

export default function RewardPage() {
	const [ownPet, setOwnPet] = useState<any>(null)
const [ownPetId, setOwnPetId] = useState<any>(null)
const { selector, modal, accounts, accountId } = useWalletSelector();
	useEffect(() => {
		async function fetchMyAPI() {
		  const pet = localStorage.getItem('pet');
		  const { network } = selector.options;
		const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
		  if(pet){
			provider.query<CodeResult>({
				request_type: "call_function",
				account_id: "game.joychi.testnet",
				method_name: "get_pet_by_pet_id",
				args_base64: btoa(`{"pet_id": ${pet}}`),
				finality: "optimistic",
			  })
			  .then((res:any) => {
				const ownPet = JSON.parse(Buffer.from(res.result).toString());
				console.log("ownPet",ownPet);
				setOwnPet(ownPet)
			  })
		  }

		}
		fetchMyAPI()
	  }, [])



		  const onRedeem = ()=> {

			};


	return (
		<div className="pt-20">
			
	<Card className="pt-3">
		
      <CardHeader className="flex gap-3">
	  <Image
      width={250}
      alt="joy gotchi"
      src="/gotchi/money.gif"
    />	
        <div className="flex flex-col">
          <p className="text-md">BURN PET SCORE </p>
		  <p className="text-md">{ownPet && ownPet.name}#{ownPet && ownPet.pet_id}</p>
          <p className="text-small text-default-500"> {ownPet && ownPet.score.toString()}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
		<h1>RECEIVE:{ownPet && ownPet.reward_debt.toString()} Vic</h1>
      </CardBody>
      <Divider/>
    </Card>
	<br/>
	<Button color="primary" className="w-full" onPress={onRedeem}>
      Claim
    </Button>
		</div>
	);
}
