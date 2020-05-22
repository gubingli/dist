export default {
    LOGIN_IN(state, options) {
        state.UserToken = options.token;
        state.Role=options.role;
        state.UserId=options.id;
    },
    LOGIN_OUT(state) {
        state.UserToken = '';
        state.Role='';
        state.UserId='';
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    }
}
