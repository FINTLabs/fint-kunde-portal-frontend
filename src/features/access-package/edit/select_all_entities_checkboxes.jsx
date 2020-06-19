import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {Checkbox, TableRow} from "@material-ui/core";

const SelectAllEntitiesCheckboxes = (props) => {
    const {classes, checkAll} = props;
    return (
        <TableRow className={classes.chooseAllRow}>
            <TableCell colSpan={2} align="right">
                Velg alle
            </TableCell>
            <TableCell
                align="right"
            >
                <Checkbox
                    name="checkAllCollection"
                    onChange={(e) => checkAll(e, "collection")}
                />
            </TableCell>
            <TableCell
                align="right"
            >
                <Checkbox
                    name="checkAllRead"
                    onChange={(e) => checkAll(e, "read")}
                />
            </TableCell>
            <TableCell
                align="right"
            >
                <Checkbox
                    name="checkAllModify"
                    onChange={(e) => checkAll(e, "modify")}
                />
            </TableCell>
        </TableRow>
    );
};

export default SelectAllEntitiesCheckboxes;