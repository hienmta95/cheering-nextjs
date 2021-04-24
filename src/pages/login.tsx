import React from 'react'
import { useSetLoading, useSetAuthentication } from '../redux/hooks'
import { Form, Input, Button, Checkbox, Typography, notification } from 'antd'
import AuthService from '../services/AuthService'
import LoginWrapper from './layouts/LoginWrapper'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'

const { Title } = Typography
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 },
}
const tailLayout = {
  wrapperCol: { offset: 7, span: 14 },
}

export default function LoginPage() {
  const router = useRouter()
  const { setLoading } = useSetLoading()
  const { isAuthenticated, setAuthentication } = useSetAuthentication()

  if (isAuthenticated) {
    router.push('/category')
  }

  const onFinish = async (values: any) => {
    setLoading(1)
    const res = await AuthService.login(values)
    if (res.success) {
      notification['success']({
        message: res.message,
      })

      setAuthentication(res.data)
      setCookie(null, 'cheeringAuth', res.data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      console.log('push category')
      router.push('/category')
    } else {
      notification['error']({
        message: res.message,
      })
      setLoading()
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    notification['error']({
      message: 'Login failed',
    })
  }

  return (
    <LoginWrapper title="Login">
      <div className="login-layout">
        <div className="text-center">
          <Title level={2}>Cheering system</Title>
          <p>
            <i>Sign in to start your session</i>
          </p>
          <br></br>
        </div>
        <Form {...layout} name="basic" initialValues={{ remember: false }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Email"
            name="email"
            hasFeedback
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter an valid email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" hasFeedback rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="link" href="/register">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </LoginWrapper>
  )
}
