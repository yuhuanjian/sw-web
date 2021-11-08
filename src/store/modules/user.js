import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import userInfos from '@/api/login'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: localStorage.getItem('SET_NAME')
      ? localStorage.getItem('SET_NAME')
      : '',
    userId: localStorage.getItem('SET_USERID')
      ? localStorage.getItem('SET_USERID')
      : '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name, token, userId } = userInfo
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', token)
      localStorage.setItem('SET_NAME', name)
      localStorage.setItem('SET_USERID', userId)
      commit('SET_NAME', name)
      commit('SET_USERID', userId)
      setToken(token)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //     getInfo(state.token)
    //         .then(response => {
    //             const { data } = response
    //             if (!data) {
    //                 reject('Verification failed, please Login again.')
    //             }
    //             const { name, avatar } = data
    //             commit('SET_NAME', name)
    //             commit('SET_AVATAR', avatar)
    //             resolve(data)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // removeToken() // must remove  token  first
      // resetRouter()
      // commit('RESET_STATE')
      // resolve()
      userInfos
        .logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
