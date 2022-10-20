/* eslint-disable no-unused-vars */
import { show, update, index, store, destroy } from '@/api/comment'
export const actions = {
  index({ commit }, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        commit('SET_LIST', res.data.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  show({ commit }, id) {
    return new Promise((resolve, reject) => {
      show(id).then(res => {
        commit('SET_ITEM', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  store({ commit }, data) {
    return new Promise((resolve, reject) => {
      store(data)
        .then(res => {
          resolve(res)
        })
        .catch((res) => {
          reject(res)
        })
    })
  },
  update({ commit }, data) {
    return new Promise((resolve, reject) => {
      update(data)
        .then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
    })
  },
  destroy({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroy(id)
        .then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
    })
  }
}
