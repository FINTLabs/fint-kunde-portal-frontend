import React from 'react';
import { TableCell, TableRow, Tooltip } from '@mui/material';

import ModifyIcon from "@mui/icons-material/Edit";
import BulkIcon from "@mui/icons-material/FormatListBulleted";
import SingleIcon from "@mui/icons-material/LooksOne";

const TableHeader = (props) => {
    const {classes, selectedAccessPackage} = props;

    if (selectedAccessPackage.components.length > 0) {
        return (
            <TableRow key={"headerRow"}>
                <TableCell>Komponent</TableCell>
                <TableCell align="right">Entitet</TableCell>
                <Tooltip placement={"top"} title={"Skal klienten kunne utføre enkeltoppslag"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="center">Enkeltoppslag<SingleIcon className={classes.icon}/></TableCell>
                </Tooltip>
                <Tooltip placement={"top"} title={"Skal klienten kunne utføre masseoppslag"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="center">Masseoppslag<BulkIcon className={classes.icon}/></TableCell>
                </Tooltip>
                <Tooltip placement={"top"} title={"Har klienten skriverettigheter (opprette, endre og slette)"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="center">Skriverettighet<ModifyIcon className={classes.icon}/></TableCell>
                </Tooltip>
            </TableRow>
        );
    } else {
        return null;
    }
};

export default TableHeader;
