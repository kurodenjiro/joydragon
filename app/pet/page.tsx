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
import { useDebounce } from './useDebounce'
import { nftAbi , tokenAbi } from '../../abi';

import {
	usePrepareContractWrite,
	useContractWrite,
	useContractRead,
	useWaitForTransaction,
	useAccount,
	useConnect,
  useNetwork,
	useSwitchNetwork
  } from "wagmi";
import { readContracts  , watchAccount} from '@wagmi/core'
import CountDownTimer from "./CountDownTimer";
import  Slider  from "react-slick";

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
  const { address, connector, isConnected } = useAccount()

  const { connect, connectors, error : errorConnect, isLoading : isLoadingConnect, pendingConnector } = useConnect()
  const [countDownseconds, setCountDownseconds] = React.useState(0);
  const { chain  } = useNetwork()
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
    if(address) {
      setIsAddress(true)}
      else{
      setIsAddress(false);
     };
    let response : any= await fetch(`${process.env.EXPLORER_URL}/api/tokentx/nft/list?tokenAddress=${process.env.NFT_ADDRESS}`)
    response = await response.json()
    const petArr : any = [];
    
    if(response.data){
      for (const element of response.data) {
        const Info : any = await readContracts({
          contracts: [
            {
              address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
              abi: nftAbi,
              functionName: 'getPetInfo',
              args: [element.tokenId],
            }
          ],
        })
        if(element.to == address){
          petArr.push({
            value:element.tokenId,
            label:Info[0].result[0]
          })
        }
      }
    }
    
    if(petArr[0]){
      const pet = localStorage.getItem('pet');
      let petId : any  = null ;
    if (pet) {
      setSelectedPet(pet);
      petId = BigInt(pet)
      console.log("check1",pet)
    }else{
      localStorage.setItem('pet',petArr[0].value);
      petId = petArr[0].value;
      setSelectedPet(petArr[0].value)
      console.log("check2",petArr[0].value)
    }
   
    const Info : any = await readContracts({
      contracts: [
        {
          address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
          abi: nftAbi,
          functionName: 'getPetInfo',
          args: [petId],
        }
      ],
    })
    setOwnPet(Info[0].result)
    const seconds = parseInt(Info[0].result[4]) *1000 - Date.now();
    setCountDownseconds(seconds)
  
    
  }
  setPetData(petArr)
  if(petArr.length > 0 ){
    setIsPet(true)
  }
  if(petArr.length == 0 ){
    setIsPet(false)
  }
    let items : any = [0,1];
    let itemArr : any = [];
    for (const element of items) {
      const Info : any = await readContracts({
        contracts: [
          {
            address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
            abi: nftAbi,
            functionName: 'getItemInfo',
            args: [element],
          }
        ],
      })
      itemArr.push({
        id:element,
        name:Info[0].result[0],
        price:Info[0].result[1],
        points:Info[0].result[2],
        timeExtension:Info[0].result[3],
      })
    }
    setItemData(itemArr);
    
  }

  const unwatch = watchAccount((account) => {
    
  })
	  const { chains , error : errorSwitchNetwork, isLoading : loadingSwingNetwork, pendingChainId, switchNetwork } =
		useSwitchNetwork({
			onMutate(args) {

			  },
			onSettled(data, error) {
			},
			onSuccess(data) {
        localStorage.removeItem('pet')
        fetchMyAPI()
      }
		  })


      
  const {isOpen : isOpenPetName , onOpen : onOpenPetName, onOpenChange : onOpenChangePetName , onClose : onCloseChangePetName} = useDisclosure();
  const debouncedPetName = useDebounce(petName, 500)
  const debouncedSelectedPet = useDebounce(selectedPet, 500)
  const debouncedSelectedItem = useDebounce(selectedItem, 500)


  const { config : configAddItem } = usePrepareContractWrite({
    address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
    abi: nftAbi,
    functionName: "createItem",
    args: ["Beef",BigInt("2000"),BigInt("1000000000000000"), BigInt("28800")],
    });
  
    const {
      data: addItemResult,
      writeAsync: setAddItemAsync,
      error:errorAddItem,
    } = useContractWrite(configAddItem);



    const { config : configEnableTrading } = usePrepareContractWrite({
      address: `0x${process.env.TOKEN_ADDRESS?.slice(2)}`,
      abi: tokenAbi,
      functionName: "enableTrading"
      });
    
      const {
        data: enableTradingResult,
        writeAsync: setEnableTradingAsync,
        error:errorEnableTrading,
      } = useContractWrite(configEnableTrading);
  


  const { config : configPetName } = usePrepareContractWrite({
    address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
    abi: nftAbi,
    functionName: "setPetName",
    args: [debouncedSelectedPet, debouncedPetName],
    onSettled: (e) => {
      console.log('Mutate', e)
      },
    });
  
    
    const {
      data: petNameResult,
      writeAsync: setPetNameAsync,
      error:errorPetName,
      
    } = useContractWrite(configPetName);
    const { isLoading : isLoadingPetNameResult} = useWaitForTransaction({
			hash: petNameResult?.hash,
			onSuccess(data) {
			  fetchMyAPI()
			},
		  })
      
    const { config : configBuyAccessory } = usePrepareContractWrite({
      address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
      abi: nftAbi,
      functionName: "buyAccessory",
      args: [debouncedSelectedPet, debouncedSelectedItem],
   
      });
    
      const {
        data: buyAccessoryResult,
        writeAsync: setBuyAccessoryAsync,
        error:errorBuyAccessory,
      } = useContractWrite(configBuyAccessory);


    const handleChangePetName = ( event : any )=> {
      setPetName(event.target.value);
    };
    const handleChangeSelectPet = async ( event : any )=> {
      localStorage.setItem('pet',event.target.value);
      setSelectedPet(event.target.value);
      fetchMyAPI();
    };
    const onChangePetName = () =>{
       setPetNameAsync?.();
     onCloseChangePetName()
    }
    const onBuyAccessory = (itemId:any) =>{
      setSelectedItem(itemId);
      setBuyAccessoryAsync?.();
   }
   const { isLoading } = useWaitForTransaction({
    hash: buyAccessoryResult?.hash,
    onSuccess(data) {
      
      let getItemInfo :any = [];
      itemData.forEach((element:any) => {
        if(element.id == selectedItem){
          getItemInfo = element;
        }
      });
      
      
      fetchMyAPI();
      setBalloons(`Pet ${ownPet[0]} was fed ${getItemInfo.name} !` );
    },
    onError(error) {
      setBalloons(`Cannot be fed !` );
    },
  })

  const {
		config,
		error: prepareErrorMint,
		isError: isPrepareErrorMint,
	  } = usePrepareContractWrite({
		address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
		abi: nftAbi,
		functionName: 'mint',
	  })
	  const { data : dataMint, error : errorMint, isError : isErrorMint, write : mint } = useContractWrite(config)
	 
	  const { isLoading: isLoadingMint, isSuccess  : isSuccessMint} = useWaitForTransaction({
		hash: dataMint?.hash,
    onSuccess(data) {
       
       let getItemInfo :any = [];
       itemData.forEach((element:any) => {
         if(element.id == selectedItem){
           getItemInfo = element;
         }
       });
       
     
       const loadData = async() => {
         const petId = localStorage.getItem('pet');
         if(petId){
           const Info : any = await readContracts({
             contracts: [
               {
                 address: `0x${process.env.NFT_ADDRESS?.slice(2)}`,
                 abi: nftAbi,
                 functionName: 'getPetInfo',
                 args: [BigInt(petId)],
               }
             ],
           })

           setOwnPet(Info[0].result)
           const seconds = parseInt(Info[0].result[4]) *1000 - Date.now();
           setCountDownseconds(seconds)
         }
         
       }
       loadData();
     }
    })

    const { data: allowance, refetch } = useContractRead({
      address: `0x${process.env.TOKEN_ADDRESS?.slice(2)}`,
      abi: tokenAbi,
      functionName: "allowance",
      args: [`0x${address ? address.slice(2) : ''}`, `0x${process.env.NFT_ADDRESS?.slice(2)}`],
    });
  
    const { config : configAllowance } = usePrepareContractWrite({
    address: `0x${process.env.TOKEN_ADDRESS?.slice(2)}`,
    abi: tokenAbi,
    functionName: "approve",
    args: [`0x${process.env.NFT_ADDRESS?.slice(2)}`, MAX_ALLOWANCE],
    });
  
    const {
      data: approveResult,
      writeAsync: approveAsync,
      error:errorAllowance,
    } = useContractWrite(configAllowance);


    const { isLoading : isLoadingApprove} = useWaitForTransaction({
      hash: approveResult?.hash,
        onSuccess(data) {
          setIsApprove(true);
        }
      })

    

  React.useEffect(() => {
    if(connectors){
      setConnectors(connectors)
    }
    if(allowance){
      if(allowance >= BigInt(20000)){
        setIsApprove(true)
      }
    }
    if(address) {
      setIsAddress(true)
    }
    else{
      setIsAddress(false);
     };
     if(chain?.id == process.env.CHAIN_ID){
      setIsChain(true)
    }
    else{
      setIsChain(false)
     }
  

   fetchMyAPI()


  }, [address,chain])
	return (
    isChain  && isAddress &&   isPet  && (
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
{ ownPet  ?  ownPet[1] == 0 ? 'HAPPY' : ownPet[1] == 1 ? 'HUNGRY' :  ownPet[1] == 2 ? 'STARVING' :  ownPet[1] == 3 ? 'DYING' :  ownPet[1] == 4 ? 'DEAD' :'' : ''}
  </span></div>
</div>
</div>
{/* <div className="col-start-1 col-end-7 h-16">
<Card>
  <CardBody>
    <p>{balloons ? balloons : `Your pet is ${ ownPet  ?  ownPet[1] == 0 ? 'HAPPY' : ownPet[1] == 1 ? 'HUNGRY' :  ownPet[1] == 2 ? 'STARVING' :  ownPet[1] == 3 ? 'DYING' :  ownPet[1] == 4 ? 'DEAD' :'' : ''}` }</p>
  </CardBody>
</Card>
</div> */}
<div className="col-start-1 col-end-7 pt-10">
  <div className="flex justify-center">
  {ownPet  ?  ownPet[1] == 0 ? (
  <Image
  radius={"none"}
  width={40}
  src="/gotchi/Animated/GIF_Happy.gif"
/>
  ) : ownPet[1] == 1 ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Happy.gif"
  />
  ) :  ownPet[1] == 2 ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Exclamation.gif"
  />
  ) :  ownPet[1] == 3 ? (
    <Image
    radius={"none"}
    width={40}
    src="/gotchi/Animated/GIF_Sad.gif"
  />
  ) :  ownPet[1] == 4 ? (
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
<div className="col-start-1 col-end-3 ">{ownPet ? `Level ${ownPet[3].toString()}` : ''} </div>
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
    <SelectItem key={pet.value} value={pet.value} >
      {pet.label+ '#'+ pet.value}
    </SelectItem>
  ))}
</Select></div>
</div>
  
</div>
<div className="col-start-1 col-end-7 ">
  <Progress size="sm" color="default" aria-label="" value={100} /></div>

  <div className="col-start-1 col-end-3 ">Reward</div>
<div className="col-end-8 col-span-2 ">{ownPet ? ownPet[8].toString() : ''} Vic</div>


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
         
<Tooltip key={"default"}  color={"default"} content={`Feed 1 ${item.name} : ${(parseInt(item.points)/1e18).toFixed(2).toString()} PTS & ${(parseInt(item.timeExtension)/3600).toFixed(2).toString()} TOD with ${(parseInt(item.price)/1e18).toString(2)} Joy`} className="capitalize">
  
  <button type="button" className="nes-btn w-11/12" onClick={()=>onBuyAccessory(item.id)}> {item.name} </button>
 
</Tooltip> 
</div>
))}
        </Slider>
 {/* <button type="button" className="nes-btn w-full" onClick={setEnableTradingAsync}> Enable Trading</button> */}
</div>

</>
      ) ||
      
      isChain == false  && isAddress  && (
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
  <button
        key={process.env.CHAIN_ID}
        onClick={() => switchNetwork?.(process.env.CHAIN_ID  as unknown as  number)}
    className="nes-btn w-52 mt-48"
      >
       Switch Chain
        {loadingSwingNetwork && pendingChainId === process.env.CHAIN_ID && ' (switching)'}
      </button>
      <span>{errorSwitchNetwork && errorSwitchNetwork.message}</span>
        </div>
    )
	) || isAddress == false && (
    <div className="mt-3">
      <div className="flex flex-col items-center justify-center gap-3 pt-20 ">
    {connectorsData.map((connector:any) => (
      
         <button
      className="nes-btn w-48  m-2 "
        disabled={!connector.ready}
        key={connector.id}
        onClick={() => connect({ connector })}
      >
        {connector.name}
        {!connector.ready }
        {isLoadingConnect &&
          connector.id === pendingConnector?.id &&
          ' (connecting)'}
      </button>     
      

    ))}
</div>
    {errorConnect && <div>{errorConnect.message}</div>}
  </div>
   ) || isPet ==  false  &&  isChain && isAddress && (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
     <h1 className="mt-48">You Dont Own Any Pet !</h1> 
     {(!isApprove) ? (
      <button
className="nes-btn w-52"
onClick={approveAsync}
  >
   Approval
  
  </button>

     ) : (
      <button
className="nes-btn w-52"
disabled={!mint || isLoading} onClick={mint}
  >
   Mint A GotChi
  
  </button>

     )}

  
  </div>
  
  )
   
   
   ;

  
}
