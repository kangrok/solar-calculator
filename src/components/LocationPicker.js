import React, {useState} from "react";
import {Map, Marker, TileLayer} from "react-leaflet";
import L from "leaflet"
import Calculations from "../Calculations";
import {makeStyles} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

export default function LocationPicker(props) {
    const calc = new Calculations();
    const classes = useStyles();

    const [loc, setLoc] = useState([Number(0).toFixed(4), Number(0).toFixed(4)]);

    const locationIsValid = () => {
        return calc.latIsValid(props.lat) && calc.lngIsValid(props.lng);
    };

    const trackLocation = (event) => {
        setLoc([Number(event.latlng.lat).toFixed(4), Number(event.latlng.lng).toFixed(4)]);
    };

    return (
        <Box className={classes.root}>
            <Paper className={classes.location}>{"Latitude: " + loc[0]} &ensp; {"Longitude: " + loc[1]}</Paper>
            <Box className={classes.map}>
                <Map center={[30, 0]} zoom={1.5} onClick={props.handleMapClick} onMouseMove={trackLocation}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                        opacity={locationIsValid() ? 100 : 0}
                        icon={icon()}
                        position={locationIsValid() ? [props.lat, props.lng] : [0, 0]}
                    />
                </Map>
            </Box>
        </Box>
    );
}

const icon = () => {
    let ic = new L.Icon.Default();
    ic.options.shadowSize = [0, 0];
    return ic;
};

const useStyles = makeStyles(() => ({
    root: {
        display: "grid",
        width: '100%',
        height: '100%',
    },
    location: {
        backgroundColor: "white",
        gridRow: "1",
        gridColumn: "1",
        zIndex: "2",
        position: "relative",
        justifySelf: "right",
        width: "300px",
        height: "25px",
        opacity: "0.7",
        padding: "0 5px 0 5px",

    },
    map: {
        gridRowStart: "1",
        gridRowEnd: "2",
        gridColumnStart: "1",
        gridColumnEnd: "2",
        width: "100%",
        height: "100%",
        zIndex: "0",
        position: "relative",
    }
}));