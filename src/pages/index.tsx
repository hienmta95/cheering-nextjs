import React, { useMemo } from 'react'
import Wrapper from './layouts/SidebarWrapper'
import { Button } from 'antd'
import { useSetLoading } from '../redux/hooks'

const Home: React.FunctionComponent = () => {
  const { isLoading, setLoading } = useSetLoading()
  useMemo(() => {
    // console.log('Index: ', isLoading)
  }, [])

  return (
    <Wrapper title="Homepage">
      <h1>Hello Next.js 👋</h1>
      <Button onClick={() => setLoading()}>Click to loading</Button>
    </Wrapper>
  )
}

export default Home
