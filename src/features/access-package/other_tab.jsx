import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Box, Checkbox} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
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
import CollectionIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const OtherTab = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });

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
                    <ComponentListItem primary={"Arbeidsforhold"} secondary={"/administrasjon/person/arbeidsforhold"}/>
                    <ComponentListItem primary={"Fastlønn"} secondary={"/administrasjon/person/fastlonn"}/>
                    <ComponentListItem primary={"Fasttillegg"} secondary={"/administrasjon/person/fasttillegg"}/>
                    <ComponentListItem primary={"Fravær"} secondary={"/administrasjon/person/fravar"}/>
                    <ComponentListItem primary={"Kontaktperson"} secondary={"/administrasjon/person/kontaktperson"}/>
                    <ComponentListItem primary={"Person"} secondary={"/administrasjon/person/person"}/>
                    <ComponentListItem primary={"Personalressurs"} secondary={"/administrasjon/person/personalressurs"}/>
                    <ComponentListItem primary={"Variabellønn"} secondary={"/administrasjon/person/variabellonn"}/>


                </List>
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

export default OtherTab;