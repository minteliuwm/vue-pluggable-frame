import { ActionTree, MutationTree } from 'vuex';

interface IGlobalState {
  sql: string;
}

const state: IGlobalState = {
  sql: 'select * from table1;'
};

const mutations: MutationTree<IGlobalState> = {
};

const actions: ActionTree<IGlobalState, any> = {
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
