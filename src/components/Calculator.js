import React from "react";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export default function Calculator(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.calculator}>
                <div className={classes.form}>
                    <div className={classes.input}>
                        <FormControl>
                            <Input endAdornment={<InputAdornment>°</InputAdornment>}
                                   inputProps={{style: {textAlign: 'right'}}}/>
                        </FormControl>
                        <FormControl>
                            <Input endAdornment={<InputAdornment>'</InputAdornment>}
                                   inputProps={{style: {textAlign: 'right'}}}/>
                        </FormControl>
                        <FormControl>
                            <Input endAdornment={<InputAdornment>''</InputAdornment>}
                                   inputProps={{style: {textAlign: 'right'}}}/>
                        </FormControl>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            format="MM/dd/yyyy"
                            value={props.date}
                        />
                    </MuiPickersUtilsProvider>
                    <Button variant="contained" color="primary" style={{width: "150px", marginTop: '1vh'}}>
                        Calculate
                    </Button>
                </div>
                <div className={classes.result}>
                    <Typography variant="h5" paragraph={true}>Sunrise:</Typography>
                    <Typography variant="h5" paragraph={true}>Sunset:</Typography>
                    <Typography variant="h5">Length of day:</Typography>
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
    input: {
        '& > *': {
            width: '40px',
        },
        display: 'flex',
        marginTop: '1vh',
        marginBottom: '1vh',
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