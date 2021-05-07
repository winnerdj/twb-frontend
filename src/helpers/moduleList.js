const moduleLists = [
    {
        name:'inbound',
        label:'Inbound',
        route:'',
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
            {
                name:'gr',
                label:'GRN',
                link:'/goods-receipt'

            }
        ],

    },
    {
        name:'outbound',
        label:'Outbound',
        route:'',
        subModules:[
            {
                name:'shippingList',
                label:'Shipment List',
                link:'/shipping-list'
            },
            {
                name:'confirmedShipments',
                label:'Confirmed Shipments',
                link:'/confirmed-shipments'
            },
            {
                name:'dr',
                label: 'Delivery Receipt',
                link:'/dr'
            }
        ]
    },
    {
        name:'internal',
        label:'Internal',
        route:'',
        subModules:[
            {
                name:'loctran',
                label:'Location Transfer',
                link:'/location-transfer'
            },
            {
                name:'inventory',
                label:'Inventory',
                link:'/inventory'
            }
        ]
    },
    {
        name:'triggers',
        label:'Triggers',
        route:'/triggers',
        subModules:[]
    },
    {
        name:'dataManagement',
        label:'Data Management',
        route:'',
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
        route:'',
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