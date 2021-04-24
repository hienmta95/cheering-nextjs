import React, { useState, useEffect } from 'react'
import { Breadcrumb, Table, Row, Col, Typography, notification } from 'antd'
import CategoryService from '../../services/CategoryService'

import { PlusSquareOutlined } from '@ant-design/icons'
import Link from 'next/link'
import SidebarWrapper from '../layouts/SidebarWrapper'
import { useSetLoading } from '../../redux/hooks'
const { Title } = Typography

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    sorter: { compare: (a, b) => a.id - b.id },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: { compare: (a, b) => a.title - b.title },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: { compare: (a, b) => a.description - b.description },
  },
  {
    title: 'Created at',
    dataIndex: 'created_at',
    sorter: { compare: (a, b) => new Date(a.created_at) - new Date(b.created_at) },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    sorter: null,
  },
]

const CategoryPage = () => {
  const { isLoading, setLoading } = useSetLoading()
  const [tableLoading, setTableLoading] = useState(false)
  const [tableData, setTableData] = useState()
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  })

  useEffect(() => {
    setLoading()
    initTable()
  }, [])

  function handleTableChange(pagination, filters = {}, sorter = {}, extra) {
    setPagination(pagination)
    console.log('params', pagination, filters, sorter, extra)
  }

  const initTable = async () => {
    setTableLoading(true)
    const res = await CategoryService.getAll({})
    if (!res.success) {
      notification['error']({
        message: res.message,
      })
    }

    console.log('Fetching category.. ', res)
    setTableData(res.data)
    setTableLoading(false)
  }

  return (
    <>
      <SidebarWrapper title="Category">
        <h1>This is category list page </h1>

        <Row>
          <Col span={12}>
            <Title className="pageTitle" level={4}>
              Category list
            </Title>
          </Col>
          <Col span={12}>
            <Breadcrumb className="breadcrumb float-right">
              <Breadcrumb.Item>Category</Breadcrumb.Item>
              <Breadcrumb.Item>list</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <div className="cheering-layout site-layout-background">
          <div className="category-page">
            <Link href="/category/create">
              <a className="ant-btn ant-btn-primary">
                <PlusSquareOutlined /> Create new
              </a>
            </Link>
            <br></br>
            <br></br>
            <br></br>
            <Table
              columns={columns}
              dataSource={tableData}
              onChange={handleTableChange}
              rowKey={(record) => record.id}
              pagination={pagination}
              loading={tableLoading}
            />
          </div>
        </div>
      </SidebarWrapper>
    </>
  )
}

export default CategoryPage
