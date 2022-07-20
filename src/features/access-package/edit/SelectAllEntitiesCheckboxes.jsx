import React from 'react';
import { styled } from '@mui/material/styles';
import {Checkbox, TableRow, Typography, TableCell} from "@mui/material";
const PREFIX = 'SelectAllEntitiesCheckboxes';

const classes = {
    cell: `${PREFIX}-cell`
};

const StyledTableRow = styled(TableRow)((
    {
        theme
    }
) => ({
    [`& .${classes.cell}`]: {
        paddingTop: 0,
        paddingBottom: 0,
    }
}));

const SelectAllEntitiesCheckboxes = (props) => {
    const {checkAll, selectedAccessPackage} = props;



    if (selectedAccessPackage.components.length > 0) {
        return (
            <StyledTableRow>
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
            </StyledTableRow>
        );
    } else {
        return null;
    }
};

export default SelectAllEntitiesCheckboxes;
