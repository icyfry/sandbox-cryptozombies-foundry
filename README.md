# Sandbox Cryptozombies and Foundry

<img src="https://img.shields.io/badge/solidity-0.8.13-005850?style=flat"> <img src="https://img.shields.io/badge/Vue.js-35495E?logo=vuedotjs&logoColor=4FC08D" /> <img src="https://img.shields.io/badge/-Ethereum-005850?style=flat&logo=Ethereum">
[![Build](https://github.com/icyfry/sandbox-cryptozombies-foundry/actions/workflows/build.yml/badge.svg)](https://github.com/icyfry/sandbox-cryptozombies-foundry/actions/workflows/build.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=icyfry_sandbox-cryptozombies-foundry&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=icyfry_sandbox-cryptozombies-foundry)

This repository contains source codes for experimentation of [Cryptozombies](https://cryptozombies.io/en/) with [Foundry](https://github.com/foundry-rs) and [Vue.js](https://vuejs.org/)

<img src="dapp/public/cryptozombies.png" />

`contracts` folder contain Cryptozombies smart contracts and `dapp` folder contain a Vue.js frontend

## Install and config

[Doc to install foundry](https://book.getfoundry.sh/getting-started/installation)

```bash
curl -L https://foundry.paradigm.xyz | bash
source ~/.bashrc
foundryup
```

Install OpenZeppelin
```
forge install OpenZeppelin/openzeppelin-contracts
forge remappings > remappings.txt
```

### VSCode Configuration

* https://book.getfoundry.sh/config/vscode
* https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity

## Frontend

The frontend in `dapp` has been created with [vitejs](https://vitejs.dev/guide/) and [vitest](https://vitest.dev/guide/) for unit testing 

## Test

Launch a local testnet node, see [Anvil doc](https://book.getfoundry.sh/reference/anvil/)
```
anvil
```
Build and deploy contracts on local testnet
```
task contracts-test contracts-deploy
```
Launch frontend
```
task frontend-build frontend-run
```

## Resources

* https://www.cyfrin.io/blog/top-web3-tools-for-developers
* https://github.com/foundry-rs/foundry
* https://docs.soliditylang.org/en/v0.8.23/