import { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import analyticsEnum, { logAnalytics } from '$lib/analytics';

export default function About() {
    const [open, setOpen] = useState(false);

    const handleClick = useCallback(() => {
        setOpen(true);
        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.CLICK_ABOUT,
        });
    }, []);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Button onClick={handleClick} color="inherit" startIcon={<InfoIcon />}>
                About
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>About</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        AntAlmanac is a schedule planning tool for UCI students.
                        <br />
                        <br />
                        Interested in helping out? Join our{' '}
                        <Link target="_blank" href="https://discord.gg/GzF76D7UhY">
                            Discord
                        </Link>{' '}
                        or checkout the{' '}
                        <Link target="_blank" href="https://github.com/icssc/AntAlmanac">
                            code on GitHub
                        </Link>
                        .
                        <br />
                        <br />
                        This website is maintained by the{' '}
                        <Link target="_blank" href="https://studentcouncil.ics.uci.edu/">
                            ICS Student Council
                        </Link>{' '}
                        Projects Committee and built by students from the UCI community.
                        <br />
                        <br />
                        <Link target="_blank" href="https://github.com/icssc/AntAlmanac/contributors">
                            <img
                                src="https://contrib.rocks/image?repo=icssc/antalmanac"
                                width={'100%'}
                                alt="AntAlmanac Contributors"
                            />
                        </Link>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
