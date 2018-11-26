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
                    path: '/sitemain',
                    component: resolve => require(['../components/page/siteconfig/main.vue'], resolve),
                    meta: { title: '网站基本设置' }
                },
                {
                    path: '/siteseo',
                    component: resolve => require(['../components/page/siteconfig/seo.vue'], resolve),
                    meta: { title: 'SEO设置' }
                },
                {
                    path: '/sitebottomjs',
                    component: resolve => require(['../components/page/siteconfig/bottomjs.vue'], resolve),
                    meta: { title: '网站底部js设置' }
                },
                {
                    path: '/sitecore',
                    component: resolve => require(['../components/page/siteconfig/core.vue'], resolve),
                    meta: { title: '核心设置' }
                },
                {
                    path: '/pageall',
                    component: resolve => require(['../components/page/detail/pageall.vue'], resolve),
                    meta: { title: '全部页面' }
                },
                {
                    path: '/pagesingle',
                    component: resolve => require(['../components/page/detail/pagesingle.vue'], resolve),
                    meta: { title: '单页管理' }
                },
                {
                    path: '/pagelist',
                    component: resolve => require(['../components/page/detail/pagelist.vue'], resolve),
                    meta: { title: '列表管理' }
                },
                {
                    path: '/pagemodel',
                    component: resolve => require(['../components/page/detail/pagemodel.vue'], resolve),
                    meta: { title: '页面模板' }
                },
                {
                    path: '/others',
                    component: resolve => require(['../components/page/others/basic.vue'], resolve),
                    meta: { title: '其他功能' }
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
