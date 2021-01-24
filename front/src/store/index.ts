import Candidate from '@/models/Candidate';
import Election from '@/models/Election';
import SmartElectionService from '@/services/SmartElectionService';
import Vue from 'vue';
import Vuex from 'vuex';
import Web3 from 'web3';

Vue.use(Vuex)

interface State {
    elections: Array<Election>;
    service: SmartElectionService | null;
}

export default new Vuex.Store<State>({
    state: {
        elections: [],
        service: null
    },
    mutations: {
        addElection(state: State, election: Election) {
            state.elections.push(election);
        },
        setElections(state: State, newElections: Election[]) {
            state.elections = newElections;
        },
        setService(state: State, service: SmartElectionService) {
            state.service = service
        },
        lockElection(state: State, electionId: number) {
            state.elections.find(x => x.id === electionId)!.isOpenToVote = true;
        },
        addCandidate(state: State, data: {electionId: number, candidate: Candidate, isCurrentUser: boolean}) {
            const election = state.elections.find(x => x.id === data.electionId);
            if (election) {
                election.candidates.push(data.candidate);
                election.isOpenForApplication = !data.isCurrentUser;
            }
        },
        addVotes(state: State, data: {id: number, votes: number[]}) {
            const election = state.elections.find(x => x.id === data.id);
            if (election) {
                for (let vote = 0; vote < data.votes.length; vote++) {
                    const candidate = election.candidates.find(x => x.id === data.votes[vote]);
                    if (candidate) {
                        candidate.votes += election.candidates.length - vote;
                    }
                }
                election.numberOfVotes++;
                election.userCanVote = false;
            }
        }
    },
    actions: {
        setElections(context, newElections: Election[]) {
            context.commit('setElections', newElections);
        },
        initStore(context, web3: Web3) {
            const service = new SmartElectionService(web3);
            context.commit('setService', service);
            service.getAllElections()
                .then((elections: Election[]) => context.commit('setElections', elections));
        },
        addElection(context: { commit: any, state: State }, data: { electionName: string, candidateNames: {name: string; candidateAddress: string}[], votesNumber: number }): Promise<Election> | undefined {
            return context.state.service?.addElection(data.electionName, data.candidateNames, data.votesNumber)
                .then((election: Election) => {
                    context.commit('addElection', election);
                    return election;
                });
        },
        vote(context: { commit: any, state: State }, data: { id: number, votes: number[] }): Promise<boolean> {

            return context.state.service!.vote(data.id, data.votes).then((_: boolean) => {
                context.commit('addVotes', data);
                return true;
            });
        },
        openToVote(context: { commit: any, state: State }, electionId: number): Promise<boolean> {
            return context.state.service!.openToVote(electionId)
                .then((result: boolean) => {
                    if (result) {
                        context.commit('lockElection', electionId);
                    }
                    return result;
                });
        },
        apply(context: { commit: any, state: State }, data: { id: number, name: string }): Promise<boolean> {
            return context.state.service!.apply(data.id, data.name)
                .then((result: {candidate: Candidate, isCurrentUser: boolean}) => {
                    context.commit('addCandidate', {electionId: data.id, candidate: result.candidate, isCurrentUser: result.isCurrentUser});
                    return true;
                });
        }
    }
});
