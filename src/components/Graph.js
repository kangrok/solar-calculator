import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper} from "@material-ui/core";
import Calculations from "../Calculations";
import {Line} from "react-chartjs-2"
import LocationPicker from "./LocationPicker";
import CoordinateForm from "./CoordinateForm";
import DatePicker from "./DatePicker";
import Button from "@material-ui/core/Button";
import _ from "lodash";

export default function Graph(props) {
    const classes = useStyles();
    const calc = new Calculations();
    let date = new Date();

    const [startDate, setStartDate] = useState(new Date(date));
    const [endDate, setEndDate] = useState(new Date(date.setFullYear(date.getFullYear() + 1)));
    const [dateData, setDateData] = useState(calc.getChartData(startDate, endDate, props.lat, props.lng));
    const [chartData, setChartData] = useState({
        labels: dateData.get("labels"),
        datasets: [{
            borderColor: "rgba(17, 82, 147, 1)",
            backgroundColor: "rgba(17, 82, 147, 0.5)",
            data: dateData.get("data"),
        }],
    });
    const [options, setOptions] = useState({
        title: {text: "Length of day per date", display: true},
        responsive: true,
        maintainAspectRatio: false,
        legend: {display: false},
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: getUnit(dateData.get("labels").length),
                    unitStepSize: getStepSize(dateData.get("labels").length),
                    displayFormats: {
                        day: 'MMM DD',
                        month: 'MMM',
                        year: 'YYYY',
                    }
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Day length (hrs)',
                    fontWeight: "bold",
                },
                ticks: {
                    min: 0,
                    max: 24
                }
            }]
        }
    });
    let inputLat = props.lat;
    let inputLng = props.lng;

    const setInputLat = (lat) => {
        inputLat = lat;
    };

    const setInputLng = (lng) => {
        inputLng = lng;
    };

    const handleDataChange = () => {
        if (calc.stateIsValid(inputLat, inputLng, startDate) && calc.dateIsValid(endDate)) {
            props.setLat(inputLat);
            props.setLng(inputLng);

            const newDateData = calc.getChartData(startDate, endDate, inputLat, inputLng);
            setDateData(newDateData);

            let newChartData = _.clone(chartData);
            newChartData.labels = newDateData.get("labels");
            newChartData.datasets[0].data = newDateData.get("data");
            setChartData(newChartData);

            let newOptions = _.clone(options);
            newOptions.scales.xAxes[0].time.unit = getUnit(newDateData.get("labels").length);
            newOptions.scales.xAxes[0].time.unitStepSize = getStepSize(newDateData.get("labels").length);
            setOptions(newOptions);
        }
    };

    const handleMapClick = (event) => {
        props.setLat(event.latlng.lat);
        props.setLng(event.latlng.lng);
    };

    return (
        <Box style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Paper style={{display: "flex", flexDirection: "row", padding: 0, height: "40vh",}}>
                <div className={classes.form}>
                    <CoordinateForm
                        type="latitude"
                        coordinate={inputLat}
                        setCoordinate={setInputLat}
                        isValid={calc.latIsValid}/>
                    <CoordinateForm
                        type="longitude"
                        coordinate={inputLng}
                        setCoordinate={setInputLng}
                        isValid={calc.lngIsValid}
                    />
                    <DatePicker date={startDate} label="Start date" setDate={setStartDate}/>
                    <DatePicker date={endDate} label="End date" setDate={setEndDate}/>
                    <Button variant="contained" color="primary" onClick={handleDataChange} style={{width: "150px"}}>
                        Update chart
                    </Button>
                </div>
                <Box style={{width: "45vw", height: "40vh", margin: 0}}>
                    <LocationPicker
                        lat={props.lat} lng={props.lng}
                        handleMapClick={handleMapClick}
                    />
                </Box>
            </Paper>
            <Paper className={classes.graph}>
                <Line id="chart" options={options} data={chartData}/>
            </Paper>
        </Box>
    )
}

const getUnit = (size) => {
    return size > 750 ? "year" : (size > 90 ? "month" : "day");
};

const getStepSize = (size) => {
    const unit = getUnit(size);
    if (unit === "day") return size > 60 ? 6 : (size > 30 ? 3 : 1);
    const coef = unit === "month" ? 30 : 365;
    return size <= 15 * coef ? 1 : 0;
};

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        alignItems: 'center',
        padding: '3ch 5ch 3ch 5ch',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: '220px',
        padding: "4ch",
    },
    graph: {
        marginTop: "3ch",
        padding: "3ch",
        height: "40vh",
        width: "80%",
    },
}));