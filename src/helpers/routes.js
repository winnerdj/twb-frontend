import ItemMaster from '../components/dataManagement/itemMaster/main';
import Location from '../components/dataManagement/location/main';
import Vendor from '../components/dataManagement/vendor/main';
import CodeReference from '../components/dataManagement/codeReference/main';
import RouteSchedule from '../components/dataManagement/routeSched/main';
import ForwardShipment from '../components/dataManagement/forwardShipment/main';
import {UserManagement} from '../components/administration';
import {PO,IRVRFD} from '../components/inbound';
import {Outbound} from '../components/outbound';

const routes = [
    {
        route:'/item-master',
        component: index => <ItemMaster key={index}/>
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
        route:'/shipping-list',
        component:index => <Outbound key={index}/>
    }

]

export default routes;