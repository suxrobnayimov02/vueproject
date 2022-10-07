import { getItem } from '@/utils/storage'
import { getComments, item } from '@/api/comments'
export const actions = {
  getComments({ commit }, query) {
    return new Promise((resolve, reject) => {
      if (getItem('getComments') && (getItem('getComments') !== null || getItem('getComments') !== [])) {
        commit('SET_COMMENTS', getItem('getComments'))
      } else {
        getComments(query).then(res => {
          commit('SET_COMMENTS', res.data)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  
  item({ commit }, query) {
    return new Promise((resolve, reject) => {
      item(query).then(res => {
        commit('SET_ITEM', res.data)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
}
