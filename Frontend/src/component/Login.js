import React, { useState } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useAuth } from './AuthContext';
import "../css/login.css";

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

const Login = () => {
   const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
   const [address, setAddress] = useState(null);
   const [toastmessage, Settoastmessage] = useState("");
   const [toast, Settoast] = useState(false);
   const navigate = useNavigate()
   const { setUser } = useAuth();
   let provider;

   if (wallet) {
      provider = new ethers.BrowserProvider(wallet.provider, 'any');
      console.log(provider);
      provider.getNetwork().then(network => {
         console.log(network.chainId, '=== 11155111n', "========networks")
      if (network.chainId != '11155111') {
         Settoast(true);
         Settoastmessage("Connect with mumbai network");
      } else {
         provider.getSigner().then((result) => {
               console.log(result, "===========result");
               // const res = JSON.parse({result:result.provider})
               // localStorage.setItem("Result",res)
               // console.log((localStorage.getItem('Result')[0]),'================================ls in ls',res)
               setUser(result)
               return result.address
            }).then((address) => {
               localStorage.setItem('Address', address);
               setAddress(address);
               navigate('home')
            });
         }
      })
   }

   return (
      <div className='container con'>
         <div className='wallet'>
            <h1>Wallet Connection</h1>
            <button className="btn bt" onClick={() => (wallet ? disconnect(wallet) : connect())}>
               {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'connect'}
            </button>
         </div>
      </div>
   )
}

export default Login

