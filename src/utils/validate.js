export function validatePhone (rule,value,callback){
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else if (!(/^1\d{10}$/.test(value))) {
        callback(new Error('请输入正确的手机号!'));
    } else {
        callback();
    }
};

// var validatePhone=(rule,value,callback)=>{
//     if (value === '') {
//         callback(new Error('请输入手机号'));
//     } else if (!(/^1\d{10}$/.test(value))) {
//         callback(new Error('请输入正确的手机号!'));
//     } else {
//         callback();
//     }
// };