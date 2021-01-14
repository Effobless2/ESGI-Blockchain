import SmartElectionContract from '@/abi';
import Election from '@/models/Election';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

export default class SmartElectionService {
    smartContract: Contract;
    web3: Web3;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.smartContract = new web3.eth.Contract(SmartElectionContract.abi, SmartElectionContract.address);
    }

    async getAllElections(): Promise<Election[]> {
        const result = await this.smartContract.methods.getAllElections().call();
        return result.map((x: any, index: number) => {
            return {
                id: index,
                name: x.name,
                candidates: x.candidats.map((y: any, cIndex: number) => {
                    return {
                        id: cIndex,
                        name: y.name,
                        votes: parseInt(y.votes)
                    };
                })
            };
        });
    }

    async addElection(electionName: string, candidateNames: string[]): Promise<Election> {
        const transactionDataForElection = await this.smartContract.methods
            .addElection(electionName, candidateNames)
            .send({from: this.web3.eth.defaultAccount});
        const electionId = parseInt(transactionDataForElection.events.ElectionAdded.returnValues["electionId"]);
        const result: Election = {
            id: electionId,
            name: electionName,
            candidates: candidateNames.map((x: string, index: number) => {
                return {
                    id: index,
                    name: x,
                    votes: 0
                }
            }
        )};
        return result;
    }
}
