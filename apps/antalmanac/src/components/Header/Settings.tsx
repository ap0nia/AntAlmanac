import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Popover, ToggleButtonGroup, ToggleButton, Tooltip, Typography } from '@mui/material';
import {
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    SettingsOutlined as SettingsIcon,
    SettingsBrightness as SettingsBrightnessIcon,
} from '@mui/icons-material';
import AppStore from '$stores/AppStore';
import analyticsEnum, { logAnalytics } from '$lib/analytics';

/**
 * icon button to open settings drawer
 */
export default function Settings() {
    const [colorScheme, setColorScheme] = useState(AppStore.getTheme());

    const [anchorEl, setAnchorEl] = useState<HTMLElement>();

    const handleOpen = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    const handleChange = useCallback((_e: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        /**
         * The result of this will be reflected by the AppStore.on('themeToggle') listener
         */
        AppStore.toggleTheme(value);

        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CHANGE_THEME,
            label: value,
        });
    }, []);

    const handleThemeChange = useCallback(() => {
        setColorScheme(AppStore.getTheme());
    }, []);

    useEffect(() => {
        AppStore.on('themeToggle', handleThemeChange);
        return () => {
            AppStore.off('themeToggle', handleThemeChange);
        };
    }, []);

    return (
        <>
            <Tooltip title="Settings">
                <Button color="inherit" onClick={handleOpen} startIcon={<SettingsIcon />}>
                    Settings
                </Button>
            </Tooltip>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box sx={{ p: 2, '& .MuiSvgIcon-root': { mr: 1 } }}>
                    <ToggleButtonGroup exclusive fullWidth value={colorScheme} onChange={handleChange}>
                        <ToggleButton value="light">
                            <LightModeIcon fontSize="small" />
                            Light
                        </ToggleButton>
                        <ToggleButton value="dark">
                            <DarkModeIcon fontSize="small" />
                            Dark
                        </ToggleButton>
                        <ToggleButton value="auto">
                            <SettingsBrightnessIcon fontSize="small" />
                            Auto
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Popover>
        </>
    );
}
