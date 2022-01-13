import axios from './axios'
import debounce from 'lodash/debounce'

export default function(win: any) {
  win.$appConfig = {}
  win.$appConfig.axios = axios
  win.$appConfig.debounce = debounce

  return win
}
