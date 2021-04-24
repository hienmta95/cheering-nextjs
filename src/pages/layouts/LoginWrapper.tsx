import * as React from 'react'
import Head from 'next/head'

import { Layout, Menu, Spin } from 'antd'
import { useSetLoading } from '../../redux/hooks'
import Wrapper from './Wrapper'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

type LayoutProps = {
  title?: string
}

const LoginWrapper: React.FunctionComponent<LayoutProps> = ({ children, title }) => {
  const { isLoading } = useSetLoading()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/logo-cr.png" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center', background: '#f1f1f1' }}>Cheering system ©2020 Created by XconnectingVN</Footer>
        </Layout>
      </Layout>
      
      <Spin spinning={isLoading} size="large" />
    </>
  )
}

export default LoginWrapper
