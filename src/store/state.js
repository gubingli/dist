export default {
    get UserToken() {
        return localStorage.getItem('token')
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },
    get Role() {
        return localStorage.getItem('role')
    },
    set Role(value) {
        localStorage.setItem('role', value)
    },
    get IdCode() {
        return localStorage.getItem('id_code')
    },
    set IdCode(value) {
        localStorage.setItem('id_code', value)
    },
    get UserId() {
        return localStorage.getItem('user_id')
    },
    set UserId(value) {
        localStorage.setItem('user_id', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
}
