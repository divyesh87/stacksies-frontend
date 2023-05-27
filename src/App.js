import { useEffect, useState } from "react";
import MainContainer from "./components/Container"
import Navbar from "./components/Navbar";
import RequestWalletBanner from "./components/RequestWalletBanner";
import styles from "./styles/App.module.css"
import {checkIfConnected, isConnectedToSepolia, switchToSepolia} from "./helpers/WalletEssentials"

function App() {

  const hasMetamask = window.ethereum || null;
  const [activeAcc, setactiveAcc] = useState(null)


  useEffect(() => {

    if (!window.ethereum?.isMetaMask) {
      return
    } else {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    if (!isConnectedToSepolia()) {
      setTimeout(() => {
        switchToSepolia()
      }, 3000)
    }

    if (window.ethereum.selectedAddress) {
      console.log(window.ethereum.selectedAddress);
      connect()
    }

    connectOnLoad()

  }, [])

  async function connectOnLoad() {
    if (await checkIfConnected()) connect()
  }

  async function disconnect() {
    handleAccountsChanged([])
  }

  async function connect() {
    try {
      const accs = await window.ethereum.request({ method: "eth_requestAccounts" })
      await switchToSepolia()
      handleAccountsChanged(accs)
    } catch (e) {
      alert("Something went wrong while connecting metamask");
      console.log(e);
    }
  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      setactiveAcc(null)
    } else if (accounts[0] !== activeAcc) {
      setactiveAcc(accounts[0]);
    }
  }


  return (
    <div className={styles.appContainer}>
      <Navbar activeAcc={activeAcc} connect={connect} disconnect={disconnect}/>
      {hasMetamask ? <MainContainer activeAcc={activeAcc} /> : <RequestWalletBanner />}
    </div>
  );
}

export default App;
