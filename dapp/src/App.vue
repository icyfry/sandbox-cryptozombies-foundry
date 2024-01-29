<script setup lang="ts">
import CryptoZombiesView from './components/CryptoZombiesView.vue'
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from 'web3'
import { Contract } from 'web3'
import { onBeforeMount, ref } from 'vue'

import cryptozombiesABI from './abi/zombieownership.sol/ZombieOwnership.json';

// Metamask injected
declare global {
  var ethereum: MetaMaskInpageProvider;
}

var cryptoZombiesContract: Contract<any>
const account = ref<string>();
var web3js: Web3

function initializeApp() {
  console.log('App is initializing...');
  ethEnabled()
}

window.ethereum.on('accountsChanged', () => initializeApp());

onBeforeMount(() => {
  initializeApp();
});

function ethEnabled() {
  if (window.ethereum) {
    console.log("Init Web 3");
    window.ethereum.request({ method: 'eth_requestAccounts' });
    web3js = new Web3(ethereum);
    web3js.eth.getAccounts().then((accounts: string[]) => {
      account.value = accounts[0];
      // console.log("account : " + account);
    })
    cryptoZombiesContract = new web3js.eth.Contract(cryptozombiesABI.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  } else {
    console.log("no window.ethereum, install Metamask");
  }

}

</script>

<template>
  <div>
    <img src="/cryptozombies.png" class="logo" alt="Vite logo" />
    <h1>
      Test Frontend
      <a href="https://github.com/icyfry/sandbox-cryptozombies-foundry" target="_blank">sandbox-cryptozombies-foundry
      </a>
    </h1>
  </div>
  <CryptoZombiesView v-if="account !== undefined" :owner="account" :cryptoZombiesContract="cryptoZombiesContract" />
</template>

<style scoped>
.logo {
  height: 4em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
