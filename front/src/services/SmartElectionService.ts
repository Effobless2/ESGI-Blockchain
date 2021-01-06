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
        const result = await this.smartContract.methods.getAllElectionsCount().call();
        const elections: Election[] = [];
        for(let i = 0; i < result; i++) {
            const election = await this.getElectionById(i);
            elections.push(election);
        }
        return elections;
    }

    async getElectionById(electionId: number): Promise<Election> {
        const e = await this.smartContract.methods.getElection(electionId).call();
        const election: Election = { id: electionId, name: e[0], candidates: [] };
        for (let j = 0; j < e[1]; j++) {
            const c = await this.smartContract.methods.getCandidateForElection(electionId, j).call();
            election.candidates.push({ id: j, name: c['name'], votes: parseInt(c["votes"]) });
        }
        return election;
    }

    async addElection(electionName: string, candidateNames: string[]): Promise<Election> {
        const transactionDataForElection = await this.smartContract.methods
            .addElection(electionName)
            .send({ from: this.web3.eth.defaultAccount });
        const electionId = parseInt(transactionDataForElection.events.ElectionAdded.returnValues["electionId"]);
        const result: Election = { id: electionId, name: electionName, candidates: [] }
        for(let i = 0; i < candidateNames.length; i++) {
            const candidate = await this.addCandidateToElection(electionId, candidateNames[i]);
            result.candidates.push(candidate);
        }
        return result;
    }

    async addCandidateToElection(electionId: number, candidateName: string) : Promise<Candidate> {
        const transactionDataForCandidate = await this.smartContract.methods
            .addCandidatToElection(electionId, candidateName)
            .send({ from: this.web3.eth.defaultAccount });
        const candidateId = parseInt(transactionDataForCandidate.events.CandidateAdded.returnValues.candidateId);
        const result: Candidate = { id: candidateId, name: candidateName, votes: 0 };
        return result;
    }
}