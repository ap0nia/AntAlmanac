import React, { useState } from 'react';
import { AssignmentReturn, AssignmentReturned, SaveAlt } from '@material-ui/icons';
import { Button, Avatar, Box, withStyles, Menu, MenuItem, Popover } from '@material-ui/core';
import { login, logout, saveGoogleUser } from '../../actions/AppStoreActions';
import { LoadSchedule } from './LoadSaveFunctionality';

const styles = {
    avatar: {
        marginRight: 5,
        width: 25,
        height: 25,
    },
    username: {
        fontSize: '0.9rem',
        fontWeight: 500,
        marginRight: 5,
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
    },
};

const GoogleAccountBase = ({ user, classes }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {user ? (
                <>
                    <Button onClick={handleClick} className={classes.profile}>
                        <Avatar
                            alt={user.passport.user.name}
                            src={user.passport.user.picture}
                            className={classes.avatar}
                        />
                        <Box className={classes.username}>{user.passport.user.name.toLocaleUpperCase()}</Box>
                    </Button>

                    <Popover
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom' }}
                        transformOrigin={{ vertical: 'top' }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem>
                            <LoadSchedule />
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={logout} color="inherit" startIcon={<AssignmentReturn />}>
                                Logout
                            </Button>
                        </MenuItem>
                    </Popover>
                </>
            ) : (
                <Button onClick={login} color="inherit" startIcon={<AssignmentReturned />}>
                    Login
                </Button>
            )}
        </>
    );
};
export default withStyles(styles)(GoogleAccountBase);
