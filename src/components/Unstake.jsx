import { Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import web3 from '../helpers/Web3'
import config from "../helpers/config.json"

function Unstake({ activeAcc }) {

    const tokenContract = useRef()
    const [Stake, setStake] = useState(0)
    const [rewards, setrewards] = useState(0)

    useEffect(() => {
        main()
        setInterval(estimateRewards, 3000)
    }, [activeAcc])

    async function estimateRewards() {
        try {
            if (!activeAcc) return
            const res = await tokenContract.current.methods.calculateRewards(activeAcc).call()
            setrewards(parseInt(res) / 1e2)
        } catch (e) {
            console.log(e);
        }

    }
    async function main() {
        try {
            if (!activeAcc) return
            tokenContract.current = new web3.eth.Contract(config.tokenAbi, config.tokenAddress);

            const stake = await tokenContract.current.methods.stakes(activeAcc).call();

            if (parseInt(stake.amount) > 0) {
                setStake(parseInt(stake.amount / 1e2))
            }
            else {
                setStake(0)
            }
        } catch (e) {
            console.log(e);
        }

    }

    async function collectRewards() {
        if (!activeAcc) return alert("Connect wallet first!")

        try {
            const res = await tokenContract.current.methods.withdrawRewards().send({
                from: activeAcc
            })
        } catch (e) {
            alert("Something went wrong!")
            console.log(e);
        }
    }

    async function unstakeTokens() {
        if (!activeAcc) return alert("Connect wallet first!")
        try {
            const res = await tokenContract.current.methods.unstake().send({
                from: activeAcc
            })
            if (res.status) main()
        } catch (e) {
            alert("Something went wrong!")
            console.log(e);
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            <Typography variant="h5" style={{ color: "white" }}>
                Unstake and collect your accumulated Rewards
            </Typography>
            <Typography variant='caption' style={{ color: "white", fontSize: "0.85rem" }}>
                Unstaking your tokens will also result in collecting your accumulated rewards
            </Typography>
            <Typography style={{ color: "white", marginTop: "2rem" }}>
                Total amount staked : {Stake} Stacksies
            </Typography >
            <Button onClick={unstakeTokens} variant='outlined' style={{ color: "white", border: " solid 2px white", marginTop: "0.5rem" }} >
                Unstake
            </Button>
            <Typography style={{ color: "white", marginTop: "2rem" }}>
                Your Real time rewards :
                <span style={{ color: "green" }}> {rewards}</span>
            </Typography>
            <Button onClick={collectRewards} variant='outlined' style={{ color: "white", border: " solid 2px white", marginTop: "0.5rem" }} >
                Collect Rewards!
            </Button>
        </div>
    )
}

export default Unstake