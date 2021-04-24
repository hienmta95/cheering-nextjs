import axios from 'axios'
import { setAuthHeader } from './helpers'
setAuthHeader(true)

export default {
  async getAll(search: any) {
    const res = await axios.get('admin/categories')
    return res.data
  }
}
