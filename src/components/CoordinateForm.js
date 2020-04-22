import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Calculations from "../Calculations";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function CoordinateForm(props) {
    const calc = new Calculations();
    const classes = useStyles();

    const [coordinateStr, setCoordinateStr] = useState(calc.getDegMinSec(props.coordinate));

    const isValid = (c) => {
        const notEmpty = c[0] !== "" && c[1] !== "" && c[2] !== "";
        return notEmpty && props.type === "latitude" ? calc.latIsValid(c) : calc.lngIsValid(c);
    };

    const handleCoordinateChange = (i) => (event) => {
        const n = event.target.value.replace(i > 0 ? /[^0-9]/g : /[^0-9-]/g, '');
        let newCoordinate = [...coordinateStr];
        newCoordinate[i] = n;
        setCoordinateStr(newCoordinate);
        props.setCoordinate(calc.getDeg(newCoordinate));
    };

    // Update fields if location is selected on map.
    useEffect(() => {
        let newCoordinate = calc.getDegMinSec(props.coordinate);

        for (let i = 0; i < 3; i++) {
            if (newCoordinate[i] !== coordinateStr[i]) {
                setCoordinateStr(newCoordinate);
                break;
            }
        }
    }, [props.coordinate]);

    const generateInputs = () => {
        let inputs = [];
        for (let i = 0; i < 3; i++) {
            inputs.push(
                <FormControl key={i} error={!isValid(coordinateStr)}>
                    <Input value={coordinateStr[i]}
                           onChange={handleCoordinateChange(i)}
                           endAdornment={<InputAdornment>{i === 0 ? "°" : i === 1 ? "'" : "''"}</InputAdornment>}
                           inputProps={{style: {textAlign: 'right'}}}
                    />
                </FormControl>
            )
        }
        return inputs
    };

    return (
        <div style={{width: '270px'}}>
            <FormHelperText>{props.type.charAt(0).toUpperCase() + props.type.substring(1)}</FormHelperText>
            <div className={classes.input}>
                {generateInputs()}
            </div>
            <FormHelperText error>
                {isValid(coordinateStr)
                    ? " "
                    : (props.type === "latitude"
                        ? "Latitude must be between -90° and 90°."
                        : "Longitude must be between -180° and 180°.")}
            </FormHelperText>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    input: {
        '& > *': {
            width: '40px',
        },
        display: 'flex',
    },
}));