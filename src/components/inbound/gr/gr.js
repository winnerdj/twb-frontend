import React from 'react';
import {Paper,Tabs,Tab,Grid,Box} from '@material-ui/core';
import Confirmed from './grn';
import Unconfirmed from './gre';

// import ViewItems from '../viewItems';

const GoodsReceipt = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (e,value) => {
        setValue(value)
    }

    const renderComponent = () => {
        //render confirmed
        if(value === 0 ){
            return <Confirmed/>
        }   
        //render unconfirmed
        else{
            return <Unconfirmed/>
        }
    }

    return (
        <Paper elevation={0} component={Box} p={1}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Tabs
                        indicatorColor="primary"
                        textColor='primary'
                        value={value}
                        onChange={handleChange}>
                            <Tab id="confirmed" label='Confirmed'/>
                            <Tab id="unconfirmed" label='Unconfirmed'/>
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    {renderComponent()}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default GoodsReceipt;