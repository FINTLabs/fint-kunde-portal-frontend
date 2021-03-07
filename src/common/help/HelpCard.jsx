import React from "react";
import {Box, Typography} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import {grey} from "@material-ui/core/colors";

const HelpCard = ({header, children, dense = false}) => {
    return (
        <Box border={1} borderRadius={8} p={1} borderColor="grey.400"
             display="flex" alignItems="top">
            <Box mr={2}>
                <InfoIcon fontSize={"large"} style={{color: grey[600]}}/>
            </Box>
            <Box>
                <Typography variant="subtitle2">
                    {header}
                </Typography>
                <Typography variant="body2" component="div">
                    {children}
                </Typography>
            </Box>
        </Box>
    );
}

export default HelpCard;
