import { Button, Typography } from '@mui/material'
import styles from "../styles/Navbar.module.css"
import React from 'react'
import logo from "../images/favicon.png"

function Navbar({ activeAcc, connect, disconnect }) {
  return (
    <>
      <div className={styles.navbar} >
        <Typography variant='h4' style={{ color: "white", margin: "1.2rem" }} >
          The Stacksies <img style={{ height: "3rem" }} src={logo} />
        </Typography>
        <Button onClick={activeAcc ? disconnect : connect} variant='outlined' style={{ color: "white", border: " solid 2px white", margin: "1.2rem" }} >
          {activeAcc ? activeAcc.slice(0, 3) + "..." + activeAcc.slice(activeAcc.length - 2, activeAcc.length) : "Connect"}
        </Button>
      </div>
    </>
  )
}

export default Navbar