module.exports = [
    {
        name: '首页',
        icon: 'icon-home',
        sub_menu: [
            {name: '首页', link: 'default'}
        ]
    },
    {
        name: '账户管理',
        icon: ' icon-user',
        ksa:'account_manage',
        sub_menu: [
            {name: '账户管理', link: 'account-management',ksa:'account_manage'}
        ]
    },
    {
        name: '交易管理',
        icon: 'icon-table2',
        sub_menu: [
            {name: '交易明细', link: 'trade-info',ksa:'trade_detail_manage'},
            {name: '异常交易', link: 'Abnormal-transaction',ksa:'exception_trade_manage'},
            {name: '异常白名单', link: 'white-lists',ksa:'exception_trade_white_list_manage'}
        ]
    },
    {
        name: '备付金支出',
        icon: 'icon-table2',
        sub_menu: [
            {name: '付款明细', link: 'payment-details',ksa:'reserve_cash_detail_manage'},
            {name: '划付复核', link: 'pay-recheck'},
            {name: '补贴划付', link: 'subsidy-appropriation',ksa:'subsidy_pay_detail_manage'},
            // {name: '额度采购', link: 'limit-purchase-detail'},
            {name: '补贴退税', link: 'subsidy-tax-rebate',ksa:'subsidy_tax_rebate_detail_manage'},
            {name: '预付款划付', link: 'advance-payment-detail',ksa:'advance_payment_detail_manage'}
        ]
    },
    {
        name: '商户管理',
        icon: 'icon-table2',
        sub_menu: [
            {name: '商户管理', link: 'business-lists',ksa:'merchant_manage'},
            // {name: '额度采购', link: 'business-limit'},
            {name: '预付款', link: 'prepayment-lists',ksa:'advance_payment_account_manage'}
        ]
    },
    {
        name: '三方管理',
        icon: ' icon-users4',
        ksa:'third_party_account_manage',
        sub_menu: [
            {name: '三方管理', link: 'third-party',ksa:'third_party_account_manage'}
        ]
    },
    {
        name: '活动管理',
        icon: 'icon-flag3',
        ksa:'activity_manage',
        sub_menu: [
            {name: '活动管理', link: 'activity-lists',ksa:'activity_manage'}
        ]
    },
    {
        name: '系统配置',
        icon: ' icon-wrench',
        sub_menu: [
            {name: '员工管理', link: 'user-managerment',ksa:'user_manage'},
            {name: '系统日志', link: 'log-management',ksa:'system_log_manage'}
        ]
    },
]
