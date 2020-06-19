import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {TableRow} from "@material-ui/core";
import ModifyIcon from "@material-ui/icons/Build";
import BulkIcon from "@material-ui/icons/FormatListBulleted";
import SingleIcon from "@material-ui/icons/LooksOne";

const TableHeader = (props) => {
    const {classes} = props;
    return (
        <TableRow key={"headerRow"}>
            <TableCell>Komponent</TableCell>
            <TableCell align="right">Entitet</TableCell>
            <TableCell align="right">Bulk <BulkIcon className={classes.icon}/></TableCell>
            <TableCell align="right">Single<SingleIcon className={classes.icon}/></TableCell>
            <TableCell align="right">Endre<ModifyIcon className={classes.icon}/></TableCell>
        </TableRow>
    );
};

export default TableHeader;