import { useCallback, useState } from 'react';
import { Button, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { ContentPasteGo as ContentPasteGoIcon } from '@mui/icons-material';
import { ImportDialog } from '$components/dialogs/Import';

export function ImportButton() {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Tooltip title="Import a schedule from your study list">
                <Button color="inherit" onClick={handleClick} startIcon={<ContentPasteGoIcon />}>
                    Import
                </Button>
            </Tooltip>
            <ImportDialog open={open} onClose={handleClose} />
        </>
    );
}

export function ImportMenuItem() {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Tooltip title="Import a schedule from your study list" placement="left">
                <MenuItem color="inherit" onClick={handleClick}>
                    <ListItemIcon>
                        <ContentPasteGoIcon />
                    </ListItemIcon>
                    <ListItemText>Import</ListItemText>
                </MenuItem>
            </Tooltip>

            <ImportDialog open={open} onClose={handleClose} />
        </>
    );
}
