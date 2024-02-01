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
			const onSetPetBlackDragon = async() => {
			//	const { contract } = selector.store.getState();
				const wallet = await selector.wallet();
				wallet
			  .signAndSendTransaction({
				signerId: accountId!,
				receiverId: "game1.joychi.testnet",
				actions: [
				  {
					type: "FunctionCall",
					params: {
					  methodName: "create_species",
					  args: {
						"need_evol_item": true,
						"evol_item_id": 1,
						"name_spec": "blackdragon",
						"pet_evolution": [
						  {
							"image": "https://bafkreigw3j7bn3yhkbqt2ercytjhghzn462n5pxzyig4lptuyv4zv6gn6y.ipfs.nftstorage.link/",
							"name": "Baby Juvenile Black Dragon",
							"attack_win_rate": 20,
							"next_evolution_level": 1
						  },
						  {
							"image": "https://bafkreiaqk7mr45wnjwtb4lyv4gpy5rloma3sxq3fq2t6s43tcy3ovnki4m.ipfs.nftstorage.link/",
							"name": "Adult Juvenile Black Dragon",
							"attack_win_rate": 25,
							"next_evolution_level": 2
						  },
						  {
							"image": "https://bafkreibxsv2zfwsftq5yg42rtbersqz6xdnqkohu5eomtdwikbv5uglhmu.ipfs.nftstorage.link/",
							"name": "Great Juvenile Black Dragon",
							"attack_win_rate": 35,
							"next_evolution_level": 3
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
				
				console.log("Failed to add message");
	
				throw err;
			  });
			} 
			const onSetPetGreenDragon = async() => {
				//	const { contract } = selector.store.getState();
					const wallet = await selector.wallet();
					wallet
				  .signAndSendTransaction({
					signerId: accountId!,
					receiverId: "game1.joychi.testnet",
					actions: [
					  {
						type: "FunctionCall",
						params: {
						  methodName: "create_species",
						  args: {
							"need_evol_item": true,
							"evol_item_id": 1,
							"name_spec": "greendragon",
							"pet_evolution": [
							  {
								"image": "https://bafkreid32fvsd54vejrhsp26zebufsdqnx7jjgtg7j5odp6vyc3b4joecm.ipfs.nftstorage.link/",
								"name": "Baby Green Dragon",
								"attack_win_rate": 20,
								"next_evolution_level": 1
							  },
							  {
								"image": "https://bafkreiapb7ryik6hqe3hj2sd5fjfsexfvuumyxf7jhlzhv64zjmvdp456q.ipfs.nftstorage.link/",
								"name": "Adult Green Dragon",
								"attack_win_rate": 25,
								"next_evolution_level": 2
							  },
							  {
								"image": "https://bafkreig77ufvn7jmr4macehsuww7lz5xflwyb2e75esli6sz5ywfxzhsha.ipfs.nftstorage.link/",
								"name": "Great Green Wyrm",
								"attack_win_rate": 35,
								"next_evolution_level": 3
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
					receiverId: "game1.joychi.testnet",
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
						receiverId: "game1.joychi.testnet",
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
							receiverId: "game1.joychi.testnet",
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
								receiverId: "game1.joychi.testnet",
								actions: [
								  {
									type: "FunctionCall",
									params: {
									  methodName: "create_item",
									  args: {
										"name": "Holy Watter",
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
								
								console.log("Failed to add message");
					
								throw err;
							  });
							} 

							const onSetItemFeedMoonStone = async() => {
									const wallet = await selector.wallet();
									wallet
								  .signAndSendTransaction({
									signerId: accountId!,
									receiverId: "game1.joychi.testnet",
									actions: [
									  {
										type: "FunctionCall",
										params: {
										  methodName: "create_item",
										  args: {
											"name": "Moon Stone",
											"price": 1,
											"points": 0 ,
											"time_extension": 0 ,
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
									
									console.log("Failed to add message");
						
									throw err;
								  });
								} 
	return (
		<>
		<div className='pt-10'>

	<div>


	<Button color="primary" className="w-full" onPress={(e)=>onSetPetBlackDragon()}>
		Set Pet Black Dragon
	  </Button>
	
	
	</div>
	<br/>
	<div>
	<Button color="primary" className="w-full" onPress={(e)=>onSetPetGreenDragon()}>
		Set Pet Green Dragon
	  </Button>
	</div>

	  <br/>
	  <div>
	  <Button color="primary" className="w-full" onPress={(e)=>onSetItemFeedMoonStone()}>
		Set item Moon Stone
	  </Button>
	

	  </div>
	  <br/>
	  <div>
	  <Button color="primary" className="w-full" onPress={(e)=>onSetItemFeedBeef()}>
		Set item Feed Beef
	  </Button>
	  </div>

	  
	  <br/>
	  <div>
	  <Button color="primary" className="w-full" onPress={(e)=>onSetItemFeedWater()}>
		Set item Feed Water
	  </Button>
	  </div>
	
	  <br/>
	  <div>
	  <Button color="primary" className="w-full" onPress={(e)=>onSetItemFeedSheild()}>
		Set item Feed Sheild
	  </Button>

	  </div>
	  <br/>
	  <div>
	  <Button color="primary" className="w-full" onPress={(e)=>onSetItemFeedRevival()}>
		Set item Feed Revival
	  </Button>
	  </div>

	  <br/>
	  <div>

	  </div>
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
