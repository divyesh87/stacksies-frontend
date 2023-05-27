import Web3 from "web3";

const SEPOLIA_CHAIN_ID = 11155111;
const web3 = new Web3()

async function checkIfConnected() {
    if (!window.ethereum) return false;
    else {
        const accs = await window.ethereum?.request({ method: "eth_accounts" })
        return accs.length != 0;
    }
}

async function isConnectedToSepolia() {
    const id = await window.ethereum?.request({ method: "net_version" })
    return id === SEPOLIA_CHAIN_ID

}


async function switchToSepolia() {
    if (!await isConnectedToSepolia()) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(SEPOLIA_CHAIN_ID) }]
            });
        } catch (err) {
            if (err.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainName: 'Sepolia Testnet',
                            chainId: web3.utils.toHex(SEPOLIA_CHAIN_ID),
                            nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545']
                        }
                    ]
                });
            }
            else console.log(err);
        }
    }
}

export { checkIfConnected, switchToSepolia, isConnectedToSepolia }