import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/main',
                    component: resolve => require(['../components/page/main.vue'], resolve),
                    meta: { title: '系统主页' }
                },
                {
                    path: '/basicFunc',
                    component: resolve => require(['../components/page/basicFunc.vue'], resolve),
                    meta: { title: '基础功能' }
                },
                {
                    path: '/product',
                    component: resolve => require(['../components/page/product/BaseTable.vue'], resolve),
                    meta: { title: '产品列表' }
                },
                {
                    path: '/productNew',
                    component: resolve => require(['../components/page/product/ProCreate.vue'], resolve),
                    meta: { title: '创建产品' }
                },
                {
                    path: '/scheme',
                    component: resolve => require(['../components/page/scheme/BaseTable.vue'], resolve),
                    meta: { title: '方案列表' }
                },
                {
                    path: '/scheme/create',
                    component: resolve => require(['../components/page/scheme/create.vue'], resolve),
                    meta: { title: '创建方案' }
                },
                {
                    path: '/supplier',
                    component: resolve => require(['../components/page/supplier/BaseTable.vue'], resolve),
                    meta: { title: '供应商列表' }
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/page/user/BaseTable.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/building',
                    component: resolve => require(['../components/page/building/BaseTable.vue'], resolve),
                    meta: { title: '楼盘列表' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
