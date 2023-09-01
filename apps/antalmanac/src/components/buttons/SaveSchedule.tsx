import { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save as SaveIcon } from '@mui/icons-material';

import { saveSchedule } from '$actions/AppStoreActions';
import { isDarkMode } from '$lib/helpers';

function getSavedUserId(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    const userId = window.localStorage.getItem('userID');
    return userId;
}

export function SaveScheduleButton() {
    const [open, setOpen] = useState(false);

    const [rememberMe, setRememberMe] = useState(true);

    const [loading, setLoading] = useState(false);

    const [userId, setUserId] = useState(getSavedUserId() ?? '');

    const handleUserIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    }, []);

    const handleRememberMeChange = useCallback((_event: unknown, checked: boolean) => {
        setRememberMe(checked);
    }, []);

    const handleOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleSubmit = useCallback(() => {
        handleSaveSchedule(userId, rememberMe).then(() => {
            setOpen(false);
        });
    }, [userId, rememberMe]);

    const handleSaveSchedule = useCallback(async (userId: string, rememberMe: boolean) => {
        setLoading(true);
        await saveSchedule(userId, rememberMe);
        setLoading(false);
    }, []);

    /**
     * If the user's schedule is found locally, automatically load it.
     *
     * Because of how setState is async and whatever, I don't trust on relying on the state userId
     * for the onMount function.
     */
    useEffect(() => {
        const userId = getSavedUserId();
        if (userId !== null) {
            handleSaveSchedule(userId, rememberMe);
        }
    }, []);
    return (
        <>
            <LoadingButton onClick={handleOpen} color="inherit" startIcon={<SaveIcon />} loading={loading}>
                Save
            </LoadingButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save</DialogTitle>

                <DialogContent>
                    <DialogContentText>Enter your username here to save your schedule.</DialogContentText>

                    <TextField
                        fullWidth
                        margin="dense"
                        label="User ID"
                        placeholder="Enter here"
                        value={userId}
                        onChange={handleUserIdChange}
                    />

                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={handleRememberMeChange} color="primary" />}
                        label="Remember Me (Uncheck on shared computers)"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color={isDarkMode() ? 'secondary' : 'primary'}>
                        Cancel
                    </Button>

                    <LoadingButton
                        onClick={handleSubmit}
                        color={isDarkMode() ? 'secondary' : 'primary'}
                        loading={loading}
                    >
                        Save
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
