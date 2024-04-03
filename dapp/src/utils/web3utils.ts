import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3, { EventLog, Contract } from 'web3';
import cryptozombiesABI from '../../abi/zombieownership.sol/ZombieOwnership.json';

export class Web3Utils {

    private web3js!: Web3;
    private ethereum!: MetaMaskInpageProvider;
    private readonly cryptoZombiesContractAddress: string = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
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
            this.account = this.web3js.utils.toChecksumAddress(accounts[0]);
        })
        this.cryptoZombiesContract = new this.web3js.eth.Contract(cryptozombiesABI.abi, this.cryptoZombiesContractAddress);

        this.cryptoZombiesContract.events.NewZombie()
            .on("data", (event: EventLog) => {
                let zombie = event.returnValues;
                console.log("A new zombie was born!", zombie.zombieId, zombie.name, zombie.dna);
            })
        //.on("error", console.error);

        return true;
    }

    createRandomZombie(name: string) {
        // Send the tx to our contract:
        this.cryptoZombiesContract.methods.createRandomZombie(name)
            .send({ from: this.account })/*.then(() => {
                console.log("then");
            })*/
            .on("receipt", function (receipt: any) {
                console.log("Successfully created " + name + "! (" + receipt + ")");
            })
            .on("error", function (error: any) {
                console.error(error);
            });
    }

    getZombiesForAccount(): Zombie[] {
        const zombies: Zombie[] = [];
        console.log("getZombiesByOwner " + this.account);
        this.cryptoZombiesContract.methods.getZombiesByOwner(this.account).call().then(
            (value: any) => {
                console.log(value);
                value.forEach((id: number) => {
                    this.cryptoZombiesContract.methods.zombies(id).call().then(
                        function (zombie: any) {
                            zombies.push(zombie as Zombie);
                        })
                });
            }
        ).catch(
            function (reason: any) {
                console.error(reason);
            }
        )
        return zombies;
    }

    zombieToOwner(id: string) {
        return this.cryptoZombiesContract.methods.zombieToOwner(id).call();
    }

}
export interface Zombie {
    name?: string;
    dna?: number;
    level?: number;
    winCount?: number;
    lossCount?: number;
    readyTime?: number;
}