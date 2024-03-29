import React, {useState} from "react";
import { styled } from "@mui/material/styles";
import { DialogTitle, DialogContent, List, ListItem, ListItemText, Avatar, DialogActions, ListItemAvatar, Dialog, Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import LockIcon from "@mui/icons-material/LockOpen";
import WarningMessageBox from "../../../common/message-box/WarningMessageBox";
import {updateAccessPackages} from "../../../data/redux/actions/access_package";

const PREFIX = 'TemplateContainerDialog';

const classes = {
    listItem: `${PREFIX}-listItem`,
    itemAvatar: `${PREFIX}-itemAvatar`
};

const StyledDialog = styled(Dialog)((
    {
        theme
    }
) => ({
    [`& .${classes.listItem}`]: {
        borderBottom: "1px dashed lightgray",
        '&:first-of-type': {
            borderTop: "1px dashed lightgray"
        },
        padding: theme.spacing(),
    },

    [`& .${classes.itemAvatar}`]: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    }
}));

const TemplateContainerDialog = (props) => {
    const {templateSelectorOpen, handleTemplateSelectorOpen, selectedAccessPackage} = props;
    const templates = useSelector(state => state.access_package_template.templates);
    const [showWarning, setShowWarning] = useState(false);
    const [pickedTemplate, setPickedTemplate] = useState(null);
    const accessPackages = useSelector(state => state.access_package.accessPackages);
    const warningMessageText = "Bekreft valget. Oppsettet på denne tilgangspakken vil endres til malen: " + pickedTemplate;
    const dispatch = useDispatch();


    function handlePickingTemplate(templateName) {
        setShowWarning(true);
        setPickedTemplate(templateName);
    }

    function handleUpdateAccessPackage() {
        let newAccessPackages = [...accessPackages];
        let newAccessPackage = {...selectedAccessPackage};
        const accessPackageIndex = newAccessPackages.indexOf(newAccessPackages.filter(ap => ap.dn === newAccessPackage.dn)[0]);
        const template = templates.filter(template => template.name === pickedTemplate)[0];

        newAccessPackage.collection = template.collection;
        newAccessPackage.components = template.components;
        newAccessPackage.modify = template.modify;
        newAccessPackage.read = template.read;
        newAccessPackages[accessPackageIndex] = newAccessPackage;
        dispatch(updateAccessPackages(newAccessPackages));
    }

    function handleTemplateChange(confirmed) {
        setShowWarning(false);
        if (confirmed) {
            setShowWarning(false);
            handleTemplateSelectorOpen();
            handleUpdateAccessPackage();
        } else {
            setShowWarning(false);
        }
    }

    return (
        <StyledDialog
            open={templateSelectorOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onBackdropClick={handleTemplateSelectorOpen}
        >
            <DialogTitle id="alert-dialog-title">{"Velg en mal"}</DialogTitle>
            <DialogContent>
                <List aria-label="Komponentliste" dense>
                    {templates.map(template => {

                        return (
                            <ListItem button key={template.dn}
                                      onClick={() => handlePickingTemplate(template.name)}
                                      className={classes.listItem}>
                                <ListItemAvatar>
                                    <Avatar className={classes.itemAvatar}>
                                        <LockIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={template.name}/>
                            </ListItem>);
                    })}
                </List>

            </DialogContent>
            <DialogActions>
                <Button className={classes.cancelTemplateButton}
                        onClick={handleTemplateSelectorOpen} color="primary"
                        variant={"outlined"}>
                    Avbryt
                </Button>
            </DialogActions>
            <WarningMessageBox
                show={showWarning}
                onClose={handleTemplateChange}
                message={warningMessageText}
                title={"Endre til mal"}/>
        </StyledDialog>
    );
};

export default TemplateContainerDialog;
