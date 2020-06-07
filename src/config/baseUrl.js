// const baseUrl = 'http://localhost:8080';
console.log(process.env.NODE_ENV)
const baseUrl = process.env.NODE_ENV ==='development'?'http://localhost:8080':'http://api.ankangyidao.com';
const staticUrl = process.env.NODE_ENV ==='development'?'http://localhost:8080':'http://www.ankangyidao.com';

export  {baseUrl,staticUrl}
