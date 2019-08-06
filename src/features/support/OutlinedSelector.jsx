import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function OutlinedSelector(props) {
    const classes = useStyles();
    const {name, title, value, data, disabled = false} = props;

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <FormControl variant="outlined" className={classes.formControl} disabled={disabled}>
            <InputLabel ref={inputLabel} htmlFor={name}>
                {title}
            </InputLabel>
            <Select
                value={value}
                onChange={props.onChange}
                input={<OutlinedInput labelWidth={labelWidth} name={name} id={name}/>}
            >
                {data.map((type, i) => {
                    return (<MenuItem key={i} value={type.value}>{type.name}</MenuItem>);
                })}

            </Select>
        </FormControl>
    );

}