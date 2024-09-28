"use client"

import React from "react"
import type { FormProps } from "antd"
import { Button, Form, Input } from "antd"
import axios from "axios"

type FieldType = {
  username?: string
  email?: string
  password?: string
  role: string
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

const Signin = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let payload = values
    console.log((payload.role = "user"))
    console.log(payload)
    console.log("Success:", values)
    // call api login

    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      payload
    )

    console.log("res", res)
  }
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
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
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          {/* <Link href="/signin">Signin</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Signin
