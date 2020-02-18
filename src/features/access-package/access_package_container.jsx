import React from 'react';
import {Box, makeStyles} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AdministrationTab from "./administration_tab";
import EducationTab from "./education_tab";
import OtherTab from "./other_tab";

const useStyles = makeStyles(theme => ({
    root: {
        color: "white",
        flexGrow: 1,
        display: 'flex',
        minHeight: 800,
    },
    tabs: {
        borderRight: `1px solid`,
        alignSelf: "center",
    },
    individualTab: {
        backgroundColor: "#b71c1c",
    }
}));

const AccessPackageContainer = () => {
    const classes = useStyles();
    const [mainTabValue, setMainTabValue] = React.useState(0);


    const handleMainTabChange = (event, newValue) => {
        setMainTabValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={mainTabValue}
                onChange={handleMainTabChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab className={classes.individualTab} label="Administrasjon" {...a11yProps(0)} />
                <Tab className={classes.individualTab} label="Utdanning" {...a11yProps(1)} />
                <Tab className={classes.individualTab} label="Andre" {...a11yProps(2)} />
            </Tabs>


            <TabPanel value={mainTabValue} index={0}>
                <AdministrationTab/>
            </TabPanel>
            <TabPanel value={mainTabValue} index={1}>
                <EducationTab/>
            </TabPanel>
            <TabPanel value={mainTabValue} index={2}>
                <OtherTab/>
            </TabPanel>

        </div>
    );
};

export default AccessPackageContainer;