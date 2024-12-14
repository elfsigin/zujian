import {
    Input
} from 'antd';
import React, {
    useState
} from 'react';

const {
    TextArea
} = Input
const esprima = require('esprima')

const input1 = `let x = 42 + "hello";  let a=4`
const ast = esprima.parseScript(input1)
console.log(JSON.stringify(ast, null, 2));

const syntaxStyles = {
    Keyword: 'color:bule;font-weight:bold',
    Identifier: 'color: black;',
    Numeric: 'color: orange;',
    String: 'color: green;',
    Operator: 'color: red;',
    Punctuator: 'color: gray;',
}

const getAST = (code) => {
    try {
        return esprima.parseScript(code)
    } catch (error) {
        console.log('解析代码出错', error);
        return null

    }
}

// 将 AST 转换为带高亮的 HTML
const highlightCode = (code) => {
    const ast = getAST(code);
    if (!ast) return code;

    let highlightedCode = '';
    let lastIndex = 0;

    // 遍历 AST 生成高亮的 HTML
    const traverseAST = (node) => {
        switch (node.type) {
            case 'Program':
                node.body.forEach(traverseAST);
                break;
            case 'VariableDeclaration':
                node.declarations.forEach((declaration) => {
                    traverseAST(declaration);
                });
                break;
            case 'FunctionDeclaration':
                highlightedCode += `<span style="${syntaxStyles.Keyword}">function</span> `;
                highlightedCode += `<span style="${syntaxStyles.Identifier}">${node.id.name}</span>`;
                break;
            case 'FunctionExpression':
                highlightedCode += `<span style="${syntaxStyles.Keyword}">function</span> `;
                highlightedCode += `<span style="${syntaxStyles.Identifier}">${node.id ? node.id.name : ''}</span>`;
                break;
            case 'Literal':
                if (typeof node.value === 'string') {
                    highlightedCode += `<span style="${syntaxStyles.String}">"${node.value}"</span>`;
                } else {
                    highlightedCode += `<span style="${syntaxStyles.Numeric}">${node.value}</span>`;
                }
                break;
            case 'Identifier':
                highlightedCode += `<span style="${syntaxStyles.Identifier}">${node.name}</span>`;
                break;
            case 'BinaryExpression':
                traverseAST(node.left);
                highlightedCode += `<span style="${syntaxStyles.Operator}">${node.operator}</span>`;
                traverseAST(node.right);
                break;
            case 'ExpressionStatement':
                traverseAST(node.expression);
                break;
            case 'VariableDeclarator':
                traverseAST(node.id);
                if (node.init) {
                    highlightedCode += ' = ';
                    traverseAST(node.init);
                }
                break;
            case 'BlockStatement':
                node.body.forEach(traverseAST);
                break;
            default:
                break;
        }
    };

    traverseAST(ast);

    return highlightedCode;
};

const CodeHighlighter = ({input}) => {
    const highlightedCode = highlightCode(input)
    console.log(input, 'input');

    return ( <
        div style = {
            {
                marginTop: '20px',
                padding: '10px',
                border: '1px solid #ccc',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                backgroundColor: '#f9f9f9',
            }
        }dangerouslySetInnerHTML = {{__html: highlightedCode}}/>
    );
};

export default CodeHighlighter;