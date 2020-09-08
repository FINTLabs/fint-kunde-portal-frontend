import React from "react";
import LogApi from "../../data/api/LogApi";
import LogList from "./LogList";
import {Box, Input, Typography} from "@material-ui/core";
import {withContext} from "../../data/context/withContext";
import Search from "@material-ui/icons/Search";
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

class LogContainer extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            log: [],
            searchString: '',
            loading: false,
            components: [],
            component: '',
            action: 'GET_ALL_',
            environment: 'api'
        };
    }

    onChangeSearch = event => {
        this.setState({
            searchString: event.target.value
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

    componentDidMount() {
        const {currentOrganisation} = this.props.context;
        //this.props.fetchClients(currentOrganisation.name);
        this.getOrganisationComponents(currentOrganisation.name);
    }

    onChangeComponent = event => {
        this.setState({
            component: event.target.value
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
        return `${this.state.action}${this.state.searchString}`.toLocaleUpperCase();
    }

    onClearComponent = () => this.setState({component: ''});
    onClearSearchString = () => this.setState({searchString: ''});

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
                        <Box width={1}>
                            <Input
                                autoFocus
                                fullWidth
                                value={this.state.searchString}
                                placeholder="Skriv inn navnet på ressursen"
                                onChange={this.onChangeSearch}
                                onKeyUp={this.onSearch}
                                endAdornment={
                                    <>
                                        <IconButton
                                            aria-label="search"
                                            onClick={this.state.component ? this.searchLog: ()=>{}}
                                        >
                                            <Search/>
                                        </IconButton>
                                        {this.state.searchString.length > 0 && (
                                            <IconButton
                                                aria-label="clear"
                                                onClick={this.onClearSearchString}
                                            >
                                                <ClearIcon fontSize='small'/>
                                            </IconButton>)
                                        }
                                    </>
                                }
                            />
                        </Box>
                    </Box>
                    <Box m={1}>
                        {
                            this.state.loading ?
                                <LoadingProgress/> :
                                <LogList log={this.state.log} environment={this.state.environment} orgName={this.getOrgId()} onClear={() => this.setState({log: []})}/>

                        }
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default withContext(LogContainer);
