import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { useState } from "react";
    
    export default function Crossmint(props) {
        const [mintConfig,setMintConfig] =useState()
        const [address,setAddress] = useState()
        const click = async() =>{
            const res = await props.crossMint()
            const clicks = props.clicks
            const address = props.address
            setAddress(address)
            console.log(res,"=====================mint of",clicks)
            const totalPrice = (clicks*0.01).toString()
            console.log(totalPrice,"=====total price")
            console.log(res.deadline,"=========_deadline")
            console.log(res.nonce,"+===========nonce")
            console.log(res.v,"========v")
            console.log(res.r,"================r")
            console.log(res.s,"=============s")
            setMintConfig ( {
                totalPrice:0.01.toString(), //(clicks * 0.01).toString(),
                quantity: clicks,
                _deadline: res.deadline,
                nonce: res.nonce,
                v: res.v,
                r: res.r,
                s: res.s
            })
            console.log(mintConfig,"========config")
        }
        return (
            <CrossmintPayButton onClick={click}
                collectionId="ba5cbf2b-e2bb-4e41-aaf0-f411e61d0fba"
                projectId="c0ba1a91-5a00-4a67-bc5f-e7a5102e271a"
                mintConfig={mintConfig}
                environment="staging"
                mintTo= {address}
            />
        );
    }

