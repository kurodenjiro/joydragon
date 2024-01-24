"use client"
import { title } from "@/components/primitives";
import React, { useState, useEffect, useMemo } from 'react';

  import {Table, TableHeader, TableColumn,Link, TableBody, TableRow, TableCell, User, Avatar, CardFooter,Button,Spinner ,Pagination} from "@nextui-org/react";

  import {Card, CardBody , CardHeader , Divider} from "@nextui-org/react";

  import {Image} from "@nextui-org/react";
  import useSWR from "swr";
  import CountDownTimer from "./CountDownTimer";
  import { useWalletSelector } from "../../contexts/WalletSelectorContext";
  import type {
	AccountView,
	CodeResult,
  } from "near-api-js/lib/providers/provider";
  import { providers, utils } from "near-api-js";
  
 
  //https://github.com/ChangoMan/nextjs-ethereum-starter/blob/main/frontend/pages/index.tsx
export default function Battle() {
	
	const [listBattle, setListBattle] = useState<any>(null);
	const [page, setPage] = React.useState(1);
	const [ownPet, setOwnPet] = useState<any>(null)
	const [selectedPet, setSelectedPet] = useState<any>('')
	const [activity, setActivity] = useState<any>([])
	const [petData, setPetData] = React.useState<any>(null)
	const { selector, modal, accounts, accountId } = useWalletSelector();
	const [pages, setPages] = React.useState(1);

	useEffect(() => {
		async function getTotal() {
			const rowsPerPage = 20;
			const { network } = selector.options;
			const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
			provider.query<CodeResult>({
				request_type: "call_function",
				account_id: "game.joychi.testnet",
				method_name: "get_all_pet_metadata",
				args_base64: 'e30=',
				finality: "optimistic",
			  })
			  .then((res:any) => {
				const petList = JSON.parse(Buffer.from(res.result).toString()).filter((pet:any) => pet.owner_id !== accountId );
				console.log("petList",petList)
				let total = parseInt(petList.length)
			setPages( Math.ceil(total / rowsPerPage))
			  })
			
		}
		getTotal()
	},[])
	  
	  const renderCell = React.useCallback(async(pet:any, columnKey:any ) => {
		
		const cellValue = pet[columnKey];


		switch (columnKey) {
		  case "pet":
			return (
				<div className="relative flex justify-start items-center gap-2">
				<User
					avatarProps={{radius: "lg", className:"p-1" ,src: "/gotchi/Animated/GIF_Pet.gif"}}
					description={`lv:${pet.level}`}
					name={pet.name+'#'+pet.pet_id}
	   			>
		</User>
			  </div>
			);
		  case "score":
			return (
				<div className="relative flex justify-end items-center gap-2">
				<p className="text-bold text-sm capitalize">{Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format(pet.score)}</p>
		 <p className="text-bold text-sm capitalize text-default-400">Pts.</p>
			  </div>
			);
		  case "actions":
			return (
			  <div className="relative flex justify-end items-center gap-2">
				{
		 ownPet &&	ownPet.level <  pet.level  && pet.status !== "DYING" && ownPet.status !== "DYING" &&  ownPet.last_attack_used == BigInt("0") && (pet.last_attacked== BigInt("0")  ||  Math.floor((( Math.abs(Number(new Date( pet.last_attacked/10000000 )) * 1000  - Date.now())) /1000)/60)/60 > 1)    && (
<Button isIconOnly size="sm" className="p-2" color="default" aria-label="Like" onPress={()=>onAttack(pet.pet_id)}>
	   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				 <g>
					 <path fill="none" d="M0 0h24v24H0z"/>
					 <path fill-rule="nonzero" d="M17.457 3L21 3.003l.002 3.523-5.467 5.466 2.828 2.829 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415-2.829-2.828-2.828 2.828 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 2.827-2.828-5.46-5.46L3 3l3.546.003 5.453 5.454L17.457 3zm-7.58 10.406L7.05 16.234l.708.707 2.827-2.828-.707-.707zm9.124-8.405h-.717l-4.87 4.869.706.707 4.881-4.879v-.697zm-14 0v.7l11.241 11.241.707-.707L5.716 5.002l-.715-.001z"/>
				 </g>
			 </svg>
   </Button>
			)
		}
			  </div>
			);
		  default:
			return cellValue;
		}
	  }, [ownPet]);


	  const topContent = React.useMemo(() => {
		return (
		  <div className="flex flex-col gap-4">
			{ownPet ? (
				<Card >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="lg" color="primary" size="md" src="/gotchi/Animated/GIF_Pet.gif" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{ownPet && ownPet.name.slice(0,5)+'...'}#{ownPet && ownPet.pet_id.toString()}</h4>
            <h5 className="text-small tracking-tight text-default-400">LV:{ownPet && ownPet.level.toString()}</h5>
          </div>
        </div>
		<div>
		<Button
          className={"bg-transparent text-green-500 border-green-500" }
          color="primary"
          radius="full"
          size="sm"
          variant={ "bordered"}
        >
       {ownPet && Intl.NumberFormat('en-US', {
  notation: "compact",
  maximumFractionDigits: 1
}).format(ownPet.score)} Pts
        </Button>
		<Button
          className={"bg-transparent text-blue-500 border-blue-500" }
          color="primary"
          radius="full"
          size="sm"
          variant={ "bordered"}
        >
       <CountDownTimer seconds={ownPet ? (ownPet.time_until_starving/10000000) - Date.now() : 0} />
        </Button>
		<Button
          className={`bg-transparent  ${ownPet  ?  ownPet.status == "HAPPY" ? 'text-green-500 border-green-500' : ownPet.status == "HUNGRY" ? 'text-yellow-500 border-yellow-500' :  ownPet.status == "STARVING" ? 'text-yellow-500 border-yellow-500' :  ownPet.status == "DYING" ? 'text-neutral-500 border-neutral-500' :'' : ''}`}
          color="primary"
          radius="full"
          size="sm"
          variant={ "bordered"}
        >
        { ownPet  ?  ownPet.status : ''}
        </Button>	
		</div>
   
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
      </CardBody>
    </Card>
			):(
				<Card>
					<CardHeader className="justify-between">
					<div className="flex gap-5">
            <h4 className="text-small font-semibold leading-none text-default-600">Please Choose Pet To Battle!</h4>
          
        </div>
					</CardHeader>
			
		</Card>
			)}
			
			
			
		  </div>
		);
	  }, [ownPet]);
const onAttack = async ( tokenId : any )=> {
	
    };


const onKill = async( tokenId : any )=> {

    };

	
	const fetchMyAPI = async() => {
		const { network } = selector.options;
		const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
		provider.query<CodeResult>({
			request_type: "call_function",
			account_id: "game.joychi.testnet",
			method_name: "get_all_pet_metadata",
			args_base64: btoa(`{"start": ${page}, "limit": 20}`),
			finality: "optimistic",
		  })
		  .then((res:any) => {
			const petList = JSON.parse(Buffer.from(res.result).toString()).filter((pet:any) => pet.owner_id !== accountId );
			setPetData(petList)
			  const pet = localStorage.getItem('pet');
			  setSelectedPet(pet)
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
				setSelectedPet(pet);
			
			  }
			
			
	
		  });
	  }



	useEffect(() => {
		fetchMyAPI()
	  }, [page])
	return (
		<>
		<div>
<Table isStriped
			bottomContent={
				pages > 0 ? (
				  <div className="flex w-full justify-center">
					<Pagination
					  isCompact
					  showControls
					  showShadow
					  color="primary"
					  page={page}
					  total={pages}
					  onChange={(page) => setPage(page)}
					/>
				  </div>
				) : null}
 topContent={topContent}
 topContentPlacement="outside"
        selectionMode="single"  aria-label="Example static collection table h-44" classNames={{
        base: "max-h-[520px] pt-3",
        table: "min-h-[420px] pt-3",
      }}>
      <TableHeader>
        <TableColumn key="pet" >Info</TableColumn>
        <TableColumn key="score">Score</TableColumn>
        <TableColumn key="actions">Battle</TableColumn>
      </TableHeader>
      <TableBody
	  items={petData || []}
	  loadingContent={<Spinner label="Loading..." />}
	  
	  >
		   {(item:any)  =>  (
          <TableRow key={item?.pet_id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
	
       
      </TableBody>
	  
    </Table>
	
	
		</div>
		<br/>
		<Card >
		<CardHeader className="flex gap-3">
			<div className="flex flex-col">
			  <p className="text-md">Activity</p>
			  <p className="text-small text-default-500">list</p>
			</div>
		  </CardHeader>
		  <Divider/>
	  <CardBody>
		{activity.length > 0 && activity.map((item:string,index:number) => (
			<p  key={index}>{item}</p> 
		) )}
			
	  </CardBody>
	</Card>
	<br/>
	<br/>
	<br/>
	</>
		)
}
