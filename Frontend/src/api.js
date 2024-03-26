import axios from "axios";
import { l2api } from "./config";
import {Activity} from './config'
import { id } from "ethers";

export function stake(address, tokenIds, characters) {
    console.log(address, tokenIds, characters,"================apiiiiiiiiii")
    try{
        const result = axios.post(`${l2api.stake}`, { address, tokenIds, characters})
        console.log(result.data,"================result")
        return result;
    }
    catch(e){
        console.log(e,"===========error")
        return e;
    }
}

export async function unstake(address, tokenIds, characters){
    try{
        console.log(address, tokenIds, characters,"=====================address, tokenIds, characters")
        const result  = await axios.post(`http://localhost:4000/L2/unstake`, { address:address, tokenIds:tokenIds, characters:characters})
        console.log(result,"===========result")
        return result.data
    }
    catch(e){
        console.log(e,"=======error")
        return e;
    }
}

export async function getstakedtokens(address){
    try{
        const restut  = await axios.get(`${l2api.stakedtokens}/${address}`)
        console.log(restut.data,"==========result")
        return restut.data
    }
     catch(e) {
        console.log(e)
        return e;
     }
}


export async function gettokenUri(tokenId){
    try{
        const result = await axios.get(`${l2api.tokenuri}/${tokenId}`)
        console.log(result.data,"=======repone of uri");
        return result.data;
    }
    catch(e){
        console.log(e);
        return e;
    }
}

export async function gen0Signature(address,quatity){
    try{
        console.log(address,quatity,"========quantity")
        const result = await axios.post(`http://localhost:4000/L2/gen0Signature`,{address:address,quantity:quatity})
        console.log(result,"===========result")
        return result.data
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export async function gen1Signature(address,quatity){
    try{
        console.log(address,quatity,"========quantity")
        const result = await axios.post(`http://localhost:4000/L2/gen1Signature`,{address:address,quantity:quatity})
        console.log(result,"===========result")
        return result.data
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export async function getQuestStack(address){
    try{
        console.log(address,"==============address");
        const result = await axios.get(`${l2api.getQuestStack}/${address}`)
        console.log(result,"=====result");
        return result.data;
    }
    catch(e){
        console.log("error:",e)
        return e;
    }
}

export async function claimQuestReward(address,tokenId,character){
    try{
        console.log(address,tokenId,character,"========================== claimQuestReward")
        const result = await axios.post(`${l2api.claimQuestReward}`,{address,tokenId,character});
        console.log(result,"==========result");
        return result.data;
    }
    catch(err){
        console.log("error:",err)
        return err;
    }
}

export async function vaultStack(address,tokenId,type){
    try{
        const res = await axios.post(`${Activity.vaultStack}`,{address,tokenId,type});
        console.log(res,"======= result of the activity stack");
        return res;
    }
    catch(e){
        console.log(e,"===========error");
        return e;
    }
}

export async function vaultUnStack(address,tokenId,type){
    try{
        const res = await axios.post(`${Activity.vaultUnstack}`,{address,tokenId,type});
        console.log(res,"======= result of the activity stack");
        return res;
    }
    catch(e){
        console.log(e,"===========error");
        return e;
    }
}

export async function claimReward(address,reward,type){
    try{
        const res = await axios.post(`${Activity.claimReward}`,{address,reward,type});
        console.log(res,"======= result of the activity reward");
        return res;
    }
    catch(e){
        console.log(e,"===========error");
        return e;
    }
}

export async function getAllActivity(id){
    try{
        const res = await axios.get(`${Activity.getAllActivity}/${id}`);
        console.log(res.data,"===============result of the get all activity")
        return res.data;
    }
    catch(e){
        console.log(e,"============error");
        return e
    }
}

export async function getIdActivity(id){
    try{
        const res = await axios.get(`${Activity.getIdActivity}/${id}`)
        console.log(res,"==========result of the getID activity");
        return res;
    }
    catch(e){
        console.log(e,"====error");
        return e;
    }
}

export async function trainingStake(address,tokenId,character){
    try{
        const res = await axios.post(`${l2api.trainingStake}`,{address,tokenId,character})
        console.log(res,"===============result of tge trainingStake");
        return res;
    }
    catch(err){
        console.log("error:",err)
        return err;
    }
}

export async function trainingUnstake(address,tokenId,character){
    try{
        const res = await axios.post(`${l2api.trainingUnstake}`,{address,tokenId,character})
        console.log(res,"===============result of tge trainingStake");
        return res;
    }
    catch(err){
        console.log("error:",err)
        return err;
    }
}

export async function claimSignature(address){
    try{
        const res = await axios.post(`${l2api.claimSignature}`,{address})
        console.log(res,"============result of the claim signature");
        return res.data;
    }
    catch(err){
        console.log("error:",err);
        return err;
    }
}