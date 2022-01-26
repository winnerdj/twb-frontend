import ItemMaster from '../components/dataManagement/itemMaster/main';
import Location from '../components/dataManagement/location/main';
import Vendor from '../components/dataManagement/vendor/main';
import CodeReference from '../components/dataManagement/codeReference/main';
import RouteSchedule from '../components/dataManagement/routeSched/main';
import ForwardShipment from '../components/dataManagement/forwardShipment/main';
import ItemCoversion from '../components/dataManagement/itemConversion';
import {UserManagement} from '../components/administration';
import {PO,IRVRFD,GR} from '../components/inbound';
import {Outbound,ShipmentConf,DR} from '../components/outbound';
import {Inventory,Loctran,TransactionReport} from '../components/internal';
import Triggers from '../components/triggers';

const routes = [
    {
        route:'/item-master',
        component: index => <ItemMaster key={index}/>
    },
    {
        route:'/item-conversion',
        component: index => <ItemCoversion key={index}/>
    },
    {
        route:'/location',
        component: index => <Location key={index}/>
    },
    {
        route:'/vendor',
        component: index => <Vendor key={index}/>
    },
    {
        route:'/code-reference',
        component: index => <CodeReference key={index}/>
    },
    {
        route:'/route-schedule',
        component: index => <RouteSchedule key={index}/>
    },
    {
        route:'/forwarder',
        component: index => <ForwardShipment key={index}/>
    },
    {
        route:'/users-management',
        component: index => <UserManagement key={index}/>
    },
    {
        route:'/purchase-order',
        component:index => <PO key={index}/>
    },
    {
        route:'/irv-rfd',
        component: index => <IRVRFD key={index}/>
    },
    {
        route:'/goods-receipt',
        component: index => <GR key={index}/>

    },
    {
        route:'/shipping-list',
        component:index => <Outbound key={index}/>
    },
    {
        route:'/confirmed-shipments',
        component:index => <ShipmentConf key={index}/>
    },
    {
        route:'/dr',
        component:index => <DR key={index}/>
    },
    {
        route:'/inventory',
        component:index => <Inventory key={index}/>
    },
    {
        route:'/transactionReport',
        component:index => <TransactionReport key={index}/>
    },
    {
        route:'/location-transfer',
        component:index => <Loctran key={index}/>
    },
    {
        route:'/triggers',
        component:index => <Triggers key={index}/>
    }
]

export default routes;