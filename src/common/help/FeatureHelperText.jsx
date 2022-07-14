import PropTypes from "prop-types";
import React from "react";
import { Box } from '@mui/material';

function FeatureHelperText(props) {
    return (
        <Box
            borderRadius={5}
            border="1px dashed"
            borderColor="grey.400"
            mb={2}
            pl={2}
            pr={2}
            pt={1}
            pb={1}
        >
            {props.children}
        </Box>
    );
}

FeatureHelperText.defaultProps = {};

FeatureHelperText.propTypes = {
    children: PropTypes.any.isRequired,
};
export default FeatureHelperText;
