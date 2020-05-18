export default {
    LOGIN_IN(state, token) {
        console.log(token)
        state.UserToken = token
        console.log(state.UserToken)
    },
    LOGIN_OUT(state) {
        state.UserToken = ''
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    }
}
