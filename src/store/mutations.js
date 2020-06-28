export default {
    LOGIN_IN(state, options) {
        state.UserToken = options.token;
        state.Role=options.role;
        state.UserId=options.id;
        state.IdCode=options.id_code;
    },
    LOGIN_OUT(state) {
        state.UserToken = '';
        state.Role='';
        state.UserId='';
        state.IdCode='';
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    }
}
