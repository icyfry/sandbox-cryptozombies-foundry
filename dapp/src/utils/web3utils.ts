import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from 'web3'
import { Contract } from 'web3'
import cryptozombiesABI from '../abi/zombieownership.sol/ZombieOwnership.json';

class Web3Utils {

    private web3js!: Web3;
    private ethereum!: MetaMaskInpageProvider;
    private readonly cryptoZombiesContractAddress: string = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    public account!: string;
    public cryptoZombiesContract!: Contract<any>;

    constructor(ethereum: MetaMaskInpageProvider | undefined) {
        if (ethereum) {
            this.ethereum = ethereum
        }
        else {
            console.log("no window.ethereum, install Metamask");
        }
    }

    ethInit(): boolean {

        if (this.ethereum == undefined) return false;

        console.log("Init Web 3");
        this.ethereum.request({ method: 'eth_requestAccounts' });
        this.web3js = new Web3(this.ethereum);
        this.web3js.eth.getAccounts().then((accounts: string[]) => {
            this.account = accounts[0];
            // console.log("account : " + account);
        })
        this.cryptoZombiesContract = new this.web3js.eth.Contract(cryptozombiesABI.abi, this.cryptoZombiesContractAddress);

        return true;
    }

}

export default Web3Utils;