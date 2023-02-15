import React from "react";
import TableCell from "@mui/material/TableCell";
import {Checkbox, TableRow} from "@mui/material";

const EntityTable = (props) => {
    const {classes, entity, component, selectedAccessPackage, updateAccesses} = props;
    return (
        <TableRow className={classes.tableRow} key={entity.path}>
            <TableCell>{component.displayName}</TableCell>
            <TableCell align="right">{entity.name}</TableCell>
            <TableCell align="center">
                <Checkbox
                    name="read"
                    checked={selectedAccessPackage.read.includes(entity.path)}
                    onChange={(event) => updateAccesses(event, entity.path)}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    name="collection"
                    checked={selectedAccessPackage.collection.includes(entity.path)}
                    onChange={(event) => updateAccesses(event, entity.path)}
                />
            </TableCell>
            <TableCell align="center">
                <Checkbox
                    name="modify"
                    checked={selectedAccessPackage.modify.includes(entity.path)}
                    onChange={(event) => updateAccesses(event, entity.path)}
                 />
            </TableCell>
        </TableRow>
    );
};

export default EntityTable;
