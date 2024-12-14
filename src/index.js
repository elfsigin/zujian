/*
 * @Author: 来璐 2714838232@qq.com
 * @Date: 2024-12-13 10:23:04
 * @LastEditors: 来璐 2714838232@qq.com
 * @LastEditTime: 2024-12-13 17:57:47
 * @FilePath: \code-change\code\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css'; // 推荐 AntD v5 样式
import { RouterProvider } from 'react-router-dom';
import router from './routers';  // 引入路由配置


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

