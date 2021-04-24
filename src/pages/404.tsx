import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSetLoading, useSetAuthentication } from '../redux/hooks'
import { Form, Input, Button, Checkbox, Typography, notification } from 'antd'
import EmptyWrapper from './layouts/LoginWrapper'
import Link from 'next/link'

const { Title } = Typography

export default function NotFound() {
  return (
    <EmptyWrapper title="Login">
      <div className="login-layout">
        <div className="text-center">
          <Title level={1}>404 Not found.</Title>
          <p>
            <i>CLick <Link href="/"><a style={{ color: '#40a9ff' }}>here</a></Link> to go back homepage.</i>
          </p>
        </div>
      </div>
    </EmptyWrapper>
  )
}
