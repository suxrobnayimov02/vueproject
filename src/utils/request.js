import axios from 'axios'
// import { MessageBox } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
// create an axios instance
const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters['auth/USER_TOKEN']) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.Authorization = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      if (response.status === 403) {
        this.$message.confirm('Сизда ушбу саҳифа(амал) учун ҳуқуқлар етарли эмас', 'Ҳуқуқлар етарли эмас', {
          confirmButtonText: 'Қайта кириш',
          cancelButtonText: 'Бекор қилиш',
          type: 'warning'
        }).then(() => {
          store.dispatch('auth/logout')
          window.location.href = '/'
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    if (error.response && error.response.status === 403) {
        this.$message.confirm('Сизда ушбу саҳифа(амал) учун ҳуқуқлар етарли эмас', 'Ҳуқуқлар етарли эмас', {
        confirmButtonText: 'Қайта кириш',
        cancelButtonText: 'Бекор қилиш',
        type: 'warning'
      }).then(() => {
        store.dispatch('auth/logout').then(() => {
          window.location.reload()
        })
      }).catch(() => {
        window.location.href = '/'
      })
    }
    return Promise.reject(error)
  }
)

export default service
