import requests from './Request'
import { registerObj, loginObj,resObj} from './type'

// 注册接口
export const reqUserReg = (data: registerObj) =>
  requests({ url: '/user/register', data, method: 'post'})

// 登录接口
export const reqUserLogin = (data: loginObj) => requests.post<resObj>('/user/login',data)

// 获取详情页
export const reqHouseDetail = (id: number) => requests({ url: `/house/${id}`, method: 'get' })

// 获取活动页
export const reqHouseActive = () => requests({ url: `/agent/show`, method: 'get' })
