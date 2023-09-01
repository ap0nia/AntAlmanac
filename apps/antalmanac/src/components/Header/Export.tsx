import { useCallback, useState } from 'react';
import { Button, Popover, Stack } from '@mui/material';
import { IosShare } from '@mui/icons-material';
import { DownloadButton } from '$components/buttons/Download';
import { ScreenshotButton } from '$components/buttons/Screenshot';

export default function Export() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement>();

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    return (
        <>
            <Button color="inherit" onClick={handleClick} startIcon={<IosShare />}>
                Export
            </Button>

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
                <Stack minWidth="12.25rem">
                    <DownloadButton />
                    <ScreenshotButton />
                </Stack>
            </Popover>
        </>
    );
}
