'use client'
import React from "react";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Image,Link} from "@nextui-org/react";
import { nftAbi , tokenAbi } from '../abi';
import { button as buttonStyles } from "@nextui-org/theme";


//https://wagmi.sh/examples/contract-write
export default function Home() {
//check allowrance

	  const [isClient, setIsClient] = React.useState(true)
	  const [isApprove, setIsApprove] = React.useState(false)


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

{isClient ? (
(!isApprove) ? (
	<button type="button"   onClick={() =>{}} className="nes-btn w-52" >
	Approval
</button>
   ):(
	 <button type="button"  disabled={false} onClick={() =>{}} className="nes-btn w-52" >
	 Mint A GotChi
 </button>
	 
   )

) : (
	<>
	
		</>
)
        
}


			
			
			
{true && (
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
					isExternal
					className={buttonStyles({ variant: "bordered", radius: "full" })}
					href='https://faucet-testnet.viction.xyz/'
					>
					
					Faucet Vic Testnet
				</Link> 
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
