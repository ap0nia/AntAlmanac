import { useCallback, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MuiMarkdown } from '$components/MuiMarkdown';

/**
 * Show modal only if the current patch notes haven't been shown.
 * This is denoted by a date string YYYYMMDD
 *
 * @example '20230819'
 */
const latestPatchNotesUpdate = '20230819';

/**
 * Whether the user's last visited patch notes is outdated.
 */
function isOutdated() {
    return localStorage.getItem('latestPatchSeen') != latestPatchNotesUpdate;
}

const markdown = `
# Features

- Courses will now be greyed out if they conflict with your current schedule</li>

<img
    src="https://user-images.githubusercontent.com/100006999/255796434-10555ecb-5632-4ff3-8be3-c04267722011.gif"
    alt="gif of the new feature"
    style=" maxWidth: 100%; boxShadow: 4px 4px 4px rgba(0, 0, 0, 0.4)"
/>


Remember to use the 
[feedback form](https://docs.google.com/forms/d/e/1FAIpQLSe0emRHqog-Ctl8tjZfJvewY_CSGXys8ykBkFBy1EEUUUHbUw/viewform)
to let us know what you think!
`;

/**
 * PatchNotes follows structure/layout of AboutPage.tsx
 */
function PatchNotes() {
    const [open, setOpen] = useState(isOutdated());

    /**
     * Allow the user to exit the modal using their keyboard or by clicking outside the dialog.
     */
    const handleClose = useCallback(() => {
        localStorage.setItem('latestPatchSeen', latestPatchNotesUpdate);
        setOpen(false);
    }, [setOpen]);

    const handleClick = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <Dialog fullWidth={true} onClose={handleClose} open={open}>
            <DialogTitle>{"What's New - August 2023"}</DialogTitle>

            <DialogContent>
                <MuiMarkdown>{markdown}</MuiMarkdown>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClick} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PatchNotes;
