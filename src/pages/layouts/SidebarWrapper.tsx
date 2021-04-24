import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { Layout, Menu, Spin } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSetLoading, useSetAuthentication } from '../../redux/hooks'
import { useRouter } from 'next/router'
import Wrapper from './Wrapper'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

type LayoutProps = {
  title?: string
}

const SidebarWrapper = (props) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = React.useState(false)
  const { isLoading, setLoading } = useSetLoading()
  const { isAuthenticated, currentUser, setAuthentication } = useSetAuthentication()

  function onLogoutClick() {
    setLoading(1)
    setTimeout(function () {
      setLoading()
      setAuthentication(false)
      router.push('/login')
      return
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/logo-cr.png" />
      </Head>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <div className="logo">
            <span>{collapsed ? 'CS' : 'Cheering system'}</span>
          </div>

          <Menu theme="dark" selectedKeys={['upload']} mode="inline">
            <Menu.Item key="upload" icon={<FileOutlined />}>
              <Link href="upload">
                <a>Upload file</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="category" icon={<DesktopOutlined />}>
              <Link href="category">
                <a>Category list</a>
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<PieChartOutlined />} />
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Menu className="float-right right-menu" mode="horizontal">
              <SubMenu icon={<UserOutlined />} title={currentUser?.user_email || 'email'}>
                <Menu.Item icon={<SettingOutlined />}>
                  <Link href="profile">
                    <a>Profile</a>
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<LogoutOutlined />} onClick={() => onLogoutClick()}>
                  Logout
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '0 16px' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center', background: '#f1f1f1' }}>Cheering system ©2020 Created by XconnectingVN</Footer>
        </Layout>
      </Layout>

      <Spin spinning={isLoading} size="large" />
    </>
  )
}

export default SidebarWrapper
