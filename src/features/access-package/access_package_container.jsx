import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import {withContext} from "../../data/context/withContext";
import AccessPackageList from "./access_package_list";
import AccessPackageAdd from "./add/access_packacke_add";

const styles = () => ({
    root: {
    },
});

class AccessPackageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return this.renderAccessPackages();
    }

    renderAccessPackages() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                        <AccessPackageList/>
                <AccessPackageAdd/>
            </div>
        );
    }
}

AccessPackageContainer.propTypes = {};


export default withStyles(styles)(
    connect(
    )(withContext(AccessPackageContainer))
);
