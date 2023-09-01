import { Box } from '@mui/material';
import About from './About';
import Settings from './Settings';
import News from './News';
import Feedback from './Feedback';
import { LoadScheduleButton } from '$components/buttons/LoadSchedule';

export function Header() {
    return (
        <Box>
            <LoadScheduleButton />
            <Settings />
            <About />
            <News />
            <Feedback />
        </Box>
    );
}
