# ESGI-Blockchain

## Prérequis
- npm
- truffle.js

## Lancer la blockchain avec truffle
- `truffle migrate -f 2 && cat ./build/contracts/SmartElection.json > ../front/src/abi/index.json`
- le fichier `front/src/abi/index.json` est nécessaire pour se connecter au smart contract.

## Lancer le serveur front de développement
- `npm run serve`