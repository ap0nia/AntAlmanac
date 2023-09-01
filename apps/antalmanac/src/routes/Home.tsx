import { useMemo } from 'react';
import Split from 'react-split';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Box, CssBaseline, useMediaQuery, useTheme } from '@mui/material';

import Header from '$components/Header';
import MobileHome from '$components/MobileHome';
import PatchNotes from '$components/PatchNotes';
import Calendar from '$components/Calendar/CalendarRoot';
import DesktopTabs from '$components/RightPane/RightPaneRoot';
import NotificationSnackbar from '$components/NotificationSnackbar';

export default function Home() {
    const isMobileScreen = useMediaQuery('(max-width: 750px)');

    const theme = useTheme();

    const backgroundColor = useMemo(() => theme.palette.primary.main, [theme.palette.primary.main]);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <CssBaseline />

            <PatchNotes />

            <Header />

            {isMobileScreen ? (
                <MobileHome />
            ) : (
                <Split
                    key={backgroundColor}
                    sizes={[50, 50]}
                    minSize={100}
                    expandToMin={false}
                    gutterSize={10}
                    gutterAlign="center"
                    snapOffset={30}
                    dragInterval={1}
                    direction="horizontal"
                    cursor="col-resize"
                    style={{ display: 'flex' }}
                    gutterStyle={() => ({ backgroundColor, width: '10px' })}
                >
                    <Box>
                        <Calendar isMobile={false} />
                    </Box>

                    <Box>
                        <DesktopTabs style={{ height: 'calc(100vh - 58px)' }} />
                    </Box>
                </Split>
            )}
            <NotificationSnackbar />
        </MuiPickersUtilsProvider>
    );
}
