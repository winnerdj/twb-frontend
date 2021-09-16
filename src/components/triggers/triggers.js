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
                <DateFilter trigger={handleTrigger} type='gr' label='GRN Confirmation (GR execution end datetime)'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='isConsolidated' label='SA Status Update (ODO modified datetime)'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='sa' label='Shipment Confirmation (Load Execution creation datetime)'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='dr' label='DR Confirmation (Load Execution creation datetime)'/>
            </Paper>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter trigger={handleTrigger} type='loctran' label='Location Transfer Confirmation (Stock Convert modified datetime)'/>
            </Paper>
        </div>
    );
};

export default Triggers;