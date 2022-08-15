import React from "react";
import useFeatureEnabled from "./useFeatureEnabled";

const FeatureToggle = ({feature, children}) => {
    const featureEnabled = useFeatureEnabled(feature);

    if (featureEnabled) {
        return <>{children}</>;
    }
    return <React.Fragment />;
};

export default FeatureToggle;
