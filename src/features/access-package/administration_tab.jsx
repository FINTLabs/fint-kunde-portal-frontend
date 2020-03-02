import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ComponentListItem from "./component_list_item";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import CollectionIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {Box, Checkbox, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import capitalize from "@material-ui/core/utils/capitalize";
import {array} from "prop-types";
import {WifiRounded} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
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
        display:"flex",
    }
}));

const AdministrationTab = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });
    const [items, setItemState] = React.useState(
        [
            {checked: false, selected: false, primary: "administrativenhet", secondary: "/administrasjon/arkiv/administrativenhet"},
            {checked: false, selected: false, primary: "administrativenhet", secondary: "/administrasjon/arkiv/administrativenhet"},
            {checked: false, selected: false, primary: "arkivressurs", secondary: "/administrasjon/arkiv/arkivressurs"},
            {checked: false, selected: false, primary: "autorisasjon", secondary: "/administrasjon/arkiv/autorisasjon"},
            {checked: false, selected: false, primary: "dokumentfil", secondary: "/administrasjon/arkiv/dokumentfil"},
            {checked: false, selected: false, primary: "dokumentstatus", secondary: "/administrasjon/arkiv/dokumentstatus"},
            {checked: false, selected: false, primary: "dokumenttype", secondary: "/administrasjon/arkiv/dokumenttype"},
            {checked: false, selected: false, primary: "journalposttype", secondary: "/administrasjon/arkiv/journalposttype"},
            {checked: false, selected: false, primary: "journalstatus", secondary: "/administrasjon/arkiv/journalstatus"},
            {checked: false, selected: false, primary: "klasse", secondary: "/administrasjon/arkiv/klasse"},
            {checked: false, selected: false, primary: "klassifikasjonssystem", secondary: "/administrasjon/arkiv/klassifikasjonssystem"},
            {checked: false, selected: false, primary: "korrespondansepart", secondary: "/administrasjon/arkiv/korrespondansepart"},
            {checked: false, selected: false, primary: "korrespondanseparttype", secondary: "/administrasjon/arkiv/korrespondanseparttype"},
            {checked: false, selected: false, primary: "merknadstype", secondary: "/administrasjon/arkiv/merknadstype"},
            {checked: false, selected: false, primary: "partrolle", secondary: "/administrasjon/arkiv/partrolle"},
            {checked: false, selected: false, primary: "rolle", secondary: "/administrasjon/arkiv/rolle"},
            {checked: false, selected: false, primary: "sak", secondary: "/administrasjon/arkiv/sak"},
            {checked: false, selected: false, primary: "saksstatus", secondary: "/administrasjon/arkiv/saksstatus"},
            {checked: false, selected: false, primary: "skjermingshjemmel", secondary: "/administrasjon/arkiv/skjermingshjemmel"},
            {checked: false, selected: false, primary: "tilgang", secondary: "/administrasjon/arkiv/tilgang"},
            {checked: false, selected: false, primary: "tilgangsrestriksjon", secondary: "/administrasjon/arkiv/tilgangsrestriksjon"},
            {checked: false, selected: false, primary: "tilknyttetregistreringsom", secondary: "/administrasjon/arkiv/tilknyttetregistreringsom"},
            {checked: false, selected: false, primary: "variantformat", secondary: "/administrasjon/arkiv/variantformat"}
        ]
    );
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        const newArray = items.slice(0, items.length);
        items.forEach((item, index )=> {
            newArray[index].selected = items[index].checked;
        });
        setItemState(newArray);
    };
    const handleComponentSelected = (index) => {
        const newArray = items.slice(0, items.length);
        newArray[index].checked = !items[index].checked;
        setItemState(newArray);
    };
    const removeItem = (primary) =>{
        console.log("REMOVE ", primary);
        const newArray = items.slice(0, items.length);
        newArray.map(item =>{
            if (capitalize(item.primary) === primary){
                item.checked = false;
                item.selected = false;
            }
        })
        setItemState(newArray);
    }

    const handleChange = name => event => {
        setState({...state, [name]: event.target.checked});
    };
    const [secondaryTabValue, setSecondaryTabValue] = React.useState(0);

    const handleSecondaryTabChange = (event, newValue) => {
        setSecondaryTabValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    return (
        <div>
            <AppBar position="static">
                <Tabs value={secondaryTabValue} onChange={handleSecondaryTabChange} aria-label="simple tabs example">
                    <Tab className={classes.individualTab} label="Arkiv" {...a11yProps(0)} />
                    <Tab label="Fullmakt" {...a11yProps(1)} />
                    <Tab label="Kodeverk" {...a11yProps(2)} />
                    <Tab label="Organisasjon" {...a11yProps(3)} />
                    <Tab label="Personal" {...a11yProps(4)} />
                    <Tab label="Økonomi" {...a11yProps(5)} />

                </Tabs>
            </AppBar>
            <TabPanel value={secondaryTabValue} index={0}>
                <div className={classes.tabPanel}>

                    <Fab className={classes.fab} variant="extended" onClick={handleClickOpen}>
                        <AddIcon/>
                        Legg til
                    </Fab>

                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Velg rettigheter
                            </ListSubheader>
                        }
                        className={classes.root}
                        dense={true}
                    >
                        {items.map(item => {
                            if (item.selected) {
                                return <ComponentListItem onClick={removeItem} primary={capitalize(item.primary)} secondary={item.secondary}/>
                            }
                        })}
                    </List>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Velg tilganger"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <List component="nav">
                                {items.map((item, index) => {
                                    return <div className={classes.fabListItem}>
                                        <ListItem>{capitalize(item.primary)}</ListItem>
                                        <Checkbox checked={item.checked} onChange={() => handleComponentSelected(index)}/>
                                    </div>
                                })}
                            </List>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Velg
                        </Button>
                    </DialogActions>
                </Dialog>
            </TabPanel>
            <TabPanel value={secondaryTabValue} index={1}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Velg rettigheter
                        </ListSubheader>
                    }
                    className={classes.root}
                >

                    <ListItem>
                        <ListItemText primary="Utdanning Elev" secondary="/utdanning/elev"/>
                        <Switch
                            checked={state.checkedB}
                            onChange={handleChange('checkedB')}
                            value="checkedB"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                    </ListItem>
                    <Collapse in={state.checkedB} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <CollectionIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Bulk"/>
                                <Checkbox/>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <CollectionIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Modify"/>
                                <Checkbox/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </TabPanel>
            <TabPanel value={secondaryTabValue} index={2}>

            </TabPanel>
        </div>
    );
};

export default AdministrationTab;