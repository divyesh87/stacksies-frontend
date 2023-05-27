import { Button, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import web3 from '../helpers/Web3'
import config from "../helpers/config.json"

function Stake({ activeAcc }) {

    const tokenContract = useRef()
    const [Stake, setStake] = useState(0)
    const [balance, setbalance] = useState(0)
    const [value, setvalue] = useState("")

    useEffect(() => {
        main()
    }, [activeAcc])

    async function main() {
        try {
            if (!activeAcc) return
            tokenContract.current = new web3.eth.Contract(config.tokenAbi, config.tokenAddress);

            const stake = await tokenContract.current.methods.stakes(activeAcc).call();

            if (parseInt(stake.amount) > 0) {
                setStake(parseInt(stake.amount / 1e2))
            }

            const bal = await tokenContract.current.methods.balanceOf(activeAcc).call()
            setbalance(bal / 1e2)
        } catch (e) {
            console.log(e);
        }
    }

    async function stakeTokens() {
        if (isNaN(value)) return alert("Invalid amount")
        if (value > balance) return alert("Insufficient balance!")

        try {
            const res = await tokenContract.current.methods.stake(value * 1e2).send({
                from: activeAcc
            })

            if (res.status) {
                main()
                setvalue("")
            }
        } catch (e) {
            alert("Something went wrong!")
            console.log(e);
        }

    }
    return (
        <div style={{ padding: "1.75rem" }}>
            <Typography variant="h6" style={{ color: "white", marginBottom: "1rem" }} >
                Staked Amount : {Stake} Stacksies
            </Typography>
            <Form style={{ minWidth: "100%" }}>
                <Form.Group>
                    <Form.Label>
                        <Typography style={{ color: "white" }}>
                            Available tokens : {balance}
                        </Typography>
                    </Form.Label>
                    <Form.Control
                        value={value}
                        disabled={Stake > 0}
                        onChange={(e) => setvalue(e.target.value)}
                        placeholder={Stake > 0 ? "Already staked , unstake to stake again!" : 'Enter No. Of tokens to stake!'} className='mt-1'>
                    </Form.Control>
                </Form.Group>
                <Button onClick={stakeTokens} disabled={Stake > 0} variant="outlined" style={{ color: "white", borderColor: "white", borderWidth: "0.1rem", marginTop: "1rem" }}>
                    {Stake > 0 ? "Already staked" : "Stake!"}
                </Button>
            </Form>

        </div>
    )
}

export default Stake