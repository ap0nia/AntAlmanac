import { Button, Tooltip } from '@mui/material';
import { RateReview as RateReviewIcon } from '@mui/icons-material';

/**
 * button that opens a modal with information about the project
 */
export default function Feedback() {
    return (
        <Tooltip title="Give us feedback" placement="right">
            <Button
                color="inherit"
                startIcon={<RateReviewIcon />}
                href="https://forms.gle/k81f2aNdpdQYeKK8A"
                target="_blank"
            >
                Feedback
            </Button>
        </Tooltip>
    );
}
