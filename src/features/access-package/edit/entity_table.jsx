import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {Checkbox, TableRow} from "@material-ui/core";

const EntityTable = (props) => {
    const {classes, entity, component, selectedAccessPackage, updateAccesses} = props;
    return (
        <TableRow className={classes.tableRow} key={entity.path}>
            <TableCell>{component.displayName}</TableCell>
            <TableCell align="right">{entity.name}</TableCell>
            <TableCell align="right">
                <Checkbox
                    name="collection"
                    checked={selectedAccessPackage.collection.includes(entity.path)}
                    onChange={(event) => updateAccesses(event, entity.path)}
                />
            </TableCell>
            <TableCell align="right">
                <Checkbox
                    name="read"
                    checked={selectedAccessPackage.read.includes(entity.path)}
                    onChange={(event) => updateAccesses(event, entity.path)}
                />
            </TableCell>
            <TableCell align="right">
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