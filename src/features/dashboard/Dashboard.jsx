import React, {useContext, useEffect, useState} from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";
import FeatureHelperText from "../../common/help/FeatureHelperText";
import {createStyles} from "@material-ui/core/styles";
import AppContext from "../../data/context/AppContext";
import HealthDashboardApi from "../../data/api/HealthDashboardApi";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(3),
            width: "100%",
            height: "100%"
        },
        cardContent: {
            textAlign: "center"
        },
        cardLink: {
            textDecoration: "none"
        },
        cardHeader: {},
        avatar: {
            margin: 10,
            color: "#fff",
            backgroundColor: theme.palette.secondary.light
        },
        healthy: {
            color: theme.palette.success
        }


    }));

const Dashboard = () => {
    const classes = useStyles();
    const orgId = useContext(AppContext).currentOrganisation.name.replace("_", ".");
    const [health, setHealth] = useState();

    useEffect(() => {
        HealthDashboardApi.getHealthDashboardData(orgId)
            .then(response => {
                if (response.status === 200) {
                    setHealth(response.data);
                }
            });
    });

    const isHealthy = (component) => {
        return component.health.filter(health => health.status === "APPLICATION_HEALTHY").length === 1;
    }

    const getAdapterName = (component) => {
        if (component.clients.length > 0) {
            return component.clients[0].client;
        }
        return "";
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={10}>
                <Grid item xs={12}>
                    <FeatureHelperText>
                        <p>
                            FINT kundeportal skal benyttes av fylkeskommuner og andre
                            organisasjoner som benytter FINT til å gi tilgang til egne
                            data.
                        </p>
                        <p>
                            Kundeportalen skal gi personer som har fått tildelt roller i
                            en organisasjon mulighet for å administrere tilgangsstyring
                            til data.
                        </p>
                    </FeatureHelperText>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {health && health.components.map(component => (
                    <Grid item xs={4}>
                        <Card key={component.id} variant="outlined">


                            <CardHeader title={component.id} subheader={getAdapterName(component)}/>

                            <CardContent>
                                <Box display="flex">
                                    <Box height="48px" width="48px" borderRadius="50%"
                                         bgcolor={isHealthy(component) ? "green" : "red"}/>
                                    <Box display="flex" flexDirection="column">
                                        <Typography>
                                            {'Sist oppdatert:'}
                                        </Typography>
                                        <Typography>
                                            {new Date(component.lastUpdated).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Se mer</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );

};

Dashboard.propTypes = {};


export default Dashboard;
