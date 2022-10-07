
export const mutations = {
  SET_POSTS: (state, getPosts) => {
    state.getComments = getPosts
  },
  SET_POSTS_TOTAL: (state, pagination) => {
    state.comments_total.data = pagination.data
    state.comments_total.per_page = pagination.per_page
    state.comments_total.total = pagination.total
  },
  SET_ITEM: (state, item) => {
    state.item = item
  },
}  