import axios from 'axios'

export async function apiCall(context, { method, url, data, authRequired = true }) {
  try {
    const accessToken = context.rootGetters['user/accessToken']
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: authRequired ? `JWT ${accessToken}` : null
      }
    })
    return response
  } catch (error) {
    if (error.response && error.response.status === 403) {
      try {
        await context.dispatch('user/refreshToken', null, { root: true })
        const accessToken = context.rootGetters['user/accessToken']
        const response = await axios({
          method,
          url,
          data,
          headers: {
            Authorization: authRequired ? `JWT ${accessToken}` : null
          }
        })
        return response
      } catch (refreshError) {
        // TODO: handle 401 for refresh -> redirect to login + clear tokens from store and local storage
        if (refreshError.response && refreshError.response.status === 401) {
          console.log('un authorized. logout needed')
        }
        throw refreshError
      }
    }
    throw error
  }
}