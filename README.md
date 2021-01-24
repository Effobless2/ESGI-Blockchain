# ESGI-Blockchain

## Prérequis
- npm
- truffle.js

## Lancer la blockchain avec truffle
- `truffle migrate -f 2 --network development  && cat ./build/contracts/SmartElection.json > ../front/src/abi/index.json`
- le fichier `front/src/abi/index.json` est nécessaire pour se connecter au smart contract.

## Lancer le serveur front de développement
- `npm run serve`

## Pour deployer sur Kovan
- `npm install --save truffle-hdwallet-provider`
- Modifier la variable <API-KEY> dans truffle-config.js avec la clé donnée en créant un compte puis un projet sur https://infura.io/