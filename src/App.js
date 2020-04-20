import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import NavBar from "./components/NavBar";
import Calculator from "./components/Calculator";

function App() {
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
      <div>
        <NavBar activeValue={activeTab} handleChange={handleTabChange}/>
        <TabPanel value={activeTab} index={0}>
          <Calculator/>

        </TabPanel>
        <TabPanel className={classes.root} value={activeTab} index={1}>
        </TabPanel>
      </div>
  );
}

// From Material-UI dokumentation
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
