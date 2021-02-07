import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {getFeatures} from "../../data/redux/dispatchers/features";

const FeatureToogle = (props) => {
    const dispatch = useDispatch();
    const features = useSelector((state) => state.feature.features);
    const {feature, children} = props;

    useEffect(() => {
        dispatch(getFeatures());
    }, [dispatch]);

    const isFeatureEnabled = (f) => {
        return features !== undefined ? features[f] : false;
    }


    if (isFeatureEnabled(feature)) {
        return (
            <div>
                {children}
            </div>
        );
    } else {
        return <div/>;
    }
};

FeatureToogle.protoTypes = {
    feature: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default FeatureToogle;
