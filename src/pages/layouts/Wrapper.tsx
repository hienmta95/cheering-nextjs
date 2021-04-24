import React, { useCallback, useEffect } from 'react'
import { useSetAuthentication } from '../../redux/hooks'

const Wrapper = (props) => {
  const { isAuthenticated, setAuthentication } = useSetAuthentication()

  useEffect(() => {
    setAuthentication(props.user)
  }, [props.user])

  return <>{props.children}</>
}

export default Wrapper
