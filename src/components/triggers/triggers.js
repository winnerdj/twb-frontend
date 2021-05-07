import React from 'react';
import {Paper,Box} from '@material-ui/core';
import DateFilter from './dateFilter';
const Triggers = () => {
    return (
        <div>
            <Paper elevation={0} component={Box} p={1}>
                <DateFilter type='gr' label='Goods Receipt Manual Trigger'/>
            </Paper>
        </div>
    );
};

export default Triggers;