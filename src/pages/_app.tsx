import 'antd/dist/antd.css'
import '../styles/styles.scss'
import '../styles/globals.css'

import React from 'react'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import Router from 'next/router'
import { parseCookies, destroyCookie, setCookie } from 'nookies'
import Wrapper from './layouts/Wrapper'
import axios from 'axios'
import { setAuthHeader, getAuthToken } from '../services/helpers'
import AuthService from '../services/AuthService'

const API_URL = 'http://api.cheering.as/api/'
axios.defaults.baseURL = API_URL

const myApp = ({ Component, pageProps, user }) => {
  const store = useStore(pageProps)

  return (
    <Provider store={store}>
      <Wrapper user={user}>
        <Component {...pageProps} />
      </Wrapper>
    </Provider>
  )
}

myApp.getInitialProps = async ({ Component, ctx }) => {
  const token = getAuthToken() || getCookieFromServer('cheeringAuth', ctx.req) || null

  let pageProps = {
    user: null,
  }
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const publicRoute = ['/login', '/register']
  if (!token) {
    if (!publicRoute.includes(ctx.pathname)) {
      redirectUser(ctx, '/login')
    }
  } else {
    setAuthHeader(true, token)
    const res = await AuthService.me()

    if (!res.success) {
      console.error('Error getting current user')
      setCookie(ctx, 'cheeringAuth', '', {
        maxAge: 0,
        path: '/',
      })
      redirectUser(ctx, '/login')
    } else {
      console.log('context: ', ctx)
      pageProps.user = { ...res.data, access_token: token }
    }
  }

  return { ...pageProps }
}

export function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

const getCookieFromServer = (key: string, req: any) => {
  if (!req?.headers.cookie) {
      return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
      return undefined;
  }
  return rawCookie.split('=')[1];
};

export default myApp
