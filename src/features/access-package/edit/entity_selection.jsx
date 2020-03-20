import React from 'react';
import ModifyIcon from "@material-ui/icons/Build";
import BulkIcon from "@material-ui/icons/FormatListBulleted";
import SingleIcon from "@material-ui/icons/LooksOne";
import {Checkbox, Paper, TableBody, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    tabPanel: {
        display: "flex",
        flexDirection: "row",
    },
    fab: {
        margin: "16px",
    },
    fabListItem: {
        display: "flex",
    },
    table: {
    },
    tableRow: {
        '&:nth-of-type(even)': {
            backgroundColor: "#fef3ef",
        },
    },
    icon: {
        margin: theme.spacing(1),
        verticalAlign: "middle",
    },
    header: {
      marginTop: theme.spacing(4),
    },
}));

const EntitySelection = (props) => {
    const classes = useStyles();
    const {selectedAccessPackage} = props;
    const entities = useSelector(state => state.entity.entities);

    function showEntity(entity, component) {
        let isSelected = false;
            if (component.checked && entity.stereotype === 'hovedklasse' && entity.abstrakt === false) {
                const componentStringForMatch = "no.fint" + component.basePath.replace(/\//g, ".");
                const entityIdForMatch = entity.id.identifikatorverdi.substring(0, entity.id.identifikatorverdi.lastIndexOf("."));

                if (entityIdForMatch === componentStringForMatch) {
                    isSelected = true;
                }
            }
        return isSelected;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.header}>Legg til og velg tilganger</Typography>

            <TableContainer component={Paper} hidden={selectedAccessPackage.selectedComponents.length === 0}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Komponent</TableCell>
                            <TableCell align="right">Entitet</TableCell>
                            <TableCell align="right">Bulk <BulkIcon className={classes.icon}/></TableCell>
                            <TableCell align="right">Single<SingleIcon className={classes.icon}/></TableCell>
                            <TableCell align="right">Endre<ModifyIcon className={classes.icon}/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedAccessPackage.selectedComponents.map(component => {
                            return entities.map(entity => {
                                if (showEntity(entity, component)) {
                                    return (<TableRow className={classes.tableRow}>
                                        <TableCell>{component.description}</TableCell>
                                        <TableCell align="right">{entity.navn}</TableCell>
                                        <TableCell align="right"><Checkbox/></TableCell>
                                        <TableCell align="right"><Checkbox/></TableCell>
                                        <TableCell align="right"><Checkbox/></TableCell>
                                    </TableRow>)
                                }
                            })

                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EntitySelection;