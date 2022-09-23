import { getToken } from '@/utils/auth'

export const state = {
  user: {
    is_auth: false,
    id: '',
    pin: '',
    age: null,
    token: getToken(),
    login: '',
    data: {}
  }
}
