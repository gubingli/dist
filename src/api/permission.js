import axios from '@/config/httpConfig'
import store from '@/store/index'

export function fetchPermission() {
    console.log(store.state.Role)
    let role= store.state.Role;
    if(role=='0'){
        return axios.get('/static/permission.json')
    }else if(role=='1'){
        return axios.get('/static/company_permission.json')
    }else if(role=='2'){
        return axios.get('/static/doctor_permission.json')
    }else if(role=='3'){
        return axios.get('/static/member_permission.json')
    }
}
