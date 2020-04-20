import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import Calculator from "./components/Calculator";

function App() {

    const [lat, setLat] = useState(0.0);
    const [lng, setLng] = useState(0.0);
    const [activeTab, setActiveTab] = React.useState(0);

    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };

    return (
        <div>
            <NavBar activeValue={activeTab} handleChange={handleTabChange}/>
            <TabPanel value={activeTab} index={0}>
                <Calculator lat={lat} lng={lng} setLat={setLat} setLng={setLng}/>
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
