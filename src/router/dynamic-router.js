
/* 产品管理 */
const Goods = () => import('@/pages/goods-manage')
const GoodsList = () => import('@/pages/goods-manage/goods-list')
const GoodsClassify = () => import('@/pages/goods-manage/goods-classify')
const Order = () => import('@/pages/order-manage')
const OrderList = () => import('@/pages/order-manage/order-list')
const ProductManage = () => import('@/pages/order-manage/product-manage')
const ProductList = () => import('@/pages/order-manage/product-manage/product-list')
const ProductDetail = () => import('@/pages/order-manage/product-manage/product-detail')

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


/* 需要权限判断的路由 */
export const   dynamicRouter = [
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
                    icon: 'icon-member',
                    slideName:'member-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'member-detail',
                component: MemberDetail,
                meta: {
                    name: '会员详情',
                    icon: 'icon-member',
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
                    icon: 'icon-doctor',
                    slideName:'doctors-list',
                }
            },
            {
                path: 'detail/:id',
                name: 'doctors-detail',
                component: DoctorsDetail,
                meta: {
                    name: '医生详情',
                    icon: 'icon-doctor',
                    slideName:'doctors-list',
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
                    icon: 'icon-data-manage',
                    slideName:'healthData-add',
                }
            },
            {
                path: 'echart/:id',
                name: 'healthData-echart',
                component: HealthDataEchart,
                meta: {
                    name: '历史曲线',
                    icon: 'icon-product-manage',
                    slideName:'healthData-add',
                    slideHide:true,
                }
            },
            {
                path: 'list',
                name: 'healthData-list',
                component: HealthDataList,
                meta: {
                    name: '历史数据',
                    icon: 'icon-home',
                    slideName:'healthData-add',
                    slideHide:true,
                }
            },

        ]
    },

    // {
    //     path: '',
    //     component: Goods,
    //     name: 'goods',
    //     meta: {
    //         name: '商城管理',
    //         icon: 'icon-order-manage'
    //     },
    //     children: [
    //         {
    //             path: 'goods/list',
    //             name: 'goods-list',
    //             component: GoodsList,
    //             meta: {
    //                 name: '商品管理',
    //                 icon: 'icon-home',
    //                 slideName:'goods-list',
    //             }
    //         },
    //         {
    //             path: 'datail',
    //             name: 'goods-datail',
    //             component: GoodsClassify,
    //             meta: {
    //                 name: '商品详情',
    //                 icon: 'icon-product-manage',
    //                 slideName:'goods-list',
    //                 slideHide:true,
    //             }
    //         }
    //     ]
    // },
    // {
    //     path: '/order',
    //     component: Order,
    //     name: 'order-manage',
    //     meta: {
    //         name: '订单管理',
    //         icon: 'icon-email',
    //     },
    //     children: [
    //         {
    //             path: 'list',
    //             name: 'order-list',
    //             component: OrderList,
    //             meta: {
    //                 name: '订单列表',
    //                 icon: 'icon-quit'
    //             }
    //         },
    //         {
    //             path: 'product',
    //             name: 'product-manage',
    //             component: ProductManage,
    //             meta: {
    //                 name: '生产管理',
    //                 icon: 'icon-service'
    //             },
    //             // children: [
    //             //     {
    //             //         path: 'list',
    //             //         name: 'product-list',
    //             //         component: ProductList,
    //             //         meta: {
    //             //             name: '生产列表',
    //             //             icon: 'icon-nav',
    //             //         }
    //             //     },
    //             //     {
    //             //         path: 'detail',
    //             //         name: 'product-detail',
    //             //         component: ProductDetail,
    //             //         meta: {
    //             //             name: '生产详情',
    //             //             icon: 'icon-finance-manage',
    //             //             slideHide:true,
    //             //         }
    //             //     }
    //             // ]
    //         },
    //         {
    //             path: 'list',
    //             name: 'product-list',
    //             component: ProductList,
    //             meta: {
    //                 name: '生产列表',
    //                 icon: 'icon-nav',
    //             }
    //         },
    //         {
    //             path: 'detail',
    //             name: 'product-detail',
    //             component: ProductDetail,
    //             meta: {
    //                 name: '生产详情',
    //                 icon: 'icon-finance-manage',
    //                 slideHide:true,
    //             }
    //         }
    //         // {
    //         //     path: 'returnGoods',
    //         //     name: 'return-goods',
    //         //     component: ReturnGoods,
    //         //     meta: {
    //         //         name: '退货管理',
    //         //         icon: 'icon-product-manage'
    //         //     }
    //         // }
    //     ]
    // },
]

