// const baseUrl = 'http://localhost:8080';
console.log(process.env.NODE_ENV)
const baseUrl = process.env.NODE_ENV ==='development'?'http://localhost:8080':'http://47.111.240.220:8000';
const staticUrl = process.env.NODE_ENV ==='development'?'http://localhost:8080':'http://47.111.240.220:80';

export  {baseUrl,staticUrl}
