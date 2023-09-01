import { Button, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { RateReview as RateReviewIcon } from '@mui/icons-material';

export function FeedbackButton() {
    return (
        <Tooltip title="Give us feedback">
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

export function FeedbackMenuItem() {
    return (
        <Tooltip title="Give us feedback" placement="left">
            <MenuItem target="_blank" href="https://forms.gle/k81f2aNdpdQYeKK8A">
                <ListItemIcon>
                    <RateReviewIcon />
                </ListItemIcon>
                <ListItemText>Feedback</ListItemText>
            </MenuItem>
        </Tooltip>
    );
}
