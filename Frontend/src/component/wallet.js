import React, { useEffect, useRef, useState } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import Onboard from '@web3-onboard/core'
import { ethers } from 'ethers';
import { Button, Form } from "react-bootstrap";
import Modal from 'react-modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { Gen0 } from "../lib/L1/gen0"
import { Gen1} from "../lib/L1/gen1"
import { HonorQuest } from "../lib/L1/honorQuest"
import { vault } from "../lib/L1//vault"
import { HonorQuest_l2 } from "../lib/L2/honrQuest"
import { Quest_l2 } from "../lib/L2/quest"
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Navbar, Nav } from 'react-bootstrap';
import "../css/wallet.css"
import CustomLoader from './CustomLoader';
import Crossmint from './Crossmint';
import { getstakedtokens, gettokenUri, gen0Signature, stake, unstake, claimQuestReward, getAllActivity, getIdActivity, vaultStack, vaultUnStack,trainingStake,trainingUnstake } from "../api"
import "../config"
import { gen0, Vault, honorQuest_l1, honorQuest_l2, quest_l2, Vault_l1, checkapprove, setApproval,horn_l1,training_l2 } from "./blockchainUtilits"
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const config = require('../config')

const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '165e1bf150414830abae5b4af6cc9a75'
const rpcUrl = `https://sepolia.io/v3/${infuraKey}`

init({
   apiKey,
   wallets: [injected],
   chains: [
      {
         id: '0x1',
         token: 'ETH',
         label: 'Ethereum Mainnet',
         rpcUrl
      },
      {
         id: '0x2105',
         token: 'ETH',
         label: 'Base',
         rpcUrl: 'https://mainnet.base.org'
      },
      {
         id: '11155111',
         token: 'ETH',
         label: 'sepolia',
         rpcUrl: `https://sepolia.io/v3/${infuraKey}`
      }
   ]
});
const Wallet = () => {
   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
   const [address, setAddress] = useState(localStorage.getItem('Address') || null);
   const [clicks, setClicks] = useState(0);
   const [toast, Settoast] = useState(false);
   const [toastmessage, Settoastmessage] = useState("");

// Array details 

   const [array, SetArray] = useState([])
   const [stkarray, SetstkArray] = useState([])
   const [questArray, SetquestArray] = useState([])
   const [trainingArray, SettrainingArray] = useState([])
   const [joestingArray, SetjoestingArray] = useState([])
   const [liyerArray, SetliyerArray] = useState([])

// Selected card Details

   const [selectedMintCard, setSelectedMintCard] = useState([]);
   const [selectedVaultCard, setSelectedVaultCard] = useState([]);
   const [selectedQuestCard, setSelectedQuestCard] = useState([]);
   const [selectedTrainingCard, setSelectedTrainingCard] = useState([]);

   // context data

   const { user,setUser} = useAuth();

   // Loader

   const [vaultsts, setVaultsts] = useState(false);
   const [queststs, setQueststs] = useState(false)
   const [trainingsts, setTrainingsts] = useState(false)
   const [mintStatus, SetmintStatus] = useState(false);

   // Button hidding

   const [mint, setMint] = useState(false)

   // Reward and balacnce

   const [balance, setBalance] = useState();
   const [hornBalance, setHornBalance] = useState();


   // Activity 

   const [activity, setActivity] = useState([]);
   const [activityview, setActivityview] = useState(false)
   const [modelCharacter, setModelCharacter] = useState([])

   // Hide crossMint button for gen1

   const [switchmint, setSwitchmint] = useState(false)

   // select type of stack 
   const [selectedOption, setSelectedOption] = useState("")


   const [claimQuest, setClaimQuest] = useState("");

   let login = true;
   const navigate = useNavigate()

   const mintValueInEther = 0.01;
   const mintValueInWei = ethers.parseEther(mintValueInEther.toString());
   let Gen0Contract;
   let Gen1Contract;
   let QuestStakeContract;
   let NftContract;
   let honorQuest;
   let vaultContract;
   let mintedTokens;
   let metadata;
   let imgchar;

   const [mintLoad, setmintLoad] = useState(false);
   const [vaultLoad, setvaultLoad] = useState(false);
   const [questLoad, setquestLoad] = useState(false);
   const [trainingLoad, settrainingLoad] = useState(false);


   useEffect(() => {
      try {
         const Address = localStorage.getItem('Address');
         if ((Address !== '' && Address !== null && Address !== undefined) && (user == null || user == undefined)) {
            // navigate('/')
            setAddress(address);
            setSelectedMintCard([]);
            setSelectedVaultCard([]);
            setSelectedQuestCard([]);
            setSelectedTrainingCard([]);
         }
      }
      catch (e) {
         console.log(e, "==========error")
      }
   }, []);
   
   useEffect(() => {
      if (address && !wallet && !connecting) {
         console.log("============called===========111111");
         // const label = '"MetaMask"'; 
         connect()
         console.log(wallet,"=========wallet on the useEEEEE")
         // .catch(error => {
         //    console.error('Error connecting wallet:', error);
         // });
      }
   }, [address, wallet]);
   
   
      useEffect(() => {
         console.log(wallet,"+=============useeffect wallet")
         if (wallet && wallet.provider) {
           console.log("===============called22222===============")
            const provider = new ethers.BrowserProvider(wallet.provider, 'any');          
                  provider.getSigner().then(signer => {
                     console.log(signer,"===================useEffect signer")
                     setUser(signer)
                  });

         }
      }, [wallet]);

   // if (wallet && !address) {
   //    console.log(user,"==============================context signer")
   //    console.log(wallet, "============wallet ---- ")
   //    console.log(address, "============wallet ---- ")
   //    provider = new ethers.BrowserProvider(wallet.provider, 'any');
   //    console.log(provider, "=============proveider");
   //    console.log(connect, "==============wallet")
   //    provider.getNetwork().then(network => {
   //       console.log(network.chainId, '=== 11155111n', "========networks")
   //       if (network.chainId != '80001') {
   //          Settoast(true);
   //          Settoastmessage("Connect with mumbai network");
   //       } else {
   //          console.log(user,"==============================context signer")
   //          provider.getSigner().then((result) => {
   //             console.log(result, "===========result");
   //             // setSigner((result));
   //             signer.current = result
   //             console.log(result, "===========signer")
   //             return result.address
   //          }).then((address) => {
   //             localStorage.setItem('Address', address);
   //             setAddress(address);
   //          });{connecting ? 'Connecting' : wallet ? 'Disconnect' : 'connect'}
   //       }
   //    }).catch(error => {
   //       console.error("Error fetching network:", error);
   //    });
   //    console.log(wallet, "============wallet ---- ", signer)
   // } else if (wallet && address) {
   //    console.log(wallet.provider, "============wallet ---- ")
   //    console.log(address, "============wallet ---- ")
   //    provider = new ethers.BrowserProvider(wallet.provider, 'any');
   //    provider.getSigner().then((result) => {
   //       console.log(result, "========result")
   //       signer.current = result
   //       // setAddress(result.address)
   //    })
   // }



   useEffect(() => {
      console.log(user, "==============================context signer")
      console.log(wallet, "==============================context signer")
      if ((address !== null || address !== undefined || address !== "") && (user != null || user != undefined) && login) {
         // if (address !== null || address !== undefined || address !== "") {
         // if (address && (user != null || user != undefined)) {
         login = false
         console.log("list array called in use before");
         console.log("=========11111===============type")
         listArray("mint", "vault", "quest","training")
         // listArray("mint", "vault", "quest")
         // listArray("mint", "vault", "quest")
         // SetmintStatus(true)
         // setVaultsts(true)
         // setQueststs(true)
         // setTrainingsts(true)
         CurrentBalance()
         Hornbalance()
         switchMint()
         getallActivity()
         console.log("list array called in the use after");
         console.log("minted tokens called =======")
         console.log(vaultLoad, "====================vault load")
         // } 
      } else if (address == null || address == "") {
         navigate('/');
      }
   }, [address]);

   useEffect(() => {
      console.log(user, "==============================context signer")
      console.log(wallet, "==============================context signer")
      if ((address !== null || address !== undefined || address !== "") && (user != null || user != undefined)) {
         console.log("list arrya is called inside the type")
         console.log("========2222================type")
         if (mintStatus) {
            console.log(mintStatus, "================mint sts")
            let arrays = [];
            listArray("mint", null, null,null)
            SetmintStatus(false)
         }
         else if (vaultsts) {
            listArray("mint", "vault", null,null)
            setVaultsts(false);  
         }
         else if (queststs) {
            listArray(null, "vault", "quest",null)
            setQueststs(false)
         }else if(trainingsts) {
            listArray(null, "vault", null,"training")
            setTrainingsts(false)
         }
      }
   }, [mintStatus, vaultsts, queststs])


   const DisconnectWallet = async () => {
      await disconnect(wallet);
      localStorage.removeItem('Address');
      setAddress(null);
      SetArray([]);
      setSelectedMintCard([]);
      setSelectedVaultCard([]);
      setSelectedQuestCard([]);
      SetstkArray([]);
      SetquestArray([])
      // signer.current = null
      navigate('/');
   }
   const IncrementItem = () => {
      setClicks(clicks + 1);
   }
   const DecreaseItem = () => {
      if (clicks !== 0) {
         setClicks(clicks - 1);
      }
   }

   const toggletoast = () => {
      Settoast(!toast);
   }

   async function selectedMint(data, index) {
      console.log("selectedMint called", data, index)
      setSelectedMintCard(prevSelectedCard => {
         const newSelectedCards = [...prevSelectedCard];
         const selectedIndex = newSelectedCards.findIndex(card => card.Index === index);

         const selectedData = { Index: index, Data: data };
         console.log(selectedData, "=================selectedData")
         if (selectedIndex === -1) {
            newSelectedCards.push(selectedData);
         } else {
            newSelectedCards.splice(selectedIndex, 1);
         }
         return newSelectedCards;
      });
   }


   async function selectedVault(data, index) {
      setSelectedVaultCard(prevSelectedCard => {
         const newSelectedCards = [...prevSelectedCard];
         const selectedIndex = newSelectedCards.findIndex(card => card.Index === index);

         const selectedData = { Index: index, Data: data };
         console.log(selectedData, "=================selectedData")
         if (selectedIndex === -1) {
            newSelectedCards.push(selectedData);
         } else {
            newSelectedCards.splice(selectedIndex, 1);
         }
         return newSelectedCards;
      });
   }

   async function selectedQuest(data, index) {
      setSelectedQuestCard(prevSelectedCard => {
         const newSelectedCards = [...prevSelectedCard];
         const selectedIndex = newSelectedCards.findIndex(card => card.Index === index);

         const selectedData = { Index: index, Data: data };
         console.log(selectedData, "=================selectedData")
         if (selectedIndex === -1) {
            newSelectedCards.push(selectedData);
         } else {
            newSelectedCards.splice(selectedIndex, 1);
         }
         return newSelectedCards;
      })
   }

   async function selectedTraining(data, index) {
      setSelectedTrainingCard(prevSelectedCard => {
         const newSelectedCards = [...prevSelectedCard];
         const selectedIndex = newSelectedCards.findIndex(card => card.Index === index);

         const selectedData = { Index: index, Data: data };
         console.log(selectedData, "=================selectedData")
         if (selectedIndex === -1) {
            newSelectedCards.push(selectedData);
         } else {
            newSelectedCards.splice(selectedIndex, 1);
         }
         return newSelectedCards;
      })
   }

   async function Lock() {
      console.log("Lock called");
      const tokenArray = [];

      selectedMintCard.forEach((card) => {
         console.log(card, "===========card");
         if (card.Data != null && card.Data != undefined) {
            const Token = card.Data.Token;
            tokenArray.push(Token);
         }

      });
      return tokenArray;
   }

   async function unLock() {
      const tokenArray = [];
      selectedVaultCard.forEach((card) => {
         console.log(card, "===========card");
         if (card.Data != null && card.Data != undefined) {
            const Token = card.Data.Token;
            tokenArray.push(Token);
         }
      });
      return tokenArray;
   }

   async function forStackSection() {
      const tokenArray = [];
      const characterArray = [];
      selectedVaultCard.forEach((card) => {
         console.log(card, "====card");
         if (card.Data != null && card.Data != undefined) {
            const Token = card.Data.Token
            tokenArray.push(Number(Token))
            let character = card.Data.character
            if (character == "Dragon") {
               characterArray.push(4)
            } else if (character == "Squire") {
               characterArray.push(1)
            }
         }
      });
      const array = {
         Token: tokenArray,
         Character: characterArray
      }
      return array;
   }

   async function forUnstackQuest() {
      const tokenArray = [];
      const characterArray = [];
      selectedQuestCard.forEach((card) => {
         console.log(card, "====card");
         if (card.Data != null && card.Data != undefined) {
            const Token = card.Data.Token
            tokenArray.push(Token)
            let character = card.Data.character
            if (character == "Dragon") {
               characterArray.push('4')
            } else if (character == "Squire") {
               characterArray.push('1')
            }
         }
      });
      const array = {
         Token: tokenArray,
         Character: characterArray
      }
      return array;
   }

   async function forUnstackTraining() {
      const tokenArray = [];
      const characterArray = [];
      selectedTrainingCard.forEach((card) => {
         console.log(card, "====card");
         if (card.Data != null && card.Data != undefined) {
            const Token = card.Data.Token
            tokenArray.push(Token)
            let character = card.Data.character
            if (character == "Dragon") {
               characterArray.push('4')
            } else if (character == "Squire") {
               characterArray.push('1')
            }
         }
      });
      const array = {
         Token: tokenArray,
         Character: characterArray
      }
      return array;
   }

   async function listArray(type1, type2, type3,type4) {
      console.log(type1, type2, type3,type4, "========================type", type2 === "vault", type3 === "quest")
      try {
         let mintedArray;
         let vaultArray;
         let questArray;
         let QuestArray;
         let regularArray;
         let trainingArray;
         let TrainingArray;

         honorQuest = await honorQuest_l1(user)
         // Fetch minted tokens
         const mintedTokens = await getstakedtokens(address);
         console.log(mintedTokens, "============================================minted Tokens");

         const vaultContract = await Vault_l1(user);
         console.log(user, "==========signer", address)
         vaultArray = await vaultContract.getVaultTokens(address);
         const Arr = vaultArray.toString().split(',')
         console.log(vaultArray.toString(), "================data in getVault Stake", vaultArray);

         const questContract = await quest_l2(user);
         QuestArray = await questContract.getStakedTokens(address)
         questArray = QuestArray.toString().split(',')
         console.log(questArray, "=================quest arry in the stack")

         const trainingContract = await training_l2(user);
         TrainingArray = await trainingContract.getStakedTokens(address)
         trainingArray = TrainingArray.toString().split(',')
         console.log(trainingArray,"===================training array in the stack")

         regularArray = Array.from(vaultArray);
         console.log(regularArray);

         regularArray = regularArray.filter(item => !questArray.includes(String(item)));
         console.log(regularArray, "===========regular array after filtering with quest");

         regularArray = regularArray.filter(item => !trainingArray.includes(String(item)));
         console.log(regularArray, "===========regular array after filtering with training");


         if (type1 == "mint" && mintedTokens.tokens ) {
            SetArray([])
            mintedArray = mintedTokens.tokens;
            console.log("minted Tokens in Array:", mintedArray);
            // mintedArray = mintedArray.filter(item => !regularArray.map(String).includes(item));
            // console.log("Remaining minted Tokens after filtering:", mintedArray);
            await Promise.all(mintedArray.map(async token => {
               console.log(token, "tokens in mint");
               if(token != ''){
               const owner = await honorQuest.ownerof(token)
               console.log(owner, token, "=================owner")
               await metaData(token, "mint");
              }
            }));
         }

         if (type2 == "vault") {
            SetstkArray([])
            console.log("============vault")
            await Promise.all(regularArray.map(async token => {
               console.log(token, "==========tokens in vault");
               await metaData(token.toString(), "vault");
            }));
         }

         if (type3 == "quest") {
            SetquestArray([])
            console.log("=========quest")
            await Promise.all(questArray.map(async token => {
               console.log(token, "=========token in the quest")
               if(token != ""){
                  await metaData(token, "quest")
               }
            }))
         }

         if(type4 == "training"){
            SettrainingArray([]);
            console.log("=============training")
            await Promise.all(trainingArray.map(async token =>{
               console.log(token,"============token in the training")
               if(token != ""){
                  await metaData(token, "training")
               }
            }))
         }

      } catch (error) {
         console.error("Error:", error);
      }
   }


   async function metaData(token, type) {
      let mintarrays = [];
      let vaultarray = [];
      let questarray = [];
      let trainingarray = [];
      if (type == "mint") {
         console.log("mint meta called", token)
         SetArray([])
         setmintLoad(true)
         console.log(array, "===========inital===========SetArray");
         const metadata = await gettokenUri(token);
         const res = await fetch(metadata.tokenUri);
         const json = await res.json();
         let char = json.attributes[0].value;
         const ic = { Token: token, character: char, inVault: false, stackIn: "mint" };
         mintarrays.push(ic);
         SetArray(prevArray => [...prevArray, ic]);
         setmintLoad(false)
         console.log(array, "======================SetArray");
      } else if (type == "vault") {
         SetstkArray([])
         setvaultLoad(true);
         // vaultLoad = true
         console.log("vault meta called", token)
         const metadata = await gettokenUri(token);
         const res = await fetch(metadata.tokenUri);
         const json = await res.json();
         let char = json.attributes[0].value;
         const ic = { Token: token, character: char, inVault: true, stackIn: "vault" };
         vaultarray.push(ic);
         SetstkArray(prevArray => [...prevArray, ic]);
         setvaultLoad(false)
         // vaultLoad = false
         console.log(stkarray, "======================SetstkArray");
      } else if (type == "quest") {
         SetquestArray([])
         setquestLoad(true);
         console.log("quest toekns in meta data", token);
         const questContract = await quest_l2(user);
         const metadata = await gettokenUri(token);
         const res = await fetch(metadata.tokenUri);
         const json = await res.json();
         let char = json.attributes[0].value;
         let character;
         if (char == "Squire") {
            character = 1;
         } else if (char == "Dragon") {
            character = 5;
         }
         const reward = await questContract.CurrentReward(address, token, character)
         console.log(reward, "=============reward")
         const ic = { Token: token, character: char, inVault: true, stackIn: "quest", reward: await rewardCalculation(reward) };
         console.log(ic, "==========rewards", reward)
         questarray.push(ic);
         SetquestArray(prevArray => [...prevArray, ic]);
         setquestLoad(false);
         console.log(questArray, "======================SetstkArray");
      }else if(type == "training"){
         SettrainingArray([])
         settrainingLoad(true);
         console.log(token,"========training token in the meta data")
         const metadata = await gettokenUri(token);
         const res = await fetch(metadata.tokenUri);
         const json = await res.json();
         let char = json.attributes[0].value;
         let character;
         if (char == "Squire") {
            character = 1;
         } else if (char == "Dragon") {
            character = 5;
         }
         const ic = { Token: token, character: char, inVault: true, stackIn: "training" };
         trainingarray.push(ic);
         SettrainingArray(prevArray => [...prevArray, ic]);
         settrainingLoad(false);
         console.log(questArray, "======================SetstkArray");
      }

   }

   async function rewardCalculation(reward) {
      const num_to_string = reward;
      const number = Number(num_to_string)
      const div = number / 10 ** 18
      const fixed = div.toFixed(2)
      console.log(fixed, "===================slice of")
      return fixed;
   }

   async function CurrentBalance() {
      const questContract = await quest_l2(user);
      console.log(questContract, "===========Quest contract", address)
      const claimedBalance = await questContract.claimedReward(address)
      const balance = await rewardCalculation(claimedBalance)
      console.log(balance, "==========claimed Balance")
      setBalance(balance);
   }

   async function Hornbalance(){
      const Horn = await horn_l1(user);
      const balance = await Horn.balanceof(address)
      console.log(balance,"===============balance of erc20 tokens")
      setHornBalance(balance)

   }

   async function getallActivity() {
      const Activity = await getAllActivity(address)
      console.log((Activity.data), "==========get all activity")
      setActivity(Activity.data)
      // activity.current=Activity.data
      console.log(Activity, "=============activity")
   }

   async function activityView(data, index) {
      console.log(data, index, "=============data")
      let activity = [];
      setModelCharacter([])
         await data.tokenId.map(async (token) =>{
         const metadata = await gettokenUri(token);
         const res = await fetch(metadata.tokenUri);
         const json = await res.json();
         let char = await json.attributes[0].value;
         const ic = { Token: token, character: char,Message: data.Message,Type: data.type };
         console.log(ic,"============push ic")
         await activity.push(ic)
         console.log(activity,"========activity")
         setModelCharacter(prev  => [...prev,ic])
         // modelCharacter = modelCharacter.flat();
          console.log( modelCharacter,"===========characater in the modal")
         setActivityview(true)
      })
   }

   async function switchMint() {
      Gen0Contract = new ethers.Contract(config.Gen0, Gen0, user);
      console.log(Gen0Contract);
      const mintCount = await Gen0Contract.minted()
      // await mintCount.wait()
      console.log(mintCount.toString(), "===========mintcount")
      const mintStr = mintCount.toString()
      const count = Number(mintStr);
      console.log(count, "==========count", typeof count)
      if(count <= 9999){
         setSwitchmint(true)
      }else {
         setSwitchmint(false)
      }
   }

   async function Mint() {
      console.log("mint=========", address)
      try {
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Give quatity to mint");
         }
         else if (address && address !== null && address !== undefined) {
            setMint(true)
            console.log(user, "===========signer")
            Gen0Contract = new ethers.Contract(config.Gen0, Gen0, user);
            console.log(Gen0Contract);
            Gen1Contract = new ethers.Contract(config.Gen1,Gen1,user)
            const signature = await gen0Signature(address, clicks)
            console.log(signature, "=============sign in mint")
            const signData = signature.message
            console.log(signData, "===========signature data")
            // const mintCount = await Gen0Contract.minted()
            // console.log(mintCount.toString(),"===========mintcount")
            // const mintStr = mintCount.toString()
            // const count = Number(mintStr);
            // console.log(count,"==========count",typeof count)
            if(switchmint){
               console.log("gen0 called in the ")
               const minting = await Gen0Contract.mint(clicks, signData.deadline, signData.nonce, signData.v, signData.r, signData.s, { value: mintValueInWei });
               console.log(minting);
               await minting.wait();
            }else{
               console.log("gen1 called in the")
               const minting = await Gen1Contract.mint(address,clicks, signData.deadline, signData.nonce, signData.v, signData.r, signData.s);
               console.log(minting);
               await minting.wait();
            }
            // const minting = await Gen1Contract.mint(clicks, signData.deadline, signData.nonce, signData.v, signData.r, signData.s, { value: mintValueInWei });
            // console.log(minting);
            // await minting.wait();
            console.log("=====addresss========")
            SetmintStatus(true)
            console.log("sts changed --------------------");
            setClicks(0);

            const minted = await Gen0Contract.minted();
            console.log(minted.toString())
            getallActivity()
            mintedTokens = await getstakedtokens(address);
            mintedTokens.tokens.forEach(async (token) => {
               console.log(token, "=======minted tokens on mint fn");
               metadata = await gettokenUri(token);
               console.log(metadata.tokenUri, "========tokenuri of mint fn")
            })
            setClicks(0);
            setMint(false)
            Settoast(true);
            Settoastmessage("Mint Successfull")
         }
      }
      catch (error) {
         setMint(false)
         Settoast(true)
         Settoastmessage("Mint Failed")
         console.log(error, "==========")
      }

   }

   async function crossMint() {
      try {
         console.log("=============================crossmint called")
         if (clicks === 0) {
            Settoast(true);
            Settoastmessage("Give quatity to mint");
         }
         else if (address && address !== null && address !== undefined) {
            setMint(true)
            console.log(user, "===========signer")
            Gen0Contract = new ethers.Contract(config.Gen0, Gen0, user);
            console.log(Gen0Contract);
            const signature = await gen0Signature(address, clicks)
            console.log(signature, "=============sign in mint")
            const signData = signature.message
            console.log(signData, "===========signature data")
            setClicks(0);
            setMint(false)
            Settoast(true);
            Settoastmessage("Mint Successfull")
            return signData;
         }
      }
      catch (e) {
         setMint(false)
         Settoast(true)
         Settoastmessage("MInt Failed")
         console.log(e, "==========")
      }
   }

   async function Stake() {
      try {
         if (selectedVaultCard.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in Quest");
         } else if (address && address !== null && address !== undefined) {
            QuestStakeContract = quest_l2(user)
            NftContract = honorQuest_l2(user)
            honorQuest = await honorQuest_l1(user)
            const arr = await forStackSection()
            console.log(address, arr.Token, arr.Character, "============parameters")
            if (arr !== null) {
               arr.Token.map(async (id) =>{
                  const owner = await honorQuest.ownerof(id);
                  console.log(owner,id,"++++++++++++++++++++++++++++++++++++finding owner")
                })
            }
            const Stake = await stake(address, arr.Token, arr.Character)
            console.log(Stake, "+===========+stake called")
            // await Stake.wait();
            getallActivity()
            setSelectedVaultCard([]);
            setQueststs(true)
            Settoast(true);
            Settoastmessage("Stake Successfull")
         }
      }
      catch (error) {
         setSelectedVaultCard([]);
         Settoast(true)
         Settoastmessage("Stack unSuccessfull")
         console.log(error, "==========")
      }

   }

   async function UnStake() {
      try {
         if (selectedQuestCard.length == 0) {
            Settoast(true);
            Settoastmessage("Select the card to calim Reward");
         } else if (address && address !== null && address !== undefined) {
            const arr = await forUnstackQuest()
            const questContract = await quest_l2(user);
            const canUnstack = await questContract.getUnstakedTokens(address);
            // const canUnstack = [1,2,4]
            console.log(arr.Token, "============token ")
            const validate = arr.Token.every(token => canUnstack.includes(token));
            if (validate) {
               const unStack = await unstake(address, arr.Token, arr.Character)
               console.log(unStack, "+++++++++++unstack")
               getallActivity()
               setSelectedQuestCard([]);
               setQueststs(true);
               Settoast(true);
               Settoastmessage("unStake Successfull")
            } else {
               setSelectedQuestCard([]);
               Settoast(true);
               Settoastmessage("can't Unstake Before 2 days")
            }
         }
      }
      catch (err) {
         console.log(err)
         Settoast(true)
         Settoastmessage("Stack unSuccessfull")
         console.log(err, "==========")
      }
   }

   async function claimquestReward() {
      try {
         const Token = []
         const character = []
         if (selectedQuestCard.length == 0) {
            Settoast(true);
            Settoastmessage("Select the card to calim Reward");
         } else if (address && address !== null && address !== undefined) {
            selectedQuestCard.forEach(async (card) => {
               console.log(card, "====card");
               if (card.Data != null && card.Data != undefined) {
                  Token.push(card.Data.Token)
                  let char = card.Data.character
                  if (char == "Dragon") {
                     character.push(5)
                  } else if (char == "Squire") {
                     character.push(1)
                  }
                  const claimReward = await claimQuestReward(address, Token, character)
                  console.log(claimReward, "===========claim reward")
                  setClaimQuest(claimReward)
               }
            });
         }

      }
      catch (err) {
         console.log(err)
      }
   }

   async function Vaultstack() {
      console.log(user, "=============signer.current")
      try {
         if (selectedMintCard.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in the Vault");
         } else if (address && address !== null && address !== undefined) {
            honorQuest = await honorQuest_l1(user);
            vaultContract = await Vault_l1(user);
            console.log(user, "=============signer.current");
            const approve = await checkapprove(address, user);
            console.log("check approve", approve);
            if (approve === true) {
               console.log("============if===");
               const arr = await Lock();
               console.log(address, arr, "============parameters");
               if (arr !== null) {
                  arr.map(async (token) => {
                     const owner = await honorQuest.ownerof(token);
                     console.log(owner, token, "=============owner");
                  });
                  const vaultstake = await vaultContract.depositToken(arr);
                  console.log(vaultstake, "===========vaultStake");
                  await vaultstake.wait();
                  arr.map(async (token) => {
                     const owner = await honorQuest.ownerof(token);
                     console.log(owner, token, "=============owner");
                  });
                  const array = await vaultContract.getVaultTokens(address);
                  console.log(array.toString(), "================data in getVault Stake");
                  const vaultActivity = await vaultStack(address, arr, 'Vault')
                  console.log(vaultActivity, "===========vault activity")
                  getallActivity()
                  setVaultsts(true);
                  Settoast(true);
                  Settoastmessage("Vault Staked Successfully");
                  setSelectedMintCard([]);
               }
            } else {
               console.log("else ===============");
               const arr = await Lock();
               console.log(address, arr, "============parameters");
               const approveall = await setApproval(user);
               console.log(approveall, "==================approve");
               const vaultstake = await vaultContract.depositToken(arr);
               console.log(vaultstake, "===========vaultStake");
               setVaultsts(true);
               await vaultstake.wait();
               const array = await vaultContract.getVaultTokens(address);
               console.log(array.toString(), "================data in getVault Stake");
               const vaultActivity = await vaultStack(address, arr, 'Vault')
               console.log(vaultActivity, "===========vault activity")
               Settoast(true);
               Settoastmessage("Vault Staked Successfully");
               setSelectedMintCard([]);
            }
         }
      } catch (err) {
         Settoast(false);
         Settoastmessage("");
         console.log("error:", err);
      }
   }


   async function VaultUnstack() {
      try {
         if (selectedVaultCard.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to UnStake in the Vault");
         }
         else if (address && address !== null && address !== undefined) {
            honorQuest = await honorQuest_l1(user)
            vaultContract = await Vault_l1(user)
            console.log(user, "=============signer.current")

            const arr = await unLock()
            console.log(address, arr, "============parameters")

            arr.map(async (tokens) => {
               const ownerOf = await honorQuest.ownerof(tokens);
               console.log("ownerof", ownerOf, tokens)
            })
            const vaultStake = await vaultContract.retrieveToken(address, arr);
            console.log(vaultStake, "===========vaultStake");
            const vaultActivity = await vaultUnStack(address, arr, 'Unvault')
            console.log(vaultActivity, "===========vault activity")
            await vaultStake.wait();
            getallActivity()
            SetstkArray([])
            setVaultsts(true);
            setClicks(0);
            const ownerOf1 = await honorQuest.ownerof(3);
            console.log("ownerof", ownerOf1)
            const array = await vaultContract.getVaultTokens(address);
            console.log(array.toString());
            Settoast(true);
            Settoastmessage("Vault Unstaked Successfull")
            setSelectedVaultCard([])
         }
      }
      catch (err) {
         Settoast(false)
         Settoastmessage("Vault Unstaked Unsuccessfull")
         console.log("error:", err)
      }
   }

   async function TrainingStack() {
      console.log("+================select=====================+")
      try {
         if (selectedVaultCard.length === 0) {
            Settoast(true);
            Settoastmessage("Select Tokens to Stake in Quest");
         } else if (address && address !== null && address !== undefined) {
            QuestStakeContract = quest_l2(user)
            NftContract = honorQuest_l2(user)
            const honorQuest = await honorQuest_l1(user);
            // const approveall = await honorQuest.setApprovalforAll(config.Training, true);
            // await approveall.wait();
            const arr = await forStackSection()
            console.log(address, arr.Token, arr.Character, "============parameters")
            // if (arr !== null) {
            //    // arr.map(async (token) => {
            //    const owner = await honorQuest.ownerof(2);
            //    console.log(owner, 2, "=============owner");
            //    // });
            // }
            const Stake = await trainingStake(address, arr.Token, arr.Character)
            console.log(Stake, "+===========+stake called")
            getallActivity()
            setSelectedVaultCard([]);
            setSelectedOption('')
            setTrainingsts(true)
            Settoast(true);
            Settoastmessage("Trainingstake Successfull")
         }
      }
      catch (err) {
         Settoast(false)
         Settoastmessage("Trainingstake Unsuccessfull")
         console.log("error:", err)
      }
   }

   async function TrainingUnstack() {
      try {
         if (selectedTrainingCard.length == 0) {
            Settoast(true);
            Settoastmessage("Select the card to Unstack in Training");
         } else if (address && address !== null && address !== undefined) {
            const arr = await forUnstackTraining()
               const unStack = await trainingUnstake(address, arr.Token, arr.Character)
               console.log(unStack, "+++++++++++unstack")
               getallActivity()
               setSelectedTrainingCard([]);
               setTrainingsts(true);
               Settoast(true);
               Settoastmessage("Training Unstake Successfull")
         }
      }
      catch (err) {
         console.log(err)
         Settoast(true)
         Settoastmessage("Stack unSuccessfull")
         console.log(err, "==========")
      }
   }

   function stacksection(e){
      console.log(e,"====================event")
      const Selectedstack = e.target.value 
      if(Selectedstack == "Quest"){
         Stake()
      }else if(Selectedstack == "Training"){
         TrainingStack();
      }else{
         setSelectedOption(Selectedstack)
      }

   }

   return (
      <div>
         <div class="cont">
            <div class="header">
               <ToastContainer className="p-3" position='top-left' style={{ zIndex: 1 }}>
                     <Toast show={toast} delay={3000} autohide onClose={toggletoast} bg="dark">
                        <Toast.Header>
                           <strong className="me-auto">HonorQuest - Mint0</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'> {toastmessage}</Toast.Body>
                     </Toast>
               </ToastContainer>
               <Navbar expand="lg" sticky="top" className="fixed-header">
                  {address && (
                     <Nav style={{ border: "2px solid", borderRadius: "5px" }}>
                        <FloatingLabel controlId="HornBalance" label="Horn Balance" className="mr-2" style ={{width:'fit-content'}}>
                           <Form.Control type="text"  style ={{width:'145px'}} placeholder="Horn Balance" readOnly value={ hornBalance + " " + "horn"}/>
                        </FloatingLabel>
                     </Nav>
                  )}
                  {address && (
                     <Nav style={{ border: "2px solid", borderRadius: "5px" }}>
                        <FloatingLabel controlId="walletAddress" label="Wallet Address" className="mr-2"  >
                           <Form.Control type="text" placeholder="Wallet Address" readOnly value={address} />
                        </FloatingLabel>
                     </Nav> 
                  )}
                  <Nav>
                     <Button variant="info" onClick={() => (wallet ? DisconnectWallet() : connect())} style={{ display: "flex" }}>
                        {connecting ?  'Connecting' : address ? 'Disconnect' : 'Connect'}
                     </Button>
                  </Nav>
               </Navbar>
            </div>
            <div className='firstRow'>
               <div className='mint'>
                  {address && (
                     <div style={{ paddingLeft: "3%", paddingTop: "2%" }}>
                        <p>Select how many quantities to mint</p>
                     </div>
                  )}

                  {address && (
                     <div style={{ paddingTop: "1%" }}>
                        <Button variant="info" onClick={DecreaseItem}>-</Button>
                        <span style={{ paddingRight: "2%", paddingLeft: "2%" }}> {clicks} </span>
                        <Button variant="info" onClick={IncrementItem}>+</Button>
                        <br></br>
                     </div>
                  )}

                  {address && (
                     <div className='crossMint' style={{ paddingTop: "1%" }}>
                        <Button variant="success" onClick={Mint} disabled={mint}>{mint ? "Minting" : "Mint"}</Button>
                        { switchmint && (<Crossmint crossMint={crossMint} clicks={clicks} address={address} />)}
                     </div>
                  )}
               </div>
               <div className='val'>
                   {!vaultLoad ? (
                  <div className='vault'>
                     {stkarray.length !== 0 ? ( 
                     <>
                        <div class='heading' >
                           <div>
                              {address && (
                                 <div style={{ paddingTop: "1%" }}>
                                    <select className='select' value={selectedOption} onChange={(e) =>{stacksection(e)}}>
                                       <option className='option' value={""}>
                                          Select StackIn
                                       </option>
                                       <option className='option' value={"Quest"}>
                                          Quest
                                       </option>
                                       <option className='option' value={"Training"}>
                                          Training
                                       </option>
                                    </select>
                                 </div>
                              )}
                           </div>

                           <div>
                              {address && (
                                 <div style={{ paddingTop: "1%" }}>
                                    <Button variant="success" onClick={VaultUnstack}>UnLock</Button>
                                 </div>
                              )}
                           </div>
                        </div>
                        <div className='row'>
                           {stkarray.length != 0 && stkarray.map((data, index) => (
                              <div className='col-3' onClick={() => selectedVault(data, index)}>
                                 <div className={`card ${selectedVaultCard.findIndex(card => card.Index === index) !== -1 ? 'selectedVault' : ''}`}>
                                    <img src={data.stackIn == "vault" && data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data.Token}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </>
                    ) : (<div className='noData'><strong>NO Data</strong></div>)}
                  </div>
                   ) : (<div className='vault'>
                      <CustomLoader />
                   </div>)} 
                  <div className='reward'>
                     <p>CurrentBalance:{balance} Honr</p>
                     <button class="btn">WITHDRAW</button>
                  </div>
               </div>

            </div>
            <div class="lastRow">
               <div>
                  {!mintLoad ? (
                     <>
                        {array && array.length !== 0 ? (
                           <div class="lock">
                              <div>
                                 {address && (
                                    <div style={{ marginLeft: "50vh" }}>
                                       <Button variant="success" onClick={Vaultstack}>Lock</Button>
                                    </div>
                                 )}
                              </div>
                              <div className='row'>
                                 {array.length != 0 && array.map((data, index) => (
                                    <div className='col-3' onClick={() => selectedMint(data, index)}>
                                       <div className={`card ${selectedMintCard.findIndex(card => card.Index === index) !== -1 ? 'selected' : ''}`}>
                                          <img src={data.stackIn == "mint" && data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                                          <div className="card-body">
                                             <p className="card-text">{data.Token}</p>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        ) : (<div className='noData'><strong>NO Data</strong></div>)}
                     </>
                  ) : (<div class="lock"><CustomLoader /></div>)}
                  <div className='action'>
                     <div><strong>Activity Controller</strong></div>
                     <div>
                        {activity && activity.length != 0 && activity.map((data, index) => (
                           <div class='card' onClick={() => activityView(data, index)}>
                              <div class='card-body'>
                                 {data.Message}
                              </div>
                           </div>
                        )
                        )}
                     </div>
                  </div>
               </div>
               <div class="stacks">
                  <div class='stacks_first'>
                     {/* <div class='Quest'>
                        <div class='title'>
                           <strong>QUEST</strong>
                           <button class='btn'>Unstack</button>
                        </div>
                        <div class='row'>
                           {questArray.length !=0 && questArray.map((data,index) => (
                              <div className='col-6'>
                                 <div className="card">
                                 <img src={data.stackIn == "quest" && data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data.Token}</p>
                                       <div class="text-muted">
                                         123456
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div> */}
                     {!questLoad ? (
                        <>
                           {questArray.length != 0 ? (
                              <div class="Quest">
                                 <div class="title">
                                    <strong>QUEST</strong>
                                    <button class="btn claim" onClick={claimquestReward}>claim</button>
                                    <button class="btn" onClick={UnStake}>Unstack</button>
                                 </div>
                                 <div class="row flex-nowrap overflow-auto">
                                    {questArray.length != 0 && questArray.map((data, index) => (
                                       <div className='col-6' onClick={() => selectedQuest(data, index)}>
                                          <div className={`card ${selectedQuestCard.findIndex(card => card.Index === index) !== -1 ? 'selected' : ''}`}>
                                             <img src={data.stackIn == "quest" && data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                                             <div className="card-body">
                                                <p className="card-text p-1"><strong>{data.Token} </strong></p>
                                                <div class="text-muted">
                                                   {data.reward}
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ) : (<div className='noData'><strong>NO Data</strong></div>)}
                        </>
                     ) : (<div class="Quest"><CustomLoader /></div>)}

                     <div class='Liyer'>
                        <div class='title'>
                           <strong>LIAR</strong>
                           <button class='btn'>Unstack</button>
                        </div>
                        <div class='row'>
                           {liyerArray.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src={imgchar} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data.Token}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div class='stacks_last'>
                     {!trainingLoad ? (
                        <>
                           {trainingArray.length !=0 ?(
                              <div class='Training'>
                                 <div class='title'>
                                    <strong>TRAINING</strong>
                                    <button class='btn' onClick={TrainingUnstack}>Unstack</button>
                                 </div>
                                 <div class="row flex-nowrap overflow-auto">
                                    {trainingArray.length != 0 && trainingArray.map((data, index) => (
                                       <div className='col-6' onClick={() => selectedTraining(data, index)}>
                                          <div className={`card ${selectedTrainingCard.findIndex(card => card.Index === index) !== -1 ? 'selected' : ''}`}>
                                             <img src={data.stackIn == "training" && data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                                             <div className="card-body">
                                                <p className="card-text p-1"><strong>{data.Token} </strong></p>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           ): (<div className='noData'><strong>NO Data</strong></div>)}
                        </>
                     ) : (<div class="Training"><CustomLoader /></div>)}
                     <div class='Joesting'>
                        <div class='title'>
                           <strong>JOESTING</strong>
                           <button class='btn'>Unstack</button>
                        </div>
                        <div class='row'>
                           {joestingArray.map((data) => (
                              <div className='col-4'>
                                 <div className="card">
                                    <img src={imgchar} class="card-img-top" alt="..." />
                                    <div className="card-body">
                                       <p className="card-text">{data.Token}</p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>


         </div>
         <div>
            <Modal
               isOpen={activityview}
               style={{
                  content: {   
                     width: '50%',
                     margin: 'auto',
                     border: '1px solid #ccc',
                     borderRadius: '5px',
                     padding: '20px',
                     height: '300px'
                  }
               }}
               
               onRequestClose={() => {setActivityview(false)}}
            >
                          
               { modelCharacter.map((data,index) => (
                  
                  <div className='card'>
                     <img src={data.character === "Dragon" ? "/assests/images/dragon.svg" : "/assests/images/squire.svg"} class="card-img-top" alt="..." />
                     <div className="card-body">
                        <p className="card-text p-1"><strong>Token : {data.Token} </strong></p>
                        <p className="card-text p-1"><strong>Message : {data.Message} </strong></p>
                        <p className="card-text p-1"><strong>Type : {data.Type} </strong></p>
                     </div>
                  </div>
               ))}

            </Modal>


         </div>

      </div>

   )
}

export default Wallet
