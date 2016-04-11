'use strict'

export default function(router){
    router.map({
        //账户管理
        '/account-management':{
            name:'account-management',
            router_type:'deposit',
            component: function(resolve){
                // console.log('member-new',resolve)
                require(['./views/CWCL/account-management.vue'],resolve);
            }
        },
        //交易明细
        '/trade-info':{
            name:'trade-info',
            router_type:'deposit',
            component: function(resolve){
                // console.log('member-new',resolve)
                require(['./views/CWCL/trade-info.vue'],resolve);
            }
        },
        /* 首页 */
        '/default/':{
            name:'default',
            router_type:'deposit',
            component: function(resolve){
                // console.log('member-new',resolve)
                require(['./views/default.vue'],resolve);
            }
        },
        // 404
        '*':{
            component:function () {
                router.go({name:'default'})
            }
        }
    })
    router.beforeEach(transition =>{
        transition.next();
    });
}