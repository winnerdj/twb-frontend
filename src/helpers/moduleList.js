const moduleLists = [
    {
        name:'inbound',
        label:'Inbound',
        subModules:[
            {
                name:'purchaseOrder',
                label:'Purchase Order',
                link:'/purchase-order'
            },
            {
                name:'irvRfd',
                label:'IRV/RFD',
                link:'/irv-rfd'
            },
        ],

    },
    {
        name:'outbound',
        label:'Outbound',
        subModules:[
            {
                name:'shippingList',
                label:'Shipment List',
                link:'/shipping-list'
            }
        ]
    },
    {
        name:'internal',
        label:'Internal',
        subModules:[]
    },
    {
        name:'dataManagement',
        label:'Data Management',
        subModules:[
            {
                name:'itemMaster',
                label:'Item Master',
                link:'/item-master'
            },
            {
                name:'location',
                label:'Locations',
                link:'/location'
            },
            {
                name:'vendor',
                label:'Vendor',
                link:'/vendor'
            },
            {
                name:'codeReference',
                label:'Code Reference',
                link:'/code-reference'
            },
            {
                name:'routeSchedule',
                label:'Route Schedule',
                link:'/route-schedule'
            },
            {
                name:'forwarderShipMode',
                label:'Forwarder Shipment Mode',
                link:'/forwarder'
            }
        ]
    },
    {
        name:'admin',
        label:'Administration',
        subModules:[
            {
                name:'usersManagement',
                label:'Users Management',
                link:'/users-management'
            },
            {
                name:'rolesManagement',
                label:'Role Management',
                link:'/roles-management'
            },
            {
                name:'locationsManagement',
                label:'Location Management',
                link:'/location-management'
            }
        ]
    }
]
export default moduleLists