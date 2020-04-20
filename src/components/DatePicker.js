import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Calculations from "../Calculations";

export default function DatePicker(props) {
    const classes = useStyles();
    const calc = new Calculations();

    const handleDateChange = (date) => {
        props.setDate(calc.toUTC(date));
    };

    return (
        // From Material-UI documentation.
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={classes.date}
                label={props.label}
                format="MM/dd/yyyy"
                value={props.date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

const useStyles = makeStyles(() => ({
    date: {
        '& > *': {
            maxWidth: '180px',
        },
        marginBottom: '2vh',
    },
}));