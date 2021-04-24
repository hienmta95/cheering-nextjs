import initialState from './initialState'
import { reducer as setLoading } from './hooks/setLoading'
import { reducer as setAuthentication } from './hooks/setAuthentication'

const reducers = [setLoading, setAuthentication]

export default function reducer(state = initialState, action) {
  let newState
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state
      break
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState)
}
