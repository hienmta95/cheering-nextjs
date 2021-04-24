import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOADING } from '../constants'

export function setLoading(bool) {
  return {
    type: SET_LOADING,
    payload: bool
  }
}

export function useSetLoading() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isLoading)
  const boundAction = useCallback((bool: any = null) => dispatch(setLoading(bool)), [dispatch])

  return { isLoading, setLoading: boundAction }
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload ? true : false,
      }

    default:
      return state
  }
}
