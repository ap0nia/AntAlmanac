import { useCallback, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    type DialogProps,
    DialogTitle,
    InputLabel,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import RightPaneStore from '$components/RightPane/RightPaneStore';
import TermSelector from '$components/RightPane/CoursePane/SearchForm/TermSelector';

interface NestedFormProps {
    onClose?: () => unknown;
}

function ImportStudyListForm(props: NestedFormProps) {
    const [studyList, setStudyList] = useState('');

    const [term, setTerm] = useState(RightPaneStore.getFormData().term);

    const handleTermChange = useCallback((_field: string, value: string) => {
        setTerm(value);
    }, []);

    const handleStudyListChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setStudyList(event.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        console.log('submitted');
    }, []);

    return (
        <Stack gap={2}>
            <DialogContentText>
                Paste the contents of your Study List below to import it into AntAlmanac.
                <br />
                To find your Study List, go to <a href={'https://www.reg.uci.edu/cgi-bin/webreg-redirect.sh'}>
                    WebReg
                </a>{' '}
                or <a href={'https://www.reg.uci.edu/access/student/welcome/'}>StudentAccess</a>, and click on Study
                List once you&apos;ve logged in. Copy everything below the column names (Code, Dept, etc.) under the
                Enrolled Classes section.
            </DialogContentText>

            <Box>
                <InputLabel>Study List</InputLabel>
                <TextField
                    fullWidth
                    multiline
                    type="text"
                    margin="dense"
                    placeholder="Paste here"
                    value={studyList}
                    onChange={handleStudyListChange}
                />
            </Box>

            <Box>
                <TermSelector fieldName="selectedTerm" changeState={handleTermChange} />
                <Typography>Make sure you also have the right term selected.</Typography>
            </Box>

            <Stack direction="row" gap={1}>
                <Button color="inherit" variant="outlined" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button color="inherit" variant="outlined" onClick={handleSubmit}>
                    Import
                </Button>
            </Stack>
        </Stack>
    );
}

function ImportZotcourseForm(props: NestedFormProps) {
    const [zotcourseScheduleName, setZotcourseScheduleName] = useState('');

    const [term, setTerm] = useState(RightPaneStore.getFormData().term);

    const handleTermChange = useCallback((_field: string, value: string) => {
        setTerm(value);
    }, []);

    const handleZotcourseScheduleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setZotcourseScheduleName(event.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        console.log('submitted');
    }, []);

    return (
        <Stack gap={2}>
            <Box>
                <DialogContentText>
                    Paste your Zotcourse schedule name below to import it into AntAlmanac.
                </DialogContentText>

                <InputLabel>Zotcourse Schedule</InputLabel>

                <TextField
                    fullWidth
                    multiline
                    margin="dense"
                    type="text"
                    placeholder="Paste here"
                    value={zotcourseScheduleName}
                    onChange={handleZotcourseScheduleNameChange}
                />
            </Box>

            <Box>
                <TermSelector fieldName="selectedTerm" changeState={handleTermChange} />
                <Typography>Make sure you also have the right term selected.</Typography>
            </Box>

            <Stack direction="row" gap={1}>
                <Button color="inherit" variant="outlined" onClick={props.onClose}>
                    Cancel
                </Button>
                <Button color="inherit" variant="outlined" onClick={handleSubmit}>
                    Import
                </Button>
            </Stack>
        </Stack>
    );
}

export type ImportDialogProps = DialogProps

export function ImportDialog(props: ImportDialogProps) {
    /**
     * This is destructured separately for memoization.
     */
    const { onClose } = props;

    const [tab, setTab] = useState(0);

    const handleClose = useCallback(() => {
        onClose?.({}, 'escapeKeyDown');
    }, [onClose]);

    const handleChange = useCallback((_event: unknown, newValue: number) => {
        setTab(newValue);
    }, []);

    return (
        <Dialog {...props}>
            <DialogTitle>Import Schedule</DialogTitle>
            <DialogContent>
                <Stack gap={3}>
                    <Box borderBottom={1} borderColor="divider">
                        <Tabs value={tab} onChange={handleChange} centered textColor="inherit" variant="fullWidth">
                            <Tab label="From Study List" />
                            <Tab label="From Zotcourse" />
                        </Tabs>
                    </Box>
                    <Box>
                        {tab === 0 && <ImportStudyListForm onClose={handleClose} />}
                        {tab === 1 && <ImportZotcourseForm onClose={handleClose} />}
                    </Box>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
