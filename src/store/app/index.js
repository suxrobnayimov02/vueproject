const state = {
    show_main_nav: false,
    show_filter: false,
    show_statistics: true,
    translates: {
      uz_ln: {},
      ru: {},
      uz_cl: {}
    },
    locales: [
      { key: 'uz_ln', name: 'O\'zbek' },
      { key: 'uz_cl', name: 'Ўзбек' },
      { key: 'ru', name: 'Рус' }
    ]
  }
  
  const mutations = {
    TOGGLE_SIDEBAR: state => {
      state.show_main_nav = true
    },
    CLOSE_SIDEBAR: (state) => {
      state.show_main_nav = false
    },
    TOGGLE_FILTER: state => {
      state.show_filter = true
    },
    CLOSE_FILTER: (state) => {
      state.show_filter = false
    },
    HIDE_STATISTICS: (state) => {
      state.show_statistics = false
    },
    SET_LOCALE: (state, locale) => (state.locale = locale),
    SET_TRANSLATES: (state, data) => {
      data.forEach(item => {
        try {
          const a = item.c[0].v
          console.log(a)
        } catch (e) {
          console.log(item)
        }
        state.translates.uz_ln[item.c[0].v] = item.c[2] ? item.c[2].v : item.c[0].v
        state.translates.ru[item.c[0].v] = item.c[3] ? item.c[3].v : item.c[0].v
        state.translates.uz_cl[item.c[0].v] = item.c[4] ? item.c[4].v : item.c[0].v
      })
    }
  }
  const getters = {
    LOCALE: (state) => state.locale,
    LOCALES: (state) => state.locales,
    SIDEBAR: (state) => state.show_main_nav,
    SHOW_STATISTICS: (state) => state.show_statistics,
    SHOW_FILTER: (state) => state.show_filter,
    TRANSLATES: (state) => state.translates
  }
  const actions = {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }) {
      commit('CLOSE_SIDEBAR')
    },
    toggleFilter({ commit }) {
      commit('TOGGLE_FILTER')
    },
    closeFilter({ commit }) {
      commit('CLOSE_FILTER')
    },
    hideStatistics({ commit }) {
      commit('HIDE_STATISTICS')
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    getTranslates({ commit }) {
      fetch('https://docs.google.com/spreadsheets/d/1c8ZxOeAJix17G7Ofsh2oXozKqlN6iBVFTsdJWEAg7HQ/gviz/tq?').then(res => res.text()).then((data) => {
        const json = data.substr(47).slice(0, -2)
        const result = JSON.parse(json)
        commit('SET_TRANSLATES', result.table.rows.slice(1))
      })
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  