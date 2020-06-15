

const Base = () => import('@/pages/base-manage')
const BaseCom = () => import('@/pages/base-manage/base-com')
const BaseDoctor = () => import('@/pages/base-manage/base-doctor')
const BaseMember = () => import('@/pages/base-manage/base-member')

const HealthData = () => import('@/pages/healthData-manage')
const HealthDataAdd = () => import('@/pages/healthData-manage/healthData-add')
const HealthDataEchart = () => import('@/pages/healthData-manage/healthData-echart')
const HealthDataList = () => import('@/pages/healthData-manage/healthData-list')

// const HealthDataechart = () => import('@/pages/healthData-manage/echart')
// const HealthDataDetail = () => import('@/pages/healthData-manage/detail')
const Member = () => import('@/pages/member-manage')
const MemberList = () => import('@/pages/member-manage/member-list')
const MemberDetail = () => import('@/pages/member-manage/member-detail')

const Doctors= () => import('@/pages/doctors-manage')
const DoctorsList = () => import('@/pages/doctors-manage/doctors-list')
const DoctorsDetail = () => import('@/pages/doctors-manage/doctors-detail')
const DoctorsMessage = () => import('@/pages/doctors-manage/doctors-message')

const Company= () => import('@/pages/company-manage')
const CompanyList = () => import('@/pages/company-manage/company-list')
const CompanyDetail = () => import('@/pages/company-manage/company-detail')

const Staff = () => import('@/pages/staff-manage')
const StaffList = () => import('@/pages/staff-manage/staff-list')

/* 需要权限判断的路由 */
export const   dynamicRouter = [
    {
        path: 'base',
        component: Base,
        name: 'base',
        meta: {
            name: '基本信息',
            icon: 'icon-base'
        },
        children: [
            {
                path: 'com',
                name: 'base-com',
                component: BaseCom,
                meta: {
                    name: '机构信息',
                    // icon: 'icon-member',
                    slideName:'base-com',
                }
            },
            {
                path: 'doctor',
                name: 'base-doctor',
                component: BaseDoctor,
                meta: {
                    name: '医生信息',
                    // icon: 'icon-member',
                    slideName:'base-doctor',
                }
            },
            {
                path: 'member',
                name: 'base-member',
                component: BaseMember,
                meta: {
                    name: '会员信息',
                    // icon: 'icon-member',
                    slideName:'base-doctor',
                }
            }
        ]
    },
    {
        path: 'member',
        component: Member,
        name: 'member',
        meta: {
            name: '会员管理',
            icon: 'icon-member'
        },
        children: [
            {
                path: 'list',
                name: 'member-list',
                component: MemberList,
                meta: {
                    name: '会员管理',
                    // icon: 'icon-member',
                    slideName:'member-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'member-detail',
                component: MemberDetail,
                meta: {
                    name: '会员信息',
                    // icon: 'icon-member',
                    slideName:'member-list',
                    slideHide:true,
                }
            },
            {
                path: '/healthData/echart',
                name: 'healthData-echart',
                component: HealthDataEchart,
                meta: {
                    name: '健康曲线',
                    // icon: 'icon-product-manage',
                    slideName:'healthData-add',
                    slideHide:true,
                }
            },
            {
                path: 'message/:id',
                name: 'member-message',
                component: DoctorsMessage,
                meta: {
                    name: '留言详情',
                    // icon: 'icon-doctor',
                    slideName:'member-list',
                    slideHide:true,
                }
            }
        ]
    },
    {
        path: 'doctors',
        component: Doctors,
        name: 'doctors',
        meta: {
            name: '医生管理',
            icon: 'icon-doctor'
        },
        children: [
            {
                path: 'list',
                name: 'doctors-list',
                component: DoctorsList,
                meta: {
                    name: '医生列表',
                    // icon: 'icon-doctor',
                    slideName:'doctors-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'doctors-detail',
                component: DoctorsDetail,
                meta: {
                    name: '医生信息',
                    // icon: 'icon-doctor',
                    slideName:'doctors-list',
                    slideHide:true,
                }
            },
            {
                path: 'message/:id',
                name: 'doctors-message',
                component: DoctorsMessage,
                meta: {
                    name: '留言详情',
                    // icon: 'icon-doctor',
                    slideName:'doctors-list',
                    slideHide:true,
                }
            }
        ]
    },
    {
        path: 'doctorsCol',
        component: Doctors,
        name: 'doctorsCol',
        meta: {
            name: '我授权的医生',
            icon: 'icon-doctor'
        },
        children: [
            {
                path: 'list',
                name: 'doctorsCol-list',
                component: DoctorsList,
                meta: {
                    name: '医生列表',
                    // icon: 'icon-doctor',
                    slideName:'doctors-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'doctorsCol-detail',
                component: DoctorsDetail,
                meta: {
                    name: '医生信息',
                    // icon: 'icon-doctor',
                    slideName:'doctorsCol-list',
                    slideHide:true,
                }
            }
        ]
    },
    {
        path: 'company',
        component: Company,
        name: 'company',
        meta: {
            name: '机构管理',
            icon: 'icon-company'
        },
        children: [
            {
                path: 'list',
                name: 'company-list',
                component: CompanyList,
                meta: {
                    name: '机构列表',
                    // icon: 'icon-company',
                    slideName:'company-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'company-detail',
                component: CompanyDetail,
                meta: {
                    name: '机构详情',
                    // icon: 'icon-company',
                    slideName:'company-list',
                    slideHide:true,
                }
            }
        ]
    },
    {
        path: 'healthData',
        component: HealthData,
        name: 'healthData',
        meta: {
            name: '健康数据管理',
            icon: 'icon-data-manage'
        },
        children: [
            {
                path: 'add',
                name: 'healthData-add',
                component: HealthDataAdd,
                meta: {
                    name: '今日数据',
                    // icon: 'icon-data-manage',
                    slideName:'healthData-add',
                }
            },
            {
                path: 'echart',
                name: 'healthData-echart',
                component: HealthDataEchart,
                meta: {
                    name: '健康曲线',
                    // icon: 'icon-product-manage',
                    slideName:'healthData-echart',
                    // slideHide:true,
                }
            }

        ]
    },
    {
        path: 'staff',
        component: Staff,
        name: 'Staff',
        meta: {
            name: '职员管理',
            icon: 'icon-data-manage'
        },
        children: [
            {
                path: 'list',
                name: 'staff-list',
                component: StaffList,
                meta: {
                    name: '职员列表',
                    slideName:'staff-list',
                }
            }

        ]
    },
]

