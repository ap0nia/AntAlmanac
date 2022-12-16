import React, { PureComponent, useEffect } from 'react';
import { CloudDownload, Save } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { loadSchedule, saveSchedule } from '../../actions/AppStoreActions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { isDarkMode } from '../../helpers';

class LoadSaveButtonBase extends PureComponent {
    state = {
        isOpen: false,
        userID: '',
        rememberMe: true,
    };

    handleOpen = () => {
        this.setState({ isOpen: true });
        if (typeof Storage !== 'undefined') {
            const userID = window.localStorage.getItem('userID');
            if (userID !== null) {
                this.setState({ userID: userID });
            }
        }
    };

    handleClose = (wasCancelled) => {
        if (wasCancelled)
            this.setState({ isOpen: false }, () => {
                document.removeEventListener('keydown', this.enterEvent, false);
                this.setState({ userID: '' });
            });
        else
            this.setState({ isOpen: false }, () => {
                document.removeEventListener('keydown', this.enterEvent, false);
                this.props.action(this.state.userID, this.state.rememberMe);
                this.setState({ userID: '' });
            });
    };

    handleToggleRememberMe = (event) => {
        this.setState({ rememberMe: event.target.checked });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevState.isOpen && this.state.isOpen) document.addEventListener('keydown', this.enterEvent, false);
        else if (prevState.isOpen && !this.state.isOpen)
            document.removeEventListener('keydown', this.enterEvent, false);
    }

    enterEvent = (event) => {
        const charCode = event.which ? event.which : event.keyCode;

        if (charCode === 13 || charCode === 10) {
            event.preventDefault();
            this.handleClose(false);

            return false;
        }
    };

    render() {
        return (
            <>
                <Button
                    onClick={this.handleOpen}
                    color="inherit"
                    startIcon={this.props.actionName === 'Save' ? <Save /> : <CloudDownload />}
                >
                    {this.props.actionName}
                </Button>
                <Dialog open={this.state.isOpen}>
                    <DialogTitle>{this.props.actionName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your username here to {this.props.actionName.toLowerCase()} your schedule.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="User ID"
                            type="text"
                            fullWidth
                            placeholder="Enter here"
                            value={this.state.userID}
                            onChange={(event) => this.setState({ userID: event.target.value })}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.rememberMe}
                                    onChange={this.handleToggleRememberMe}
                                    color="primary"
                                />
                            }
                            label="Remember Me (Uncheck on shared computers)"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose(true)} color={isDarkMode() ? 'inherit' : 'primary'}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleClose(false)} color={isDarkMode() ? 'inherit' : 'primary'}>
                            {this.props.actionName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

const LoadSaveScheduleFunctionality = () => {
    useEffect(() => {
        if (typeof Storage !== 'undefined') {
            const savedUserID = window.localStorage.getItem('userID');

            if (savedUserID != null) {
                loadSchedule(savedUserID, true);
            }
        }
    }, []);

    return (
        <>
            <LoadSaveButtonBase actionName={'Save'} action={saveSchedule} />
            <LoadSaveButtonBase actionName={'Load'} action={loadSchedule} />
        </>
    );
};

export default LoadSaveScheduleFunctionality;
