import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_USER } from '../constants'
import { setAuthHeader } from '../../services/helpers'

export function setAuthentication(val) {
  val ? setAuthHeader(true, val.access_token) : setAuthHeader(false)
  
  return {
    type: SET_CURRENT_USER,
    payloadUser: val,
    payloadIsAuthentication: val ? true : false,
  }
}

export function useSetAuthentication() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.isAuthenticated)
  const currentUser = useSelector((state) => state.currentUser)
  const boundAction = useCallback((val) => dispatch(setAuthentication(val)), [dispatch])

  return { isAuthenticated, currentUser, setAuthentication: boundAction }
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payloadUser,
        isAuthenticated: action.payloadIsAuthentication,
      }

    default:
      return state
  }
}
