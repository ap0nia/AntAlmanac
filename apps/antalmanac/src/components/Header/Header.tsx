import { Box } from '@mui/material';
import About from './About';
import Settings from './Settings';
import News from './News';
import Feedback from './Feedback';
import { DownloadButton } from '$components/buttons/Download';
import { LoadScheduleButton } from '$components/buttons/LoadSchedule';
import ScreenshotButton from '$components/buttons/Screenshot';

export function Header() {
    return (
        <Box>
            <LoadScheduleButton />
            <Settings />
            <DownloadButton />
            <ScreenshotButton />
            <Feedback />
            <News />
            <About />
        </Box>
    );
}
