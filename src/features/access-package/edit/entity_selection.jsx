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
    const {selectedAccessPackage, selectedComponents} = props;
    const [accesses, setAccesses] = useState([false]);
    const dispatch = useDispatch();
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const componentConfiguration = useSelector(state => state.component_configuration.componentConfiguration);

    console.log("selectedAccessPackage: ", selectedAccessPackage);

    function updateAccesses(event, entity, component, selectedAccessPackage) {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = newAccessPackages.map((ap, index) => {
            if (ap.dn === selectedAccessPackage.dn) {
                return index;
            }
        });
        console.log(accessPackageIndex);

        switch (event.target.name) {
            case "collection":
                if (newAccessPackage.collection.includes(component.path + entity)) {
                    for (let i = 0; i < newAccessPackage.collection.length; i++) {
                        if (newAccessPackage.collection[i] === component.path + entity) {
                            newAccessPackage.collection.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.collection.push(component.path + entity);
                }
                break;
            case "read":
                if (newAccessPackage.read.includes(component.path + entity)) {
                    for (let i = 0; i < newAccessPackage.read.length; i++) {
                        if (newAccessPackage.read[i] === component.path + entity) {
                            newAccessPackage.read.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.read.push(component.path + entity);
                }
                break;
            case "modify":
                if (newAccessPackage.modify.includes(component.path + entity)) {
                    for (let i = 0; i < newAccessPackage.modify.length; i++) {
                        if (newAccessPackage.modify[i] === component.path + entity) {
                            newAccessPackage.modify.splice(i, 1);
                        }
                    }
                } else {
                    newAccessPackage.modify.push(component.path + entity);
                }
                break;
            default:
                console.log("nothing to add");
        }
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    const keys = Object.keys(selectedComponents);

    if (keys.length > 0) {
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
                            {
                                keys.map(key => {
                                        if (selectedComponents[key]) {
                                            let displayComponent = null;
                                            componentConfiguration.forEach(component => {
                                                if (component.name === key) {
                                                    displayComponent = component;
                                                }
                                            });

                                            return displayComponent.classes.map(entity => {

                                                return (
                                                    <TableRow className={classes.tableRow} key={entity}>

                                                        <TableCell>{key}</TableCell>
                                                        <TableCell align="right">{entity}</TableCell>
                                                        <TableCell align="right">
                                                            <Checkbox
                                                                name="collection"
                                                                checked={selectedAccessPackage.collection.includes(displayComponent.path + entity)}
                                                                onChange={(event) => updateAccesses(event, entity, displayComponent, selectedAccessPackage)}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Checkbox
                                                                name="read"
                                                                checked={selectedAccessPackage.read.includes(displayComponent.path + entity)}
                                                                onChange={(event) => updateAccesses(event, entity, displayComponent, selectedAccessPackage)}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Checkbox
                                                                name="modify"
                                                                checked={selectedAccessPackage.modify.includes(displayComponent.path + entity)}
                                                                onChange={(event) => updateAccesses(event, entity, displayComponent, selectedAccessPackage)}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })

                                        } else return null;
                                    }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    } else return (<div/>)
};

export default EntitySelection;