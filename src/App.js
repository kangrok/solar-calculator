import React, {useState} from 'react';
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Calculator from "./components/Calculator";
import Graph from "./components/Graph";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper/Paper";

function App() {

    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    return (
        <div>
            <Paper square>
                <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleTabChange}>
                    <Tab label="Calculator"/>
                    <Tab label="Graph"/>
                </Tabs>
            </Paper>
            <TabPanel value={activeTab} index={0}>
                <Calculator lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <Graph lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>
            </TabPanel>
        </div>
    );
}

// From Material-UI documentation.
function TabPanel(props) {
    const {children, value, index, ...other} = props;
    const classes = useStyles();

    return (
        <div hidden={value !== index} className={classes.root}
             {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
}));

export default App;
