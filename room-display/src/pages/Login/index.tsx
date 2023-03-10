import React, { FC, useEffect, useState } from 'react'
import { Form, Input, Button, Space, Toast, Selector } from 'antd-mobile'
import {useNavigate } from 'react-router-dom'
import style from './style.module.css'
import { reqUserReg, reqUserLogin } from '../../api'

interface Props {
  isLogin: boolean
}

const prompt = (msg: string) => {
  Toast.show({
    content: msg,
    duration: 1000,
  })
}

const LoginForm = () => {
  const [formLog] = Form.useForm()
  const navigate = useNavigate()
  const submitLog = async () => {
    try {
      const query = await formLog
        .validateFields()
        .then((value) => {
          return value
        })
        .catch((err) => {
          return err
        })
      reqUserLogin(query)//query:LoginObj
        .then((res) => {
          let resdata = res.data;
          if (resdata.success){
          localStorage.setItem('token', resdata.data.token);
          navigate(`/MyRoom/RoomActivityPage`)
          } 
        })
        .catch((err) => {
          prompt(err.msg)
        })
    } catch {
      prompt('Error input, please check the information!')
    }
  }

  return (
    <>
      <Form
        layout="horizontal"
        mode="card"
        form={formLog}
        onFinish={submitLog}
        onFinishFailed={() => prompt('Error input, please check the information!')}
      >
        <Space
          direction="vertical"
          justify="center"
          className={style.loginSpace}
          style={{
            '--gap-vertical': '0.5rem',
          }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }, { type: 'string', min: 4, max: 12 }]}
          >
            <Input
              placeholder="Please enter the username"
              clearable
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }, { type: 'string', min: 6, max: 18 }]}
            validateTrigger="onBlur"
          >
            <Input placeholder="Please enter the password" clearable type="password" />
          </Form.Item>
          <Button block type="submit" color="primary" size="large">
            Click to Login
          </Button>
        </Space>
      </Form>
    </>
  )
}

const RegisterForm = () => {
  const [formReg] = Form.useForm()
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const [role, setRole] = useState('1')
  const options = [
    {
      label: '????????????',
      value: '1',
    },
    {
      label: '?????????',
      value: '2',
    },
  ]
  const submitReg = async () => {
    try {
      const query = await formReg
        .validateFields()
        .then((value) => {
          return value
        })
        .catch((err) => {
          throw new Error(err)
        })
      query.role = role
      reqUserReg(query).then((res: any) => {
        console.log(res)
        if (res.code === 200) {
          prompt('????????????')
        } else {
          prompt(res.msg)
        }
      })
    } catch (err) {
      prompt(err as string)
    }
  }
  const checkConfirm = (_: any, value: string) => {
    if (!value || value === Password) {
      return Promise.resolve()
    }
    if (value.length > 0) {
      return Promise.reject('???????????????????????????')
    }
    return Promise.reject()
  }

  return (
    <>
      <Form
        layout="horizontal"
        mode="card"
        form={formReg}
        onFinish={submitReg}
        onFinishFailed={() => prompt('????????????????????????????????????')}
      >
        <Space
          direction="vertical"
          justify="center"
          className={style.loginSpace}
          style={{
            '--gap-vertical': '0.5rem',
          }}
        >
          <Form.Item
            label="?????????"
            name="username"
            rules={[{ required: true }, { type: 'string', min: 4, max: 12 }]}
          >
            <Input
              placeholder="??????????????????"
              clearable
              value={Username}
              onChange={setUsername}
              style={{
                '--font-size': '0.5rem',
              }}
            />
          </Form.Item>
          <Form.Item>
            <span>???????????????</span>
            <Selector
              options={options}
              value={[role]}
              onChange={(v) => {
                if (v.length) {
                  setRole(v[0])
                }
              }}
              style={{
                '--border-radius': '1rem',
                '--border': 'solid transparent 1px',
                '--checked-border': 'solid var(--adm-color-primary) 1px',
                '--padding': '0.2rem 0.5rem',
              }}
            />
          </Form.Item>
          <Form.Item
            label="??????"
            name="password"
            rules={[{ required: true }, { type: 'string', min: 6, max: 18 }]}
            validateTrigger="onBlur"
          >
            <Input placeholder="???????????????" clearable onChange={setPassword} type="password" />
          </Form.Item>
          <Form.Item
            label="????????????"
            name="password_"
            rules={[{ required: true }, { validator: checkConfirm }]}
          >
            <Input placeholder="?????????????????????" clearable type="password" />
          </Form.Item>
          <Button block type="submit" color="primary" size="large">
            ????????????
          </Button>
        </Space>
      </Form>
    </>
  )
}

const ChangeLabel: FC<Props> = ({ isLogin }) => {
  if (isLogin) {
    return <LoginForm />
  } else {
    return <RegisterForm />
  }
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const token:string|null = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(()=>{
    if (token === "faketoken"){
      console.log("no token!")
    }
    else{
      console.log(token)
      navigate('/MyRoom/RoomActivityPage');
    }
  },[])
  const getClass = (isLogin: boolean) => {
    if (isLogin) {
      return style.loginTitleItem + ' ' + style.loginTitleItemActive
    }
    return style.loginTitleItem
  }

  return (
    <div className={style.loginContainer}>
      <div className={style.loginTitleContainer}>
        <div className={getClass(isLogin)} onClick={() => setIsLogin(true)}>
          Login
        </div>
        <div className={getClass(!isLogin)} onClick={() => setIsLogin(false)}>
          Register
        </div>
      </div>
      <div className={style.loginFormContainer}>
        <ChangeLabel isLogin={isLogin} />
      </div>
    </div>
  )
}

export default Login
