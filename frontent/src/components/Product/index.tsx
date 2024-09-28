"use client"

import { Table, Input, Button, Modal, FormProps, Form, Select } from "antd"
import axios from "axios"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

type FieldType = {
  name?: string
  type?: string
  brand?: string
  specs?: string
  price?: string
  imageUrl?: string
}

const Product = () => {
  const [data, setData] = useState<any[]>([])
  const { push } = useRouter()
  const [selectedProduct, setSelectedProduct] = useState()
  const [productId, setProductId] = useState()
  const fetchData = async () => {
    const res = axios.get("http://localhost:5000/api/v1/products")
    console.log("res", (await res).data)
    let product = (await res).data
    setData(product)
    await setSelectedProduct(product.name)
    console.log(product)
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token == null || token == undefined) {
      push("/signin")
      return
    }

    let jwt: any = localStorage.getItem("token")
    let jwtDecoded: any = jwtDecode(jwt)
    // localStorage.setItem("role", jwtDecoded.role)

    fetchData()
  }, [])

  const [searchText, setSearchText] = useState("")

  const handleAddProduct = () => {
    let jwt: any = localStorage.getItem("token")
    let jwtDecoded: any = jwtDecode(jwt)
    console.log("token", jwt)
    console.log(jwtDecoded.role)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModaEditlOpen, setIsModalEditOpen] = useState(false)
  const [isModaDeleteOpen, setIsModalDeleteOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const showModalEdit = () => {
    setIsModalEditOpen(true)
    console.log('data', data)
  }
  const showModalDelete = () => {
    setIsModalDeleteOpen(true)
    console.log('data', data)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    const resAddProduct = await axios.post(
      "http://localhost:5000/api/v1/products/",
      values
    )
    console.log("resAddProduct", resAddProduct)
    if (resAddProduct.status === 201) {
      setIsModalOpen(false)
    }
  }

  const onFinishUpdate: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    const resEditProduct = await axios.put(
      `http://localhost:5000/api/v1/products/${productId}`,
      values
    )
    console.log("resAddProduct", resEditProduct)
    if (resEditProduct.status === 200) {
      setIsModalEditOpen(false)
    }
  }

  const onFinishDelete: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    const resDeleteProduct = await axios.delete(
      `http://localhost:5000/api/v1/products/${productId}`
    )
    console.log("resAddProduct", resDeleteProduct)
    if (resDeleteProduct.status === 200) {
      setIsModalDeleteOpen(false)
    }
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo)
  }

  const handleSelectedProduct = (value: any) => {
    console.log('product id:', value)
    let id = value
    setProductId(id)
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <title>Global search</title>
      <div className="flex-col">
        {localStorage.getItem("role") === "admin" ? (
          <Button onClick={showModal}>add product</Button>
        ) : null}
        {localStorage.getItem("role") === "moderator" ? (
          <Button onClick={showModalEdit}>edit product</Button>
        ) : null}
        {localStorage.getItem("role") === "admin" ? (
          <Button onClick={showModalDelete}>delete product</Button>
        ) : null}
        <Input.Search
          placeholder="Search here..."
          className="my-8 "
          onSearch={(value) => {
            setSearchText(value)
          }}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <Table
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              filteredValue: [searchText],
              onFilter: (value, record: any) => {
                return (
                  String(record.name)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase()) ||
                  String(record.type)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase()) ||
                  String(record.price)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase()) ||
                  String(record.brand)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase()) ||
                  String(record.specs)
                    .toLocaleLowerCase()
                    .includes(searchText.toLocaleLowerCase())
                )
              },
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
            },
            {
              title: "Brand",
              dataIndex: "brand",
              key: "brand",
            },
            {
              title: "Specs",
              dataIndex: "specs",
              key: "specs",
            },
            {
              title: "Price",
              dataIndex: "price",
              key: "price",
            },
            {
              title: "ImageUrl",
              dataIndex: "imageUrl",
              key: "imageUrl",
              render: (text, record: any) => {
                return (
                  <div>
                    <img className="w-[10rem]" src={record.imageUrl} />
                  </div>
                )
              },
            },
          ]}
          dataSource={data}
        ></Table>
      </div>

      <Modal
        title="Add product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input your type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please input your brand!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Specs"
            name="specs"
            rules={[{ required: true, message: "Please input your specs!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="ImageUrl"
            name="imageUrl"
            rules={[{ required: true, message: "Please input your imageUrl!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Edit */}
      <Modal
        title="Edit product"
        open={isModaEditlOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Select
            defaultValue='select product'
            style={{ width: 120 }}
            onChange={handleSelectedProduct}
            onClick={() => {
              console.log('data', data)
            }}
            options={
              data.map((v: any) => {
                return {
                  label: v.name,
                  value: v.id,
                }
              })
            }
          />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishUpdate}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Specs"
              name="specs"
              rules={[{ required: true, message: "Please input your specs!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="ImageUrl"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input your imageUrl!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Delete modal */}
      <Modal
        title="Delete product"
        open={isModaDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          <Select
            defaultValue='select product'
            style={{ width: 120 }}
            onChange={handleSelectedProduct}
            onClick={() => {
              console.log('data', data)
            }}
            options={
              data.map((v: any) => {
                return {
                  label: v.name,
                  value: v.id,
                }
              })
            }
          />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinishDelete}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please input your type!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Brand"
              name="brand"
              rules={[{ required: true, message: "Please input your brand!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Specs"
              name="specs"
              rules={[{ required: true, message: "Please input your specs!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="ImageUrl"
              name="imageUrl"
              rules={[
                { required: true, message: "Please input your imageUrl!" },
              ]}
            >
              <Input />
            </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Product
