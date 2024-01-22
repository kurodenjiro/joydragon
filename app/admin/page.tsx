"use client"
import React, { useState, useEffect , useCallback } from 'react';
import { providers, utils } from "near-api-js";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";
import {Image,Button ,Input} from "@nextui-org/react";
export default function FaucetPage() {
	const [messages, setMessages] = useState<any>(null)
	const [hash, setHash] = useState<any>(null)
	const { selector, modal, accounts, accountId } = useWalletSelector();
	const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
	

			const onSetPet = async() => {
			//	const { contract } = selector.store.getState();
				const wallet = await selector.wallet();
				wallet
			  .signAndSendTransaction({
				signerId: accountId!,
				receiverId: "game.joychi.testnet",
				actions: [
				  {
					type: "FunctionCall",
					params: {
					  methodName: "create_species",
					  args: {
						"need_evol_item": false,
						"evol_item_id": 1,
						"name_spec": "Dragon Gotchi",
						"pet_evolution": [
						  {
							"image": "https://bafkreieutrqfh53fyifpd6k34lum6sq3pmftg25segeudlxoecl4a3pvx4.ipfs.nftstorage.link/",
							"name": "Baby Dragon",
							"attack_win_rate": 1,
							"next_evolution_level": 2
						  },
						  {
							"image": "https://bafkreih7qklwigwqxhndpqr3tl2cze522i6g5qooqizzl5yxhzvt4gwfdi.ipfs.nftstorage.link/",
							"name": "Adult Dragon",
							"attack_win_rate": 1,
							"next_evolution_level": 3
						  },
						  {
							"image": "https://bafkreidmie2fie6k4x3dfrht5sq2wutgxxdsgkgouvyppesd3wvgqidpgm.ipfs.nftstorage.link/",
							"name": "Dragon",
							"attack_win_rate": 1,
							"next_evolution_level": 4
						  }
						]
					  },
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
			
		
			const onSetItemFeedBeef = async() => {
				//	const { contract } = selector.store.getState();
					const wallet = await selector.wallet();
					wallet
				  .signAndSendTransaction({
					signerId: accountId!,
					receiverId: "game.joychi.testnet",
					actions: [
					  {
						type: "FunctionCall",
						params: {
						  methodName: "create_item",
						  args: {
							"name": "Beef",
							"price": 1,
							"points": 1000,
							"time_extension": 3 * 60 * 60 *1000,
							"price_delta": 0,
							"stock": 9999,
							"shield": 0,
							"is_revival": false
						},
						  gas: BOATLOAD_OF_GAS,
						  deposit: utils.format.parseNearAmount("0")!,
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

				const onSetItemFeedWater = async() => {
					//	const { contract } = selector.store.getState();
						const wallet = await selector.wallet();
						wallet
					  .signAndSendTransaction({
						signerId: accountId!,
						receiverId: "game.joychi.testnet",
						actions: [
						  {
							type: "FunctionCall",
							params: {
							  methodName: "create_item",
							  args: {
								"name": "Water",
								"price": 1,
								"points": 10000 ,
								"time_extension": 3 * 60 * 60 *1000,
								"price_delta": 0,
								"stock": 9999,
								"shield": 0,
								"is_revival": false
							},
							  gas: BOATLOAD_OF_GAS,
							  deposit: utils.format.parseNearAmount("0")!,
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
					const onSetItemFeedSheild = async() => {
						//	const { contract } = selector.store.getState();
							const wallet = await selector.wallet();
							wallet
						  .signAndSendTransaction({
							signerId: accountId!,
							receiverId: "game.joychi.testnet",
							actions: [
							  {
								type: "FunctionCall",
								params: {
								  methodName: "create_item",
								  args: {
									"name": "Sheild",
									"price": 1,
									"points": 0 ,
									"time_extension": 0 * 60 * 60 *1000,
									"price_delta": 0,
									"stock": 9999,
									"shield": 1,
									"is_revival": false
								},
								  gas: BOATLOAD_OF_GAS,
								  deposit: utils.format.parseNearAmount("0")!,
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
						const onSetItemFeedRevival = async() => {
							//	const { contract } = selector.store.getState();
								const wallet = await selector.wallet();
								wallet
							  .signAndSendTransaction({
								signerId: accountId!,
								receiverId: "game.joychi.testnet",
								actions: [
								  {
									type: "FunctionCall",
									params: {
									  methodName: "create_item",
									  args: {
										"name": "Beef",
										"price": 1,
										"points": 0 ,
										"time_extension": 0 * 60 * 60 *1000,
										"price_delta": 0,
										"stock": 9999,
										"shield": 0,
										"is_revival": true
									},
									  gas: BOATLOAD_OF_GAS,
									  deposit: utils.format.parseNearAmount("0")!,
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

	<div>


	<Button color="primary" className="w-full pt-2" onPress={(e)=>onSetPet(e)}>
		Set Pet 
	  </Button>
	</div>

	
	  <br/>
	  <div>
	  <Button color="primary" className="w-full pt-2" onPress={(e)=>onSetItemFeedBeef(e)}>
		Set item Feed Beef
	  </Button>
	  </div>
	
	  <br/>
	  <div>
	  <Button color="primary" className="w-full pt-2" onPress={(e)=>onSetItemFeedWater(e)}>
		Set item Feed Water
	  </Button>
	  </div>
	
	  <br/>
	  <div>
	  <Button color="primary" className="w-full pt-2" onPress={(e)=>onSetItemFeedSheild(e)}>
		Set item Feed Sheild
	  </Button>

	  </div>
	  <br/>
	  <div>
	  <Button color="primary" className="w-full pt-2" onPress={(e)=>onSetItemFeedRevival(e)}>
		Set item Feed Revival
	  </Button>
	  </div>

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
