import React from 'react';
import {
    FormControlLabel, Grid,
    IconButton, Input,
} from "@material-ui/core";

import Box from "@material-ui/core/Box";
import {Clear} from "@material-ui/icons";
import Switch from "@material-ui/core/Switch";


const ConsentSearch = (props) => {

    return <Box mb={5}>
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Input
                    fullWidth
                    value={props.searchValue}
                    placeholder="Filtrer på tjenste"
                    onChange={props.updateSearch}
                    endAdornment={
                        <>
                            {(
                                <IconButton
                                    aria-label="clear"
                                    // disabled={props.searchValue.length < 1}
                                    onClick={props.clearSearch}
                                >
                                    <Clear fontSize='small'/>
                                </IconButton>)
                            }
                        </>
                    }
                />
            </Grid>
            <Grid item xs={3}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.showNonActive}
                            onChange={props.handleChange}
                            name="showNonActive"
                            color="secondary"
                        />
                    }
                    label="Vis inaktive behandling"
                />
            </Grid>
        </Grid>
    </Box>
};

ConsentSearch.propTypes = {
    // hideNonActive: PropTypes.bool.isRequired
}
export default ConsentSearch;