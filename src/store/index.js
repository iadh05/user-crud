import Vue from 'vue'
import Vuex from 'vuex'
import fetchApi from "../utils/fetch"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null,
    isLoading: false,
    user: {
      firstName: "",
      lastName: "",
      email: "",
      address: ''
    }
  },
  getters: {
    isLoading: (state) => state.isLoading,
    getUsers: (state) => state.users,
    getUser: (state) => ({ field }) => {
      return state.user[field];
    },
  },
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
    setIsLoading(state, data) {
      state.isLoading = data
    },
    updateUserFields(state, { field, value }) {
      state.user[field] = value;
    },
    initFields(state) {
      for (const key in state.user) {
        state.user[key] = ""

      }
    },
    fetchUser(state, data) {
      state.user = data
    }

  },
  actions: {
    fetchUsers({ commit }) {
      fetchApi("GET", '/', null, commit).then(data => {

        commit("setUsers", data)
      })
    },
    createUser({ commit, state }) {
      console.log('state.user :>> ', state.user);
      fetchApi("POST", '/', state.user, commit).then(data => {
        commit("setUsers", data)
      })
    },
    getUserById({ commit }, userId) {
      fetchApi("GET", '/' + userId, null, commit).then(data => {
        console.log('data :>> ', data);
        commit('fetchUser', data)
      })
    },
    updateUser({ commit, dispatch, state }, userId) {
      fetchApi("PUT", '/' + userId, state.user, commit).then(res => {
        console.log('res :>> ', res);
        dispatch('fetchUsers')
      })
    },
    deleteUser({ commit, dispatch }, userId) {
      fetchApi("DELETE", '/' + userId, null, commit).then(res => {
        console.log('res :>> ', res);
        dispatch('fetchUsers')
      })
    },
    updateUserFields({ commit }, { field, value }) {
      commit('updateUserFields', { field, value })
    },
    initFields({ commit }) {
      commit('initFields')
    }
  },
  modules: {
  }
})
