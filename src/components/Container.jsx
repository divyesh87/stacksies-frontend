import { Box } from '@mui/system'
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Container.module.css"
import ClaimTab from './ClaimTab';
import Stake from './Stake';
import Unstake from './Unstake';

function Container({ activeAcc }) {
  const [value, setValue] = useState("claim")

  function handleChange(event, val) {
    setValue(val);

  }
  return (
    <div style={{ width: "75vw", alignSelf: "center", borderRadius: "0.5rem", background: "black" }}>
      <Box>
        <Box>
          <Tabs unmountOnExit={true} activeKey={value} onSelect={(k) => handleChange(k)}>
            <Tab
              eventKey="claim"
              tabClassName={styles.tab}
              title="Claim"
            >
              <ClaimTab activeAcc={activeAcc} />
            </Tab>
            <Tab eventKey="stake" title="Stake" tabClassName={styles.tab}>
              <Stake activeAcc={activeAcc} />
            </Tab>
            <Tab eventKey="unstake" title="Unstake/Rewards" tabClassName={styles.tab}>
              <Unstake activeAcc={activeAcc} />
            </Tab>
          </Tabs>
        </Box>
      </Box>
    </div >
  )
}

export default Container