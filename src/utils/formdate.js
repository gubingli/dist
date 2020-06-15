export function Format(val, fmt) {
    if (!val) {
        return '';
    }
    if (val && val.length == 10) {
        val = parseInt(val * 1000);
    }
    let date = val;
    // var date = new Date(val);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

export function formatDate(date) {
    var year=date.getFullYear();  //取得4位数的年份
    var month=(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);  //取得日期中的月份，其中0表示1月，11表示12月
    var data=(date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate());      //返回日期月份中的天数（1到31）
//        var hour=now.getHours();     //返回日期中的小时数（0到23）
//        var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
//        var second=now.getSeconds(); //返回日期中的秒数（0到59）
    return year+"-"+month+"-"+data;
//        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
};

