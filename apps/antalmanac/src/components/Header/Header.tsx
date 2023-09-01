import { useCallback, useState } from 'react';
import { AppBar, Box, IconButton, Menu, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { SettingsButton, SettingsMenuItem } from './Settings';
import { ImportButton, ImportMenuItem } from './Import';
import { ExportButton, ExportMenuItem } from './Export';
import { NewsButton, NewsMenuItem } from './News';
import { FeedbackButton, FeedbackMenuItem } from './Feedback';
import { AboutButton, AboutMenuItem } from './About';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as MobileLogo } from './mobile-logo.svg';
import { LoadScheduleButton } from '$components/buttons/LoadSchedule';
import { SaveScheduleButton } from '$components/buttons/SaveSchedule';

export function Header() {
    const isMobileScreen = useMediaQuery('(max-width:750px)');

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<Element>();

    const handleClick = useCallback((event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    return (
        <AppBar
            position="static"
            color="primary"
            sx={{ backgroundColor: theme.palette.primary.main, backgroundImage: 'none' }}
        >
            <Toolbar variant="dense">
                {isMobileScreen ? <MobileLogo height={32} /> : <Logo height={32} />}

                <Box flexGrow={1} />

                {isMobileScreen ? (
                    <Box>
                        <SaveScheduleButton color="inherit" key="save" />
                        <LoadScheduleButton color="inherit" key="load" />

                        <IconButton onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <SettingsMenuItem />
                            <ImportMenuItem />
                            <ExportMenuItem />
                            <FeedbackMenuItem />
                            <NewsMenuItem />
                            <AboutMenuItem />
                        </Menu>
                    </Box>
                ) : (
                    <>
                        <SaveScheduleButton color="inherit" />
                        <LoadScheduleButton color="inherit" />
                        <SettingsButton />
                        <ImportButton />
                        <ExportButton />
                        <FeedbackButton />
                        <NewsButton />
                        <AboutButton />
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}
