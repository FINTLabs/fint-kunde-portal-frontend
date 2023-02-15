import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import {Drawer, AppBar, Toolbar, Typography, Divider, IconButton, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuItems from "./MenuItems";
import Routes from "../routes/Routes";
import OrganisationSelector from "./OrganisationSelector";
import FintLogo from "../../images/fint-by-vigo-white.svg";

const PREFIX = 'AppMenu';

const classes = {
    appBar: `${PREFIX}-appBar`,
    appBarShift: `${PREFIX}-appBarShift`,
    menuButton: `${PREFIX}-menuButton`,
    hide: `${PREFIX}-hide`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    drawerPaperClose: `${PREFIX}-drawerPaperClose`,
    toolbar: `${PREFIX}-toolbar`,
    content: `${PREFIX}-content`,
    logo: `${PREFIX}-logo`,
    flex: `${PREFIX}-flex`,
    flexName: `${PREFIX}-flexName`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.appBar}`]: {
        zIndex: (theme.zIndex.drawer + 1) + ' !important',
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },

    [`& .${classes.appBarShift}`]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px) !important`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    [`& .${classes.menuButton}`]: {
        marginLeft: 12,
        marginRight: 36
    },

    [`& .${classes.hide}`]: {
        display: "none"
    },

    [`& .${classes.drawerPaper}`]: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },

    [`& .${classes.drawerPaperClose}`]: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },

    [`& .${classes.toolbar}`]: {
        ...theme.mixins.toolbar,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px"
    },

    [`& .${classes.content}`]: {
        width: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: 24,
        minHeight: "100vh",
        marginTop: 56,
        [theme.breakpoints.up("sm")]: {
            height: "calc(100% - 64px)",
            marginTop: 64
        }
    },

    [`& .${classes.logo}`]: {
        width: 86,
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing()
    },

    [`& .${classes.flex}`]: {
        flex: 1
    },

    [`& .${classes.flexName}`]: {
        flex: 1,
        textAlign: "end",
        marginBottom: "2px"
    }
}));

const drawerWidth = 240;

const AppMenu = (props) => {


    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {me} = props;
    return (
        <StyledBox display="flex" position="relative" width={1} height={1}>
            <AppBar
                position="absolute"
                className={classNames(
                    classes.appBar,
                    open && classes.appBarShift
                )}
            >
                <Toolbar disableGutters={!open} id={"toolbar"}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={classNames(
                            classes.menuButton,
                            open && classes.hide
                        )}
                        id={"menuBurger"}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <img src={FintLogo} alt="logo" className={classes.logo }/>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.flex}
                    >
                        Kundeportal
                    </Typography>
                    <Typography
                        variant={"subtitle1"}
                        color="inherit"
                        noWrap
                        className={classes.flexName}
                        id={"userNameField"}
                    >
                        {me.firstName + " " + me.lastName + "  |"}
                    </Typography>
                    <OrganisationSelector/>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    )
                }}
                open={open}
                id={"menuToolbar"}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                <Routes/>
            </main>
        </StyledBox>
    );
}

export default AppMenu;
