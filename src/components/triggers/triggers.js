import React from 'react';
import {Paper,Box} from '@material-ui/core';
import DateFilter from './dateFilter';
import {trigger} from './saga';
import {useSelector} from 'react-redux';

const Triggers = () => {
    const {id} = useSelector(state => state.user)
    const handleTrigger = (from,to,route) => {
        return trigger({
            from,
            to,
            route,
            user:id
        })
    }

    return (
        <div>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='gr' label='GRN Confirmation Manual Trigger'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='sa' label='Shipment Confirmation Manual Trigger'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='isConsolidated' label='SA Status Update Manual Trigger'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='dr' label='DR Manual Trigger'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='loctran' label='Location Transfer Manual Trigger'/>
            </Paper>
        </div>
    );
};

export default Triggers;