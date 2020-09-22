import { ActionTree, MutationTree } from 'vuex';

interface IGlobalState {
  userName: string;
}

const state: IGlobalState = {
  userName: 'admin'
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
