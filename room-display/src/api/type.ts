export interface resObj {
  code: number
  success: boolean
  msg: string
  data?: any
}

export interface registerObj {
  username: string
  password: string
  password_: string
  role: number
}

export interface loginObj {
  username: string
  password: string
}
