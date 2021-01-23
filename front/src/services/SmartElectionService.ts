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
                maxVotes: x.maxVotes,
                isCreator: x.creator === this.web3.eth.defaultAccount, //TODO
                canBeVoted: x.creator !== this.web3.eth.defaultAccount && x.maxVotes > x.alreadyVoted.length, //TODO
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

    async addElection(electionName: string, candidateNames: string[], votesNumber: number): Promise<Election> {
        const transactionDataForElection = await this.smartContract.methods
            .addElection(electionName, candidateNames, votesNumber)
            .send({from: this.web3.eth.defaultAccount});
        const electionId = parseInt(transactionDataForElection.events.ElectionAdded.returnValues["electionId"]);
        const result: Election = {
            id: electionId,
            name: electionName,
            maxVotes: votesNumber,
            isCreator: true,
            canBeVoted: false,
            candidates: candidateNames.map((x: string, index: number) => {
                    return {
                        id: index,
                        name: x,
                        votes: 0
                    }
                }
            )
        };
        return result;
    }

    async vote(id: number, votes: number[]): Promise<boolean> {
        const transaction = await this.smartContract.methods
            .vote(id, votes)
            .send({from: this.web3.eth.defaultAccount});
        console.log(transaction);
        return false;
    }
}
