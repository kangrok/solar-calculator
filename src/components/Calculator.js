import React, {useState} from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CoordinateForm from "./CoordinateForm";
import Calculations from "../Calculations"
import DatePicker from "./DatePicker";

export default function Calculator(props) {
    const classes = useStyles();
    const calc = new Calculations();

    const [date, setDate] = useState(calc.toUTC(new Date()));
    const [sunrise, setSunrise] = useState(calc.getSunrise(props.lat, props.lng, calc.toUTC(new Date())));
    const [sunset, setSunset] = useState(calc.getSunset(props.lat, props.lng, calc.toUTC(new Date())));
    let inputLat = props.lat;
    let inputLng = props.lng;

    const setInputLat = (lat) => {
        inputLat = lat;
    };

    const setInputLng = (lng) => {
        inputLng = lng;
    };

    const setSolarEvents = () => {
        if (calc.stateIsValid(inputLat, inputLng, date)) {
            props.setLat(inputLat);
            props.setLng(inputLng);
            setSunrise(calc.getSunrise(inputLat, inputLng, date));
            setSunset(calc.getSunset(inputLat, inputLng, date));
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.calculator}>
                <div className={classes.form}>
                    <CoordinateForm type="latitude" coordinate={props.lat} setCoordinate={setInputLat}/>
                    <CoordinateForm type="longitude" coordinate={props.lng} setCoordinate={setInputLng}/>
                    <DatePicker date={date} label="Date" setDate={setDate}/>
                    <Button variant="contained" color="primary" onClick={setSolarEvents} style={{width: "150px"}}>
                        Calculate
                    </Button>
                </div>
                <div className={classes.result}>
                    <Typography variant="h5" paragraph={true}>Sunrise: {sunrise.toLocaleString()}</Typography>
                    <Typography variant="h5" paragraph={true}>Sunset: {sunset.toLocaleString()}</Typography>
                    <Typography variant="h5">Length of day: {calc.getDayLengthString(sunrise, sunset)}</Typography>
                </div>
            </Paper>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    calculator: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: '3ch 5ch 3ch 5ch',
        width: '35vw'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '220px'
    },
    date: {
        '& > *': {
            maxWidth: '180px',
        },
        marginBottom: '2vh',
    },
    result: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "2vh 0 2vh 0",
        width: "20vw",
    },
}));