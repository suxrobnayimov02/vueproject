
export const mutations = {
  SET_COMMENTS: (state, getComments) => {
    state.getComments = getComments
  },
  SET_COMMENTS_TOTAL: (state, pagination) => {
    state.comments_total.data = pagination.data
    state.comments_total.per_page = pagination.per_page
    state.comments_total.total = pagination.total
  },
  SET_ITEM: (state, item) => {
    state.item = item
  },
}  