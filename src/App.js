import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { RouterProvider, Outlet, Link } from 'react-router-dom';

import Highlight from './highlight';  // 语法高亮组件
import CodeHighlighter from './ast';  // AST 组件

const { TextArea } = Input;
const esprima = require('esprima');

function App() {
  const [input, setInput] = useState('');  // 用户输入的代码
  const [ast, setAst] = useState(null);    // 存储 AST

  // 当用户输入更新时，解析 AST
  useEffect(() => {
    if (input) {
      const parsedAst = esprima.parseScript(input);  // 动态解析用户输入的代码
      setAst(parsedAst);
    }
  }, [input]);  // 每次输入变化时都会重新计算 AST

  // 处理输入框变化
  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
      <div className="App">
        <TextArea
          rows={10}
          value={input}
          onChange={handleOnChange}
          placeholder="在这里输入代码..."
        />
        
        {/* 语法高亮 */}
        <Highlight input={input} /> 

        <hr />

        {/* 打印 AST */}
        {ast && <span>{JSON.stringify(ast, null, 2)}</span>}

        <hr />

        {/* 使用 AST 高亮代码 */}
        <CodeHighlighter input={input} />

        <div>
          <h1>欢迎来到首页</h1>
          <nav>
            <ul>
              <li>
                <Link to="/ast">登录页</Link>
              </li>
              <li>
                <Link to="/regex">正则页</Link>
              </li>
            </ul>
          </nav>

          {/* 路由出口 */}
          <Outlet />
        </div>
      </div>
  
  );
}

export default App;
