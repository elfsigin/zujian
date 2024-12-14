/*
 * @Author: 来璐 2714838232@qq.com
 * @Date: 2024-12-13 16:42:21
 * @LastEditors: 来璐 2714838232@qq.com
 * @LastEditTime: 2024-12-13 16:42:26
 * @FilePath: \code-change\code\src\highlight\highlight.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CodeHighlighter from "./index";
import React, { useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
function Regex() {
  // const code = `let x = 42 + "hello";
  // let a=1`;
  // const token=tokenize(code)
  // console.log(tokenize(code));
  // const highlightCode=highlightTokens(token)
  // console.log(highlightCode,'highlightCode');

  const input1 = `let x = 42 + "hello";  let a=4`;
  const [input, setInput] = useState("");
  const handleOnchange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };
  const handlePressEnter = (e) => {
    setInput(e.target.value);
    console.log(input, "input");
  };

  return (
    <div>
      <TextArea
        rows={10}
        value={input}
        onChange={handleOnchange}
        onPressEnter={handlePressEnter}
      ></TextArea>
      <hr />
      使用Regex:
      <CodeHighlighter input={input}></CodeHighlighter>
    </div>
  );
}

export default Regex;
