import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function NavBar(props) {
    return (
        <Paper square>
            <Tabs
                value={props.activeValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={props.handleChange}
            >
                <Tab label="Day Length" />
                <Tab label="Graph"/>
            </Tabs>
        </Paper>
    );
}