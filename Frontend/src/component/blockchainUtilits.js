import { ethers } from 'ethers';
import {Gen0} from"../lib/L1/gen0";
import { Horn } from '../lib/L1/horn';
import {HonorQuest} from "../lib/L1/honorQuest"
import {vault} from "../lib/L1//vault"
import {HonorQuest_l2} from "../lib/L2/honrQuest"
import {Quest_l2} from "../lib/L2/quest"
import { Training_l2 } from '../lib/L2/Training';
const config = require('../config')

async function gen0(signer){
    console.log(Gen0,signer,"=======================signrer")
    const gen0 =  new ethers.Contract(config.Gen0, Gen0, signer);
    console.log(gen0,"==============gen0")
    return gen0
}

async function Vault_l1(signer){
    console.log(vault,signer,"==================signer")
    const val = new ethers.Contract(config.Vault, vault, signer);
    console.log(val,"++++++++++++++++vault");
    return val;
}

async function honorQuest_l1(signer){
    console.log(HonorQuest,signer,"==================signer")
   const HQ = new ethers.Contract(config.L1NFT, HonorQuest, signer);
    console.log(HQ,"+++++++++++++++++++++HQ")
    return HQ;
}

async function horn_l1(signer){
    const horn = new ethers.Contract(config.Horn,Horn,signer)
    return horn
}

async function honorQuest_l2(signer) {
    console.log(HonorQuest_l2,signer,"================signer")
    const L2_HQ = new ethers.Contract(config.L2NFT, HonorQuest_l2, signer);
    console.log(L2_HQ,"=====================honor quest of L2")
    return L2_HQ;
}

async function quest_l2(signer){
    console.log(Quest_l2,signer,"==================signer")
    const quest = new ethers.Contract(config.Quest, Quest_l2, signer);
    console.log(quest,"===============quest")
    return quest;
}

async function training_l2(signer){
    console.log(Training_l2,"+++++++++++++++++++++++signer");
    const training = new ethers.Contract(config.Training,Training_l2,signer);
    console.log(training,"=================training_l2");
    return training;
}

async function checkapprove(address,signer){
    console.log(address,signer,"========================checkapprove function")
    const honorQuest = await honorQuest_l1(signer)
    const approve = await honorQuest.isApprovedforAll(address,config.Vault)
    console.log(approve,"=============approved",signer)
    return approve
}

async function setApproval(signer){
    const honorQuest = await honorQuest_l1(signer);
    const approveall = await honorQuest.setApprovalforAll(config.Vault, true);
    await approveall.wait();
    return approveall;
}

export {
    gen0,
    Vault_l1,
    honorQuest_l1,
    horn_l1,
    honorQuest_l2,
    quest_l2,
    training_l2,
    checkapprove,
    setApproval
}