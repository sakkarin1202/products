"use client"

import React from "react"
import type { FormProps } from "antd"
import { Button, Checkbox, Form, Input } from "antd"
import Link from "next/link"
import axios from "axios"
import { useRouter } from 'next/navigation';

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo)
}

const Signin = () => {
  const { push } = useRouter();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    // call api login
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/signin",
      values
    )
    console.log("res", res)

    if (res.status === 200) {
      console.log("login success")
      localStorage.setItem('token', res.data.accessToken)
      push('/')
    }
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
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          {/* <Link href="/signup">Signup</Link> */}
        </div>
      </div>
    </div>
  )
}

export default Signin
