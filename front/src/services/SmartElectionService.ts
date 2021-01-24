import SmartElectionContract from '@/abi';
import Candidate from '@/models/Candidate';
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
        console.log(result);
        return result.map((x: any, index: number) => {
            return {
                id: index,
                name: x.name,
                maxVotes: x.maxVotes,
                isCreator: x.creator === this.web3.eth.defaultAccount,
                isOpenToVote: x.maxVotes > x.alreadyVoted.length && 
                              x.alreadyVoted.every((address: string) => address !== this.web3.eth.defaultAccount) &&
                              !x.isOpen,
                resultsAvailable: x.maxVotes === x.alreadyVoted.length,
                candidates: x.candidates.map((y: any, cIndex: number) => {
                    return {
                        id: cIndex,
                        name: y.name,
                        address: y.candidateAddress,
                        votes: parseInt(y.votes)
                    };
                }),
                canApply: x.creator != this.web3.eth.defaultAccount &&
                          x.isOpen &&
                          x.candidates.every((y: any) => y.address != this.web3.eth.defaultAccount)
            };
        });
    }

    async addElection(electionName: string, candidates: {name: string, candidateAddress: string}[], votesNumber: number): Promise<Election> {
        console.log(candidates);
        const transactionDataForElection = candidates.length > 0 ?
            await this.smartContract.methods
                .addElectionFill(electionName, candidates, votesNumber)
                .send({from: this.web3.eth.defaultAccount}) :
            await this.smartContract.methods
                .addOpenElection(electionName, votesNumber)
                .send({from: this.web3.eth.defaultAccount});
        const electionId = parseInt(transactionDataForElection.events.ElectionAdded.returnValues["electionId"]);
        const result: Election = {
            id: electionId,
            name: electionName,
            maxVotes: votesNumber,
            isCreator: true,
            isOpenToVote: false,
            resultsAvailable: false,
            canApply: false,
            candidates: candidates.map((x: {name: string, candidateAddress: string}, index: number) => {
                    return {
                        id: index,
                        name: x.name,
                        address: x.candidateAddress,
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

    async openToVote(electionId: number): Promise<boolean> {
        const transaction = await this.smartContract.methods
            .lockElection(electionId)
            .send({from: this.web3.eth.defaultAccount});
        console.log(transaction);
        return true;
    }

    async apply(electionId: number, applicantName: string): Promise<Candidate> {
        const transaction = await this.smartContract.methods
            .addCandidatToElection(electionId, applicantName)
            .send({from: this.web3.eth.defaultAccount});
        console.log(transaction);
        return {
            name: applicantName,
            address: this.web3.eth.defaultAccount!,
            id: transaction.events.CandidateAdded.returnValues["candidateId"],
            votes: 0
        };
    } 
}
