/*
 * @Author: 来璐 2714838232@qq.com
 * @Date: 2024-12-13 15:50:36
 * @LastEditors: 来璐 2714838232@qq.com
 * @LastEditTime: 2024-12-14 21:52:36
 * @FilePath: \code-change\code\src\routers\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Regex from "../highlight/highlight";
import AST from "../ast/ast";
import T from "../t";

const router = createBrowserRouter([
  {
    path: "/",
    element: <T />,
    children: [
      {
        path: "Regex",
        element: <Regex />,
      },
      {
        path: "AST",
        element: <AST />,
      },
    ],
  },
]);
export default router;
