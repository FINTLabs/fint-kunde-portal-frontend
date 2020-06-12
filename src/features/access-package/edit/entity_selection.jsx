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
    const dispatch = useDispatch();
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);

    function findIndex(array, value) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i].dn === value.dn) {
                return i;
            }
        }
        return -1;
    }

    function updateAccesses(event, path) {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = findIndex(newAccessPackages, newAccessPackage);

        switch (event.target.name) {
            case "collection":
                if (newAccessPackage.collection.includes(path)) {
                    for (let i = 0; i < newAccessPackage.collection.length; i++) {
                        if (newAccessPackage.collection[i] === path) {
                            newAccessPackage.collection.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.collection.push(path);
                }
                break;
            case "read":
                if (newAccessPackage.read.includes(path)) {
                    for (let i = 0; i < newAccessPackage.read.length; i++) {
                        if (newAccessPackage.read[i] === path) {
                            newAccessPackage.read.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.read.push(path);
                }
                break;
            case "modify":
                if (newAccessPackage.modify.includes(path)) {
                    for (let i = 0; i < newAccessPackage.modify.length; i++) {
                        if (newAccessPackage.modify[i] === path) {
                            newAccessPackage.modify.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.modify.push(path);
                }
                break;
            default:
                console.log("nothing to add");
        }
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.header}>Legg til og velg tilganger</Typography>

            <TableContainer component={Paper}>
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
                        {componentConfiguration.map(component => {
                            if (selectedAccessPackage.components.includes(component.dn)) {
                                return component.classes.map(entity => {
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
                                    )
                                })
                            }else {return <></>}
                        })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EntitySelection;