import { useCallback, useState } from 'react';
import { Button, MenuItem, ListItemIcon, ListItemText, Popover, Stack, Tooltip } from '@mui/material';
import { IosShare } from '@mui/icons-material';
import { DownloadButton } from '$components/buttons/Download';
import { ScreenshotButton } from '$components/buttons/Screenshot';

export function ExportPopoverContent() {
    return (
        <Stack minWidth="12.25rem">
            <DownloadButton color="inherit" />
            <ScreenshotButton color="inherit" />
        </Stack>
    );
}

export function ExportButton() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    return (
        <>
            <Tooltip title="Export schedule">
                <Button color="inherit" onClick={handleClick} startIcon={<IosShare />}>
                    Export
                </Button>
            </Tooltip>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <ExportPopoverContent />
            </Popover>
        </>
    );
}

export function ExportMenuItem() {
    const [anchorEl, setAnchorEl] = useState<Element>();

    const handleClick = useCallback((event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    return (
        <>
            <Tooltip title="Export schedule" placement="left">
                <MenuItem onClick={handleClick}>
                    <ListItemIcon>
                        <IosShare />
                    </ListItemIcon>
                    <ListItemText>Export</ListItemText>
                </MenuItem>
            </Tooltip>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <ExportPopoverContent />
            </Popover>
        </>
    );
}
