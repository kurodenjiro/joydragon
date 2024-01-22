"use client"
//https://nostalgic-css.github.io/NES.css/
//https://fonts.google.com/specimen/Silkscreen
//https://www.iconfinder.com/iconsets/8-bit
//https://www.iconfinder.com/search?q=8%20bit&price=free
//https://www.iconfinder.com/search/icons?family=pixel-15
//https://www.iconfinder.com/kladenko
//${process.env.EXPLORER_URL}/api/tokentx/nft/list?tokenAddress=process.env.NFT_ADDRESS
//https://www.shutterstock.com/image-vector/8bit-pixel-characters-say-hello-94043773
//https://www.shutterstock.com/image-vector/collection-colorful-pixel-icons-vector-illustration-2172310153
//https://www.shutterstock.com/image-vector/colorful-butterfly-icon-pixel-art-2198218611
//https://www.shutterstock.com/image-vector/pixel-art-8bit-different-types-butterflies-2260306285
import React from "react";
import {Progress} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {Select, SelectItem ,Tooltip ,Button} from "@nextui-org/react";
import {Card, CardBody} from "@nextui-org/react";
import { button as buttonStyles } from "@nextui-org/theme";
import {Image} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox} from "@nextui-org/react";
import { useWalletSelector } from "../../contexts/WalletSelectorContext";
import CountDownTimer from "./CountDownTimer";
import  Slider  from "react-slick";
import type {
  AccountView,
  CodeResult,
} from "near-api-js/lib/providers/provider";
import { providers, utils } from "near-api-js";

const nftAddress= process.env.NFT_ADDRESS;
const MAX_ALLOWANCE = BigInt('20000000000000000000000')
const tokenAddress = process.env.TOKEN_ADDRESS


export default function PetPage() {
  const [petData, setPetData] = React.useState<any>(null)
  const [isPet, setIsPet] = React.useState<any>(true)
  const [itemData, setItemData] = React.useState<any>(null)
  const [isAddress, setIsAddress] = React.useState<any>(false)
  const [isChain, setIsChain] = React.useState<any>(false)
  const [selectedPet, setSelectedPet] = React.useState<any>(null)
  const [ownPet, setOwnPet] = React.useState<any>(null)
  const [selectedItem, setSelectedItem] = React.useState<any>(null)
  const [isApprove, setIsApprove] = React.useState(false)
  const [balloons, setBalloons] = React.useState<any>(null)
  const [petName, setPetName] = React.useState<any>(null)
  const [connectorsData, setConnectors] = React.useState<any>([])
  const { selector, modal, accounts, accountId } = useWalletSelector();
  const [countDownseconds, setCountDownseconds] = React.useState(0);
	const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
  const {isOpen : isOpenPetName , onOpen : onOpenPetName, onOpenChange : onOpenChangePetName , onClose : onCloseChangePetName} = useDisclosure();
  const SamplePrevArrow = (props:any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" ,color: 'red'  }}
        onClick={onClick}
      />
    );
  }
  const SampleNextArrow = (props:any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const fetchMyAPI = async() => {
   
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
        const petList = JSON.parse(Buffer.from(res.result).toString()).filter((pet:any) => pet.owner_id == accountId );
        setPetData(petList)
        if(petList.length > 0){
          const pet = localStorage.getItem('pet');
          setSelectedPet(pet)
          if(pet){
            setSelectedPet(pet);
            let isExist = true;
            petList.forEach((petItem:any,index:number) => {
              if(petItem.pet_id == pet){
                setOwnPet(petList[index])
                setCountDownseconds(petList[index].time_until_starving/10000000)
                isExist=false;
              }
            });
            if(isExist){
              localStorage.setItem('pet',petList[0].pet_id);
              setSelectedPet(petList[0].pet_id)
              setOwnPet(petList[0])
              setCountDownseconds(petList[0].time_until_starving/10000000)
            }
          }else{
            localStorage.setItem('pet',petList[0].pet_id);
            setSelectedPet(petList[0].pet_id)
            setOwnPet(petList[0])
            setCountDownseconds(petList[0].time_until_starving/10000000)
          }
          provider.query<CodeResult>({
            request_type: "call_function",
            account_id: "game.joychi.testnet",
            method_name: "get_all_item_metadata",
            args_base64: 'e30=',
            finality: "optimistic",
          })
          .then((res:any) => {
            setItemData(JSON.parse(Buffer.from(res.result).toString()));
          });
          // const pet_base64 = btoa(`{"pet_id": ${petId}}`)
          // const petInfo : any =   provider.query<CodeResult>({
          //   request_type: "call_function",
          //   account_id: "game.joychi.testnet",
          //   method_name: "get_pet_by_pet_id",
          //   args_base64: pet_base64,
          //   finality: "optimistic",
          // }).then((res:any) => {
          //   console.log("petInfo",JSON.parse(Buffer.from(res.result).toString()));
          // })
        }else{
          localStorage.removeItem('pet')
        }
        

      });
  }


  

  
    

    const handleChangePetName = ( event : any )=> {
      setPetName(event.target.value);
    };
    const handleChangeSelectPet = async ( event : any )=> {
      localStorage.setItem('pet',event.target.value);
      setSelectedPet(event.target.value);
      fetchMyAPI();
    };
    const onChangePetName = async() =>{
      const wallet = await selector.wallet();
      wallet
      .signAndSendTransaction({
      signerId: accountId!,
      receiverId: "game.joychi.testnet",
      actions: [
        {
        type: "FunctionCall",
        params: {
          methodName: "change_name_pet",
          args: {"pet_id": ownPet.pet_id, "name": petName },
          gas: BOATLOAD_OF_GAS,
          deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
        },
        },
      ],
      })
      .then((nextMessages:any) => {
      fetchMyAPI();

      })
      .catch((err) => {
      alert("Failed to add message");
      console.log("Failed to add message");

      throw err;
      });
      onCloseChangePetName()

    }
    const handleSignIn = () => {
      modal.show();
    };
    const onBuyAccessory = async(itemId:any) =>{
      const wallet = await selector.wallet();
      wallet
      .signAndSendTransaction({
      signerId: accountId!,
      receiverId: "game.joychi.testnet",
      actions: [
        {
        type: "FunctionCall",
        params: {
          methodName: "buy_item",
          args: {"pet_id": ownPet.pet_id, "item_id": itemId },
          gas: BOATLOAD_OF_GAS,
          deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
        },
        },
      ],
      })
      .then((nextMessages:any) => {
      fetchMyAPI();

      })
      .catch((err) => {
      alert("Failed to add message");
      console.log("Failed to add message");

      throw err;
      });
   }
   const mintPet = async() => {
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
        fetchMyAPI();
			console.log(nextMessages);
		  })
		  .catch((err) => {
			alert("Failed to add message");
			console.log("Failed to add message");

			throw err;
		  });
		} 
  React.useEffect(() => {
    if(accountId){
      fetchMyAPI()
    }
   console.log(accountId)
  }, [accountId])


	return (
    accountId && ownPet && (
      <>
<div className="grid grid-cols-6 gap-3 pt-5">


<div className="col-start-1 col-end-3 ">	

<div className="grid grid-rows-2 grid-flow-col gap-0 items-center ">

<div className="row-span-2 "> <Image
    radius={"none"}
    width={35}
src="/gotchi/Icon/skull2.png"
/></div>
<div className="col-span-2 "><span className="text-sm">TOD</span></div>

<div className="row-span-1 col-span-2 "><span className="font-bold text-lg"> <CountDownTimer seconds={countDownseconds} /></span></div>
</div>

</div>
<div className="col-end-8 col-span-3 ">


<div className="grid grid-rows-2 grid-flow-col gap-0 items-center ">

<div className="row-span-2 "> <Image
  radius={"none"}
  width={40}
  src="/gotchi/Icon/Heart.png"
/></div>
<div className="col-span-2 "><span className="text-sm">Healthy</span></div>
<div className="row-span-1 col-span-2 "><span className="font-bold text-lg">
{ ownPet  ?  ownPet.status :""}
  </span></div>
</div>
</div>
{/* <div className="col-start-1 col-end-7 h-16">
<Card>
  <CardBody>
    <p>{balloons ? balloons : `Your pet is ${ ownPet  ?  ownPet.status == 0 ? 'HAPPY' : ownPet.status == 1 ? 'HUNGRY' :  ownPet.status == 2 ? 'STARVING' :  ownPet.status == 3 ? 'DYING' :  ownPet.status == 4 ? 'DEAD' :'' : ''}` }</p>
  </CardBody>
</Card>
</div> */}
    {/* HAPPY,
    HUNGRY,
    STARVING,
    DYING, */}
<div className="col-start-1 col-end-7 pt-10">
  <div className="flex justify-center">
  {ownPet  ?  ownPet.status == "HAPPY" ? (
  <Image
  radius={"none"}
  width={40}
  src="/gotchi/Animated/GIF_Happy.gif"
/>
  ) : ownPet.status == "HAPPY" ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Happy.gif"
  />
  ) :  ownPet.status == "STARVING" ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Exclamation.gif"
  />
  ) :  ownPet.status == "HUNGRY" ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Sad.gif"
  />
  ) :  ownPet.status == "DYING" ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Die.gif"
  />

  ) :'' : ''}

  </div>
  </div>
<div className="col-start-1 col-end-7 ">
  <div className="flex justify-center">
  <Image
  radius={"none"}
  width={100}
  src="/gotchi/Animated/GIF_Pet.gif"
/>
  </div>
  </div>
<div className="col-start-1 col-end-3 ">{ownPet ? `Level ${ownPet.level.toString()}` : ''} </div>
<div className="col-end-7 col-span-3">
<div className="grid grid-cols-3">
<div className="col-span-1 justify-self-end">
<Modal 
   isOpen={isOpenPetName} 
    onOpenChange={onOpenChangePetName}
    placement="top-center"
  >
<ModalContent>
      {(onCloseChangePetName) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Change Pet Name</ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Name"
              onChange={handleChangePetName}
              placeholder="Enter your pet name"
              variant="bordered"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onCloseChangePetName}>
              Close
            </Button>
            <Button color="primary" onPress={onChangePetName}>
              Change
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>

<Button onPress={onOpenPetName} isIconOnly color="default" variant="ghost" size="sm" aria-label="Change name">
<svg enable-background="new 0 0 160 80" id="Layer_1" version="1.1" viewBox="0 0 160 80"  xmlns="http://www.w3.org/2000/svg" ><g><rect height="7" width="7" x="97" y="6"/><rect height="7" width="6" x="91" y="6"/><rect height="7" width="7" x="84" y="6"/><rect height="7" width="7" x="77" y="6"/><rect height="7" width="7" x="70" y="6"/><rect height="7" width="6" x="64" y="6"/><rect height="7" width="7" x="57" y="6"/><rect height="7" width="7" x="50" y="6"/><rect height="7" width="6" x="44" y="6"/><rect height="6" width="7" x="37" y="13"/><rect height="7" width="7" x="97" y="19"/><rect height="7" width="6" x="91" y="19"/><rect height="7" width="7" x="84" y="19"/><rect height="7" width="7" x="77" y="19"/><rect height="7" width="7" x="37" y="19"/><rect height="7" width="7" x="37" y="26"/><rect height="6" width="7" x="37" y="33"/><rect height="6" width="7" x="70" y="33"/><rect height="6" width="6" x="64" y="33"/><rect height="6" width="7" x="57" y="33"/><rect height="6" width="7" x="50" y="33"/><rect height="7" width="7" x="37" y="39"/><rect height="7" width="7" x="37" y="46"/><rect height="7" width="7" x="104" y="6"/><rect height="6" width="6" x="111" y="13"/><rect height="7" width="6" x="111" y="19"/><rect height="7" width="6" x="64" y="19"/><rect height="7" width="7" x="57" y="19"/><rect height="7" width="7" x="50" y="19"/><rect height="7" width="7" x="70" y="19"/><rect height="7" width="6" x="111" y="26"/><rect height="6" width="6" x="111" y="33"/><rect height="7" width="6" x="111" y="39"/><rect height="7" width="6" x="111" y="46"/><rect height="7" width="6" x="111" y="53"/><rect height="7" width="7" x="84" y="46"/><rect height="7" width="7" x="77" y="46"/><rect height="7" width="7" x="70" y="46"/><rect height="7" width="6" x="64" y="46"/><rect height="7" width="7" x="57" y="46"/><rect height="7" width="7" x="50" y="46"/><rect height="7" width="7" x="37" y="53"/><rect height="6" width="7" x="97" y="60"/><rect height="6" width="6" x="91" y="60"/><rect height="6" width="7" x="104" y="60"/><rect height="6" width="7" x="84" y="60"/><rect height="6" width="7" x="77" y="60"/><rect height="6" width="7" x="70" y="60"/><rect height="6" width="6" x="64" y="60"/><rect height="6" width="7" x="57" y="60"/><rect height="6" width="7" x="50" y="60"/><rect height="6" width="6" x="44" y="60"/></g></svg>
  </Button></div>
<div className="col-span-2">

<Select
  fullWidth={false}
  className="max-w-xs"
variant="underlined"
size="sm"
selectedKeys={[selectedPet]}
onChange={handleChangeSelectPet}
labelPlacement="outside"
>
  {petData && petData.map((pet:any) => (
    <SelectItem key={pet.pet_id} value={pet.pet_id} >
      {pet.name+ '#'+ pet.pet_id}
    </SelectItem>
  ))}
</Select></div>
</div>
  
</div>
<div className="col-start-1 col-end-7 ">
  <Progress size="sm" color="default" aria-label="" value={100} /></div>

  <div className="col-start-1 col-end-3 ">Reward</div>
<div className="col-end-8 col-span-2 ">{ownPet ? ownPet.reward_debt.toString() : ''} Vic</div>


</div>


<div className=" max-w-lg text-center justify-center p-10" >
{/* {itemData  && itemData.map((item:any)=>(
<Tooltip key={"default"}  color={"default"} content={`Feed 1 ${item.name} : ${(parseInt(item.points)/1e18).toFixed(2).toString()} PTS & ${(parseInt(item.timeExtension)/3600).toFixed(2).toString()} TOD with ${(parseInt(item.price)/1e18).toString(2)} Joy`} className="capitalize">
  <button type="button" className="nes-btn w-full" onClick={()=>onBuyAccessory(item.id)}> {item.name} </button>
</Tooltip>
))} */}

<Slider {...settings}>
        {itemData  && itemData.map((item:any)=>(
          <div >
         
<Tooltip key={"default"}  color={"default"} content={`Feed 1 ${item.name} : ${(parseInt(item.points)).toFixed(0).toString()} PTS & ${(parseInt(item.time_extension)/3600).toFixed(0).toString()} TOD with ${(parseInt(item.price)).toString(2)} Joy`} className="capitalize">
  
  <button type="button" className="nes-btn w-11/12" onClick={()=>onBuyAccessory(item.item_id)}> {item.name} </button>
 
</Tooltip> 
</div>
))}
        </Slider>
 {/* <button type="button" className="nes-btn w-full" onClick={setEnableTradingAsync}> Enable Trading</button> */}
</div>

</>
      ) 
     
	) || !accountId && (
    <div className="mt-3">
      <div className="flex flex-col items-center justify-center gap-3 pt-20 ">
      <button
      className="nes-btn w-48  m-2 "
        onClick={handleSignIn}
      >
        Connect Wallet
      </button>   
</div>
  </div>
   ) || accountId &&  (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
     <h1 className="mt-48">You Dont Own Any Pet !</h1> 
     <button
className="nes-btn w-52"
 onClick={mintPet}
  >
   Mint A GotChi
  
  </button>

  
  </div>
  
  )
   
   
   ;

  
}
