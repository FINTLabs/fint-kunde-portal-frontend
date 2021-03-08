import React, {useState} from "react";
import {createStyles} from "@material-ui/core/styles";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuItems from "./MenuItems";
import Routes from "../routes/Routes";
import OrganisationSelector from "./OrganisationSelector";
import {makeStyles, useTheme} from "@material-ui/core";
import FintLogo from "../../images/fint-by-vigo-white.svg";

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: "100%",
            zIndex: 1,
            overflow: "hidden",
            position: "relative",
            display: "flex"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        appFrame: {
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%"
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36
        },
        hide: {
            display: "none"
        },
        drawerPaper: {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerPaperClose: {
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
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        content: {
            width: "100%",
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: 24,
            height: "calc(100% - 56px)",
            marginTop: 56,
            [theme.breakpoints.up("sm")]: {
                height: "calc(100% - 64px)",
                marginTop: 64
            }
        },
        logo: {
            //height: "8%",
            width: 86,
            marginRight: theme.spacing(4),
            marginBottom: theme.spacing()
        },
        flex: {
            flex: 1
        },
        flexName: {
            flex: 1,
            textAlign: "end",
            marginBottom: "2px"
        },
    }));

const AppMenu = (props) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const {me} = props;
    return (
        <div className={classes.appFrame}>
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
                    <img src={FintLogo} alt="logo" className={classes.logo}/>
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
                    <IconButton onClick={handleDrawerClose} >
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon/>
                        ) : (
                            <ChevronLeftIcon/>
                        )}
                    </IconButton>
                </div>
                <Divider/>
                    <MenuItems/>
            </Drawer>
            <main className={classes.content}>
                <Routes/>
            </main>
        </div>
    );
}

export default AppMenu;
