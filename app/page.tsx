'use client'
import React, { useState, useEffect , useCallback } from 'react';
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Image,Link} from "@nextui-org/react";
import { providers, utils } from "near-api-js";
import { button as buttonStyles } from "@nextui-org/theme";

import { useWalletSelector } from "../contexts/WalletSelectorContext";
export default function Home() {
	
	  const { selector, modal, accounts, accountId } = useWalletSelector();
const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
const [messages, setMessages] = useState<any>(null)
const [hash, setHash] = useState<any>(null)

const handleSignIn = () => {
	modal.show();
  };
	  const mintDragon = async() => {
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
				  methodName: "create_pet",
				  args: {
					"name": "Dragon Green",
					"metadata": {
					  "title": "Dragon Green",
					  "description": "Power of dragon",
					  "media": "https://bafkreidmie2fie6k4x3dfrht5sq2wutgxxdsgkgouvyppesd3wvgqidpgm.ipfs.nftstorage.link/"
					}
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

		React.useEffect(() => {
		
		},[])
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
 
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Joy&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>Gotchi&nbsp;</h1>
				<br />
				<h1 className={title()}>
				<div className="inline-block max-w-lg text-center justify-center">
				<Image
      width={250}
      alt="joy gotchi"
      src="/gotchi/Animated/GIF_Pet2.gif"
    />	
				</div>
	
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
				Meet Your New Gotchi! 
				</h2>
			</div>


{accountId ? (
 <button type="button"  disabled={false} onClick={mintDragon} className="nes-btn w-52" >
 Mint A GotChi
</button>

) : (
	<>
	     <button
      className="nes-btn w-48  m-2 "
        onClick={handleSignIn}
      >
        Connect Wallet
      </button>   
		</>
)
        
}


			
			
			
{false && (
        <div>
          Successfully minted your NFT!
          <div>
            <a className="text-green-400" href={`${process.env.EXPLORER_URL}/tx/`}>Scan Tx</a>
          </div>
        </div>
      )}
      {/* {(isPrepareError || isError) && (
        <div><span className="text-red-400">Error: {(prepareError || error)?.message}</span></div>
      )} */}
	        {(false) && (
        <div><span className="text-red-400">Error: </span></div>
      )}
			<div className="flex gap-3">
		
				{/* <Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
				<Link
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href={siteConfig.links.github}
				>
					<GithubIcon size={20} />
					GitHub
				</Link> */}
				<Link
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href="/faucet"
				>
					Faucet $Joy token
				</Link>
			</div>

	
		</section>
	);
}
