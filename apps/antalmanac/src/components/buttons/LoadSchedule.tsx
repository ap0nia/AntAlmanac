import { useCallback, useEffect, useState } from 'react';
import {
    Button,
    type ButtonProps,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField,
    Tooltip,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CloudDownload as CloudDownloadIcon } from '@mui/icons-material';

import { loadSchedule } from '$actions/AppStoreActions';
import { isDarkMode } from '$lib/helpers';
import { useLoadingStore } from '$stores/loading';

function getSavedUserId(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }

    const userId = window.localStorage.getItem('userID');
    return userId;
}

export function LoadScheduleButton(props: ButtonProps = {}) {
    const [loadedSchedule, setLoadedSchedule] = useLoadingStore((state) => [
        state.loadedSchedule,
        state.setLoadedSchedule,
    ]);

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

    const handleLoadSchedule = useCallback(async (userId: string, rememberMe: boolean) => {
        setLoading(true);
        await loadSchedule(userId, rememberMe);
        setLoading(false);
    }, []);

    const handleSubmit = useCallback(() => {
        handleLoadSchedule(userId, rememberMe).then(() => {
            setOpen(false);
        });
    }, [userId, rememberMe, handleLoadSchedule]);

    /**
     * Try to find the username stored locally and automatically load their schedule.
     *
     * Only happens once when opening the application for the first time.
     */
    useEffect(() => {
        // If already attempted to load the schedule for the first time, don't try again.
        if (loadedSchedule) {
            return;
        }

        const userId = getSavedUserId();

        if (userId !== null) {
            handleLoadSchedule(userId, rememberMe);
        }

        setLoadedSchedule(true);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedSchedule]);

    return (
        <>
            <Tooltip title="Load schedule">
                <LoadingButton onClick={handleOpen} startIcon={<CloudDownloadIcon />} loading={loading} {...props}>
                    Load
                </LoadingButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Load</DialogTitle>

                <DialogContent>
                    <DialogContentText>Enter your username here to load your schedule.</DialogContentText>

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
                        Load
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
