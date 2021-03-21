import {useSelector} from "react-redux";

const useFeatureEnabled = (feature) => {
    const features = useSelector(state => state.features.features);

    return features !== undefined ? features[feature] : false;
};

export default useFeatureEnabled;
