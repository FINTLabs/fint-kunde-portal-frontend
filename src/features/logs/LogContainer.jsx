import React from "react";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import {Box, Input, Typography} from "@material-ui/core";
import {withContext} from "../../data/context/withContext";
import ComponentSelector from "../../common/test/ComponentSelector";
import ComponentApi from "../../data/api/ComponentApi";
import IconButton from "@material-ui/core/IconButton";
import LoadingProgress from "../../common/status/LoadingProgress";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import ClearIcon from '@material-ui/icons/Clear';
import EntityApi from "../../data/api/EntityApi";
import ResourceSelector from "../../common/test/ResourceSelector";
import Button from "@material-ui/core/Button";

class LogContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            log: [],
            searchString: '',
            searchIDString: '',
            loading: false,
            components: [],
            resources: [],
            component: '',
            resource: '',
            action: 'GET_ALL_',
            environment: 'api',
            timeInterval: 5,
        };
    }

    onChangeIDSearch = event => {
        this.setState({
            searchIDString: event.target.value
        });
    };

    getOrganisationComponents = organisationName => {
        ComponentApi.getOrganisationComponents(organisationName).then(
            ([response, json]) => {
                if (response.status === 200) {
                    this.setState({components: json.sort()});
                }
            }
        );
    };

    getResources() {
        EntityApi.getEntities().then(
            ([response, json]) => {
                if (response.status === 200) {
                    this.setState({resources: json.sort()});
                }
            }
        );
    }

    componentDidMount() {
        const {currentOrganisation} = this.props.context;
        //this.props.fetchClients(currentOrganisation.name);
        this.getOrganisationComponents(currentOrganisation.name);
        this.getResources();
    }

    onChangeComponent = event => {
        this.setState({
            component: event.target.value
        });
    };
    onChangeResource = event => {
        this.setState({
            resource: event.target.value
        });
    };

    onChangeAction = event => {
        this.setState({
            action: event.target.value
        })
    }

    onChangeEnvironment = (event) => {
        this.setState({environment: event.target.value})
    }

    getSelectedComponent = () => {
        return this.state.component.substring(1).replace("/", "-")
    }

    getOrgId = () => {
        return this.props.context.currentOrganisation.name.replace('_', '.');
    }

    getAction = () => {
        return `${this.state.action}${this.state.resource}`.toLocaleUpperCase();
    }
    setTimeInterval = (event, newValue) => {
        this.setState({timeInterval: newValue});
    }

    onClearComponent = () => this.setState({component: ''});
    onClearResource = () => this.setState({resource: ''});
    onClearSearchIDString = () => this.setState({searchIDString: ''});

    searchLog = () => {
        this.setState({
            loading: true
        });
        LogApi.fetchLog(this.state.environment, this.getOrgId(), this.getSelectedComponent() && `${this.getSelectedComponent()}/${this.getAction()}`)
            .then(response => {
                this.setState({
                    log: response[1],
                    loading: false
                })
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                <Typography variant="h5">
                    Søk i hendelseslogg
                </Typography>
                <Box width={3 / 4}>
                    <Box m={2} display='flex' alignItems='flex-end'>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Miljø</FormLabel>
                            <RadioGroup row aria-label="action" name="action" value={this.state.environment}
                                        onChange={this.onChangeEnvironment}>
                                <FormControlLabel value="api" control={<Radio/>}
                                                  label="API"/>
                                <FormControlLabel value="beta" control={<Radio/>} label="BETA"/>
                                <FormControlLabel value="alpha" control={<Radio/>}
                                                  label="ALPHA"/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <ComponentSelector
                        components={this.state.components}
                        handleChange={this.onChangeComponent}
                        value={this.state.component}
                        name='component'
                        required={false}
                        onClear={this.state.component && this.onClearComponent}
                    />
                    <Box width={1} mt={1}>
                        <ResourceSelector
                            resources={this.state.resources}
                            handleChange={this.onChangeResource}
                            value={this.state.resource}
                            name={'resource'}
                            required={false}
                            onClear={this.state.resource && this.onClearResource}
                            component={this.state.component}
                        >
                        </ResourceSelector>
                    </Box>
                    <Box m={2} display='flex' flexDirection='column' alignItems='flex-start'>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Action</FormLabel>
                            <RadioGroup row aria-label="action" name="action" value={this.state.action}
                                        onChange={this.onChangeAction}>
                                <FormControlLabel value="GET_ALL_" control={<Radio/>}
                                                  label="GET_ALL"/>
                                <FormControlLabel value="GET_" control={<Radio/>} label="GET"/>
                                <FormControlLabel value="UPDATE_" control={<Radio/>}
                                                  label="UPDATE"/>
                            </RadioGroup>
                        </FormControl>

                        <Box width={1} mt={1}>
                            <Input
                                fullWidth
                                value={this.state.searchIDString}
                                placeholder="Filtrer på ID - Ved blank vises alle"
                                onChange={this.onChangeIDSearch}
                                endAdornment={
                                    <>
                                        {(
                                            <IconButton
                                                aria-label="clear"
                                                disabled={this.state.searchIDString.length < 1}
                                                onClick={this.onClearSearchIDString}
                                            >
                                                <ClearIcon fontSize='small'/>
                                            </IconButton>)
                                        }
                                    </>
                                }
                            />
                        </Box>
                    </Box>
                </Box>
                <Box m={1}><Button onClick={this.searchLog} disabled={this.state.component.length < 1} color={"primary"}
                                   variant={"contained"}>
                    Søk
                </Button></Box>
                <Box m={1} minWidth={3 / 4}>
                    {
                        this.state.loading ?
                            <LoadingProgress/> :
                            <LogList log={this.state.log} environment={this.state.environment} orgName={this.getOrgId()}
                                     onClear={() => this.setState({log: []})} id={this.state.searchIDString}/>
                    }
                </Box>
            </Box>
        );
    }
}

export default withContext(LogContainer);
