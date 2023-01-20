import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import 'lib-flexible/flexible.js'
// import 'antd/dist/antd.css'
localStorage.setItem("token","faketoken");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
