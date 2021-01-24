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
        return result.map((x: any, index: number) => {
            return {
                id: index,
                name: x.name,
                maxVotes: parseInt(x.maxVotes),
                numberOfVotes: x.alreadyVoted.length,
                isCreator: x.creator === this.web3.eth.defaultAccount,
                isOpenToVote: x.isOpenToVotes,
                userCanVote: x.creator !== this.web3.eth.defaultAccount &&
                             x.isOpenToVotes &&
                    x.alreadyVoted.every((address: string) => address !== this.web3.eth.defaultAccount),
                isOpenForApplication : x.isOpenForApplication &&
                    x.creator !== this.web3.eth.defaultAccount &&
                    x.candidates.every((c: any) => c.candidateAddress !== this.web3.eth.defaultAccount),
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
            userCanVote: false,
            name: electionName,
            maxVotes: votesNumber,
            isCreator: true,
            numberOfVotes: 0,
            isOpenToVote: candidates.length > 0,
            isOpenForApplication: candidates.length === 0,
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
        return true;
    }

    async openToVote(electionId: number): Promise<boolean> {
        const transaction = await this.smartContract.methods
            .lockElection(electionId)
            .send({from: this.web3.eth.defaultAccount});
        return true;
    }

    async apply(electionId: number, applicantName: string): Promise<{ candidate: Candidate, isCurrentUser: boolean}> {
        const transaction = await this.smartContract.methods
            .addCandidatToElection(electionId, applicantName)
            .send({from: this.web3.eth.defaultAccount});
        return { 
            candidate: {
                name: applicantName,
                address: this.web3.eth.defaultAccount!,
                id: transaction.events.CandidateAdded.returnValues["candidateId"],
                votes: 0
            },
            isCurrentUser: true
        };
    } 
}
