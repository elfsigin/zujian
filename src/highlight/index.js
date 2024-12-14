/*
 * @Author: 来璐 2714838232@qq.com
 * @Date: 2024-12-13 11:16:51
 * @LastEditors: 来璐 2714838232@qq.com
 * @LastEditTime: 2024-12-13 16:23:59
 * @FilePath: \code-change\code\src\highlight\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function tokenize(input) {
    const patterns = [
        { type: "Keyword", regex: /^\b(let|var|const|if|else|function)\b/ },
        { type: "Identifier", regex: /^[a-zA-Z_][a-zA-Z0-9_]*/ },
        { type: "Numeric", regex: /^\d+/ },
        { type: "String", regex: /^"[^"]*"|^'[^']*'/ },
        { type: "Operator", regex: /^=|^\+|^-|^\*|^\// },
        { type: "Punctuator", regex: /^;|^,|^\(|^\)|^\{|^\}/ }
    ];
  
    const tokens = [];
    let position = 0;
  
    while (position < input.length) {
        // Skip whitespace
        if (/^\s/.test(input[position])) {
            position++;
            continue;
        }
  
        let matchFound = false;
  
        for (const { type, regex } of patterns) {
            const substring = input.slice(position);
            const match = substring.match(regex);
            if (match) {
                tokens.push({ type, value: match[0] });
                position += match[0].length;
                matchFound = true;
                break;
            }
        }
  
        if (!matchFound) {
            throw new Error(`Unexpected token at position ${position}: ${input[position]}`);
        }
    }
  
    return tokens;
  }
  //高亮
  function  highlightTokens(token){
    return token.map((token,index)=>{
      const styles={
        Keyword: "color: blue; font-weight: bold;",
        Identifier: "color: black;",
        Numeric: "color: orange;",
        String: "color: green;",
        Operator: "color: red;",
        Punctuator: "color: gray;"
      }
      return `<span key="token-${index}" style="${styles[token.type]}||""}">${token.value}</span>`
    }).join(" ")
  }


function Highlight({input}){
    const highlight=highlightTokens(tokenize(input))
    // console.log(highlight);
    
    return (
         <div
         style = {{
                marginTop: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                backgroundColor: '#f9f9f9',
            }}
            
          dangerouslySetInnerHTML={{__html:highlight}}
          ></div>
    )

  }
export default Highlight;