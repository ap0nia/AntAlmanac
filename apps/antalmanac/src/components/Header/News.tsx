import { Fragment, useCallback, useState } from 'react';
import {
    Badge,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Paper,
    Popover,
    Skeleton,
    Tooltip,
    Typography,
} from '@mui/material';
import { NewspaperOutlined as NewspaperIcon } from '@mui/icons-material';
import analyticsEnum, { logAnalytics } from '$lib/analytics';
import { trpc } from '$lib/trpc';

interface NewsPopoverProps {
    anchorEl: Element | undefined;
    setAnchorEl: React.Dispatch<React.SetStateAction<Element | undefined>>;
    setShowDot: React.Dispatch<React.SetStateAction<boolean>>;
}

function NewsPopover(props: NewsPopoverProps) {
    const { anchorEl, setAnchorEl, setShowDot } = props;

    const query = trpc.news.findAll.useQuery();

    const handleClose = useCallback(() => {
        setAnchorEl(undefined);
    }, []);

    /**
     * Upon closing the popover, store the date of the most recent news item.
     */
    const saveLatestRead = useCallback(() => {
        if (typeof Storage !== 'undefined' && query.data?.[0]) {
            window.localStorage.setItem('newsDate', query.data[0].date.toLocaleString());
        }
        setShowDot(false);
    }, []);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionProps={{ onExited: saveLatestRead }}
        >
            <Paper sx={{ width: 300 }}>
                {query.isLoading && (
                    // LOADING
                    <Box sx={{ padding: 2 }}>
                        <Skeleton variant="text" animation="wave" width="69.420%" />
                        <Skeleton variant="text" animation="wave" />
                        <Skeleton variant="text" animation="wave" width="42.069%" />
                    </Box>
                )}
                {!query.isLoading && query.data?.length ? (
                    // LOADED and DATA
                    <List sx={{ width: 300, height: 300, overflowY: 'auto' }} disablePadding dense>
                        {query.data.map((news) => (
                            <Fragment key={news.id}>
                                <ListItem>
                                    <ListItemText>
                                        <Typography>{news.title}</Typography>
                                        <Typography variant="body2">{news.body}</Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {news.date.toLocaleString()}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        ))}
                    </List>
                ) : (
                    // LOADED and NO DATA
                    <Typography variant="body2" padding={2}>
                        No new announcements!
                    </Typography>
                )}
            </Paper>
        </Popover>
    );
}

export function NewsButton() {
    const [anchorEl, setAnchorEl] = useState<Element>();

    const [showDot, setShowDot] = useState(false);

    const handleOpen = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);

        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CLICK_NEWS,
        });
    }, []);

    return (
        <>
            <Tooltip title="See Latest Updates">
                <Button color="inherit" onClick={handleOpen} startIcon={<NewspaperIcon />}>
                    <Badge variant="dot" color="success" invisible={!showDot}>
                        News
                    </Badge>
                </Button>
            </Tooltip>

            <NewsPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} setShowDot={setShowDot} />
        </>
    );
}

export function NewsMenuItem() {
    const [anchorEl, setAnchorEl] = useState<Element>();

    const [showDot, setShowDot] = useState(false);

    const handleOpen = useCallback((e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);

        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CLICK_NEWS,
        });
    }, []);

    return (
        <>
            <Tooltip title="See Latest Updates" placement="left">
                <MenuItem onClick={handleOpen}>
                    <Badge variant="dot" color="success" invisible={!showDot}>
                        <ListItemIcon>
                            <NewspaperIcon />
                        </ListItemIcon>
                        <ListItemText>News</ListItemText>
                    </Badge>
                </MenuItem>
            </Tooltip>

            <NewsPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} setShowDot={setShowDot} />
        </>
    );
}
