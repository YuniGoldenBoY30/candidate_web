import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://94a078a7ce5f.ngrok.io/v1/api' })
import {backURL} from "src/utils/utils";
const api = axios.create({ baseURL: backURL() })


const axiosConfig = axios.create({
  baseURL: backURL(),
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    "Accept":"application/json",
    "access-key": 'Bearer iowl3HM3OPNYPdk6H497w1OEGbWxVauua6akOJib'
  }
});
const endpoints = {
  candidate: '/candidates/',
  techs: '/techs/'
}



export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api, endpoints,axiosConfig }
