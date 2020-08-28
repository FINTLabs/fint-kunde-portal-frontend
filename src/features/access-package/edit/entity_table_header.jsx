import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {TableRow} from "@material-ui/core";
import ModifyIcon from "@material-ui/icons/Build";
import BulkIcon from "@material-ui/icons/FormatListBulleted";
import SingleIcon from "@material-ui/icons/LooksOne";
import Tooltip from "@material-ui/core/Tooltip";

const TableHeader = (props) => {
    const {classes, selectedAccessPackage} = props;

    if (selectedAccessPackage.components.length > 0) {
        return (
            <TableRow key={"headerRow"}>
                <TableCell>Komponent</TableCell>
                <TableCell align="right">Entitet</TableCell>
                <Tooltip placement={"top"} title={"Bestemmer om det er mulig å for klienten å lese flere objekter i liste"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="right">Bulk<BulkIcon className={classes.icon}/></TableCell>
                </Tooltip>
                <Tooltip placement={"top"} title={"Bestemmer om det er mulig for klienten å lese et objekt enkeltvis"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="right">Single<SingleIcon className={classes.icon}/></TableCell>
                </Tooltip>
                <Tooltip placement={"top"} title={"Bestemmer om det er mulig for klienten å endre et objekt"}
                         classes={{tooltip: classes.customWidth}}>
                    <TableCell align="right">Endre<ModifyIcon className={classes.icon}/></TableCell>
                </Tooltip>
            </TableRow>
        );
    } else {
        return null;
    }
};

export default TableHeader;