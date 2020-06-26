import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SavedSuccessSnackbar = (props) => {
    const {open, close, message} = props;

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={3000}
                onClose={close}
                message={message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
};

export default SavedSuccessSnackbar;