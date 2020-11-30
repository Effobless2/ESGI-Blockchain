import Election from '@/models/Election';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      elections: Array<Election>()
    },
    mutations: {
      addElection(state, election: Election) {
        state.elections.push(election);
      },
      setElections(state, newElections: Election[]) {
        state.elections = newElections;
      }
    },
    actions: {
      addElection(context, todoModel: Election) {
        context.commit('addElection', todoModel);
      },
      setElections(context, newElections: Election[]) {
          context.commit('setElections', newElections);
      }
    }
  });
  