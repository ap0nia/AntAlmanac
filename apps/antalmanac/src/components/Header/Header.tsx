import { useCallback, useState } from 'react';
import { AppBar, Box, IconButton, Popover, Stack, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import About from './About';
import Settings from './Settings';
import News from './News';
import Feedback from './Feedback';
import Export from './Export';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as MobileLogo } from './mobile-logo.svg';
import { LoadScheduleButton } from '$components/buttons/LoadSchedule';
import { SaveScheduleButton } from '$components/buttons/SaveSchedule';

const dataButtons = [
    <SaveScheduleButton color="inherit" key="save" />,
    <LoadScheduleButton color="inherit" key="load" />,
];

const otherButtons = [
    <Settings key="settings" />,
    <Export key="export" />,
    <Feedback key="feedback" />,
    <News key="news" />,
    <About key="about" />,
];

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
                        {dataButtons}
                        <IconButton onClick={handleClick}>
                            <MenuIcon />
                        </IconButton>

                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Stack padding={1} alignItems="flex-start">
                                {otherButtons}
                            </Stack>
                        </Popover>
                    </Box>
                ) : (
                    <Stack direction="row">
                        {dataButtons}
                        {otherButtons}
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
}
