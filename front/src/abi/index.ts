import { AbiItem } from 'web3-utils';
import ContractJSON from './index.json';
const abi = ContractJSON.abi as AbiItem[];
const address = ContractJSON.networks["5777"].address;

export default { abi, address };