import React, {useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";

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
    table: {},
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
    const [accesses, setAccesses] = useState([false]);
    const dispatch = useDispatch();
    const accessPackages =  useSelector(state => state.access_package.accessPackages);

    function updateAccesses(event, dn, id) {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};

        newAccessPackage.selectedComponents.map(component => {
            if (component.dn === dn) {
                component.entities.map(entity => {
                    if (entity.id.identifikatorverdi === id) {
                        switch (event.target.name) {
                            case "bulk": entity.bulk = event.target.checked; break;
                            case "single": entity.single = event.target.checked; break;
                            case "modify": entity.modify = event.target.checked; break;
                        }
                    }
                })
            }
            newAccessPackages.accessPackages = newAccessPackage;
            return null;
        });
            dispatch(updateAccessPackages(newAccessPackages));
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
                        {selectedAccessPackage.selectedComponents.map(entry => {
                                if (entry.checked) {
                                    return entry.entities.map(entity => {
                                        return (<TableRow className={classes.tableRow} key={entity.id.identifikatorverdi}>
                                            <TableCell>{entry.description}</TableCell>
                                            <TableCell align="right">{entity.navn}</TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    name="bulk"
                                                    checked={entity.bulk}
                                                    onChange={(event) => updateAccesses(event, entry.dn, entity.id.identifikatorverdi)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    name="single"
                                                    checked={entity.single}
                                                    onChange={(event) => updateAccesses(event, entry.dn, entity.id.identifikatorverdi)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    name="modify"
                                                    checked={entity.modify}
                                                    onChange={(event) => updateAccesses(event, entry.dn, entity.id.identifikatorverdi)}
                                                />
                                            </TableCell>
                                        </TableRow>)
                                    });
                                } else return null;
                            }
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EntitySelection;