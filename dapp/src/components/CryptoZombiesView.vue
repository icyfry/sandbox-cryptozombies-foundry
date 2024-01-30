<script setup lang="ts">
import { onMounted } from 'vue'
import { Contract } from 'web3'

const props = defineProps<{ owner: string, cryptoZombiesContract: Contract<any> }>();

var zombies: string
var error: string

onMounted(() => {
  getZombiesByOwner(props.owner)
})

function getZombiesByOwner(owner: string) {
  props.cryptoZombiesContract.methods.getZombiesByOwner(owner).call().then(
    function (value: any) {
      zombies = value;
    }
  ).catch(
    function (reason: any) {
      error = reason;
    }
  )
}
</script>

<template>
  <div class="zombieview">
    <h2>Account : {{ owner }}</h2>
    {{ zombies }}
  </div>
  <div class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.zombieview {
  background-color: #616161;
}

.error {
  background-color: #a70000;
}
</style>
