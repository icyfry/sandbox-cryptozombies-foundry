<script setup lang="ts">
import { onMounted } from 'vue'
import { Zombie, Web3Utils } from '../utils/web3utils.ts';

const props = defineProps<{ web3Interact: Web3Utils }>();

var zombies: Zombie[]
var error: string

onMounted(() => {
  zombies = props.web3Interact.getZombiesForAccount()
})
</script>

<template>
  <div class="zombieview">
    <h2>Account : {{ props.web3Interact.account }}</h2>
    <ul>
      <li v-for="item in zombies">
        🧟 {{ item.name }} {{ item.dna }}
      </li>
    </ul>
  </div>
  <div class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.zombieview {
  background-color: #616161;
}

.zombieview li {
  list-style-type: none;
}

.error {
  background-color: #a70000;
}
</style>
