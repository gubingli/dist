import axios from '@/config/httpConfig'
import store from '@/store/index'
import { staticUrl } from '@/config/baseUrl'

export function fetchPermission() {
    console.log(store.state.Role)
    let role= store.state.Role;
    if(role=='0'){
        return axios.get(staticUrl+'/static/permission.json')
    }else if(role=='1'){
        return axios.get(staticUrl+'/static/company_permission.json')
    }else if(role=='2'){
        return axios.get(staticUrl+'/static/doctor_permission.json')
    }else if(role=='3'){
        return axios.get(staticUrl+'/static/member_permission.json')
    }
}
