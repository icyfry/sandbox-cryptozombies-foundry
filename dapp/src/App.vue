<script setup lang="ts">
import CryptoZombiesView from './components/CryptoZombiesView.vue'
import { MetaMaskInpageProvider } from "@metamask/providers";
import { onBeforeMount, ref } from 'vue'
import Web3Utils from './utils/web3utils.ts';

// Metamask injected
declare global {
  var ethereum: MetaMaskInpageProvider;
}

onBeforeMount(() => {
  initializeApp();
});

const web3Interact: any = ref<Web3Utils>(new Web3Utils(window.ethereum));

function initializeApp() {
  console.log('App is initializing...');
  web3Interact.value.ethInit();
}

window.ethereum.on('accountsChanged', () => initializeApp());
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
  <CryptoZombiesView v-if="web3Interact.account !== undefined" :owner="web3Interact.account"
    :cryptoZombiesContract="web3Interact.cryptoZombiesContract" />
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
