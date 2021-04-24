import axios from 'axios'

export default {
  async login(data: any) {
    const res = await axios.post('login', data)
    return res.data
  },

  async me() {
    const res = await axios.get('me')
    return res.data
  },
}
