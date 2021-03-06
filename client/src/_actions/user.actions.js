import { userService } from '../_services'
import { history } from '../_helpers'

export const userActions = {
  login,
  logout,
}

function login(username, password) {
  return dispatch => {
    let apiEndpoint = 'auth'
    let payload = {
      username: username,
      password: password,
    }

    userService.post(apiEndpoint, payload).then(response => {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('auth', response.data.auth)
        dispatch(setUserDetails(response.data))
        history.push('/home')
      }
    })
  }
}

function logout() {
  return dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('auth')
    dispatch(logoutUser())
    history.push('/')
  }
}

export function setUserDetails(user) {
  return {
    type: 'LOGIN_SUCCESS',
    auth: user.auth,
    token: user.token,
  }
}

export function logoutUser() {
  return {
    type: 'LOGOUT_SUCCESS',
    auth: false,
    token: '',
  }
}
