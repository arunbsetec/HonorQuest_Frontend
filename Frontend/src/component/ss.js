import React, { useState } from 'react';
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'

const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()

const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`

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
      id: '0x5390985',
      token: 'MATIC',
      label: 'Matic Mumbai',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/'
    }
  ]
})

const Wallet = () =>{
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [address, setAddress] = useState(null);

  let ethersProvider;

  if (wallet) {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
    console.log(ethersProvider);
   ethersProvider.getSigner().then((result)=>{
        return result.address;
    }).then((address)=>{
        localStorage.setItem('Address',address)
        setAddress(address);
    }); 
  }

  return (
    <div>
     <div>
      <h1>Wallet Info</h1>
      <button onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
      <p>Address: {wallet ? address : ''} </p>
    </div>
    </div>
  )
}

const WalletComponent = () => {
  //const [chainId, setChainId] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    console.log(window.ethereum)
    if (window.ethereum) {
      try {
        //await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        // const network = await provider.getNetwork();
        // setChainId(network.chainId);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  return (
    <div>
      <h1>Wallet Info</h1>
      <button onClick={connectWallet}>Connect to MetaMask</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};

export {WalletComponent,Wallet}