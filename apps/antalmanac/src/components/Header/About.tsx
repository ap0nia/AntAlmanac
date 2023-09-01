import { useCallback, useState } from 'react';
import { Button, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import analyticsEnum, { logAnalytics } from '$lib/analytics';
import { AboutDialog } from '$components/dialogs/About';

export function AboutButton() {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CLICK_ABOUT,
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Tooltip title="About us">
                <Button onClick={handleClick} color="inherit" startIcon={<InfoIcon />}>
                    About
                </Button>
            </Tooltip>
            <AboutDialog open={open} onClose={handleClose} />
        </>
    );
}

export function AboutMenuItem() {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CLICK_ABOUT,
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Tooltip title="About us" placement="left">
                <MenuItem onClick={handleClick}>
                    <ListItemIcon>
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>About</ListItemText>
                </MenuItem>
            </Tooltip>

            <AboutDialog open={open} onClose={handleClose} />
        </>
    );
}
