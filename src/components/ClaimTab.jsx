import { Typography, Button } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import web3 from '../helpers/Web3'
import config from "../helpers/config.json"

function ClaimTab({ activeAcc }) {

    const tokenContract = useRef(null)
    const [hasClaimed, sethasClaimed] = useState(true)
    useEffect(() => {

        async function main() {
            try {
                if (!activeAcc) return
                tokenContract.current = new web3.eth.Contract(config.tokenAbi, config.tokenAddress);

                const hasClaimed = await tokenContract.current.methods.claimList(activeAcc).call()
                sethasClaimed(hasClaimed)

            } catch (e) {
                console.log(e);
            }
        }

        main()
    }, [activeAcc])

    async function claimTokens() {
        try {
            if (!activeAcc) alert("Connect wallet!")
            const res = await tokenContract.current.methods.claimFreeTokens(activeAcc).send({
                from: activeAcc
            })
            if (res.status) {
                sethasClaimed(true)
                try {
                    await window.ethereum.request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20',
                            options: {
                                address: config.tokenAddress,
                                symbol: "STKS",
                                decimals: 2,
                                image: window.location.origin + "/favicon.ico",
                            },
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (e) {
            alert("something went wrong!")
            console.log(e);
        }

    }



    return (
        <div style={{ display: "flex", padding: "2rem", justifyContent: "space-between", flexDirection: "column", gap: "2rem" }}>
            <Typography variant="h5" style={{ color: "white" }}>
                CLAIM YOUR FREE TOKENS
            </Typography>
            <Typography variant='h6' style={{ color: "white" }}>
                The Stacksies ERC-20 contract is designed in a way to reward new address with a 1000 Stacksies. This amount can only be claimed once per address. Claim your reward to start staking!
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', gap: "1rem" }}>
                <Typography variant='body2' style={{ color: "white" }}>
                    Click claim to claim your tokens
                </Typography>
                <Button onClick={claimTokens} disabled={hasClaimed} variant="outlined" style={{ color: "white", borderColor: "white", borderWidth: "0.1rem" }}>
                    {hasClaimed ? "Already claimed" : "Claim"}
                </Button>
            </div>

        </div>
    )
}

export default ClaimTab