import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {Checkbox, TableRow, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    cell: {
        paddingTop: 0,
        paddingBottom: 0,
    }
}));
const SelectAllEntitiesCheckboxes = (props) => {
    const {checkAll, selectedAccessPackage} = props;
    const classes = useStyles();


    if (selectedAccessPackage.components.length > 0) {
        return (
            <TableRow>
                <TableCell colSpan={2} align="right" className={classes.cell}>
                    <Typography variant="subtitle2">Velg alle</Typography>
                </TableCell>
                <TableCell
                    align="center"
                    className={classes.cell}
                >
                    <Checkbox
                        name="checkAllCollection"
                        size="small"
                        onChange={(e) => checkAll(e, "collection")}
                    />
                </TableCell>
                <TableCell
                    align="center"
                    className={classes.cell}
                >
                    <Checkbox
                        name="checkAllRead"
                        size="small"
                        onChange={(e) => checkAll(e, "read")}
                    />
                </TableCell>
                <TableCell
                    align="center"
                    className={classes.cell}
                >
                    <Checkbox
                        name="checkAllModify"
                        size="small"
                        onChange={(e) => checkAll(e, "modify")}
                    />
                </TableCell>
            </TableRow>
        );
    } else {
        return null;
    }
};

export default SelectAllEntitiesCheckboxes;
