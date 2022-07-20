import React from "react";
import { styled } from '@mui/material/styles';
import {
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem
} from '@mui/material';
const PREFIX = 'OutlinedSelector';

const classes = {
    formControl: `${PREFIX}-formControl`
};

const StyledFormControl = styled(FormControl)((
    {
        theme
    }
) => ({
    [`&.${classes.formControl}`]: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 120,
    }
}));

export default function OutlinedSelector(props) {

    const {name, title, value, data, disabled = false} = props;

    const inputLabel = React.useRef();
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <StyledFormControl variant="outlined" className={classes.formControl} disabled={disabled}>
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
        </StyledFormControl>
    );

}