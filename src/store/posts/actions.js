import { getItem } from '@/utils/storage'
import { getPosts, item } from '@/api/posts'
export const actions = {
  getComments({ commit }, query) {
    return new Promise((resolve, reject) => {
      if (getItem('getPosts') && (getItem('getPosts') !== null || getItem('getPosts') !== [])) {
        commit('SET_POSTS', getItem('getPosts'))
      } else {
        getPosts(query).then(res => {
          commit('SET_POSTS', res.data)
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
