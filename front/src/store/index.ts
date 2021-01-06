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
      addElection(state, election: Election) {
        state.elections.push(election);
      },
      setElections(state, newElections: Election[]) {
        state.elections = newElections;
      },
      setService(state, service: SmartElectionService){
        state.service = service
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
      addElection(context: {commit: any, state: State }, data: {electionName: string, candidateNames: string[] }): Promise<Election> | undefined {
        return context.state.service?.addElection(data.electionName, data.candidateNames)
          .then((election: Election) => {
            context.commit('addElection', election)
            return election;
          });
      }
    }
  });
  