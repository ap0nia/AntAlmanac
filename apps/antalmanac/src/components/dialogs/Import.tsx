import { useCallback, useState } from 'react';
import { ProviderContext, useSnackbar } from 'notistack';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    type DialogProps,
    DialogTitle,
    InputLabel,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import RightPaneStore from '$components/RightPane/RightPaneStore';
import TermSelector from '$components/RightPane/CoursePane/SearchForm/TermSelector';
import AppStore from '$stores/AppStore';
import { addCoursesMultiple, getCourseInfo, queryWebsoc, queryZotCourse } from '$lib/helpers';
import { addCustomEvent } from '$actions/AppStoreActions';
import analyticsEnum, { logAnalytics } from '$lib/analytics';

interface NestedFormProps {
    onClose?: () => unknown;
}

interface ImportCoursesProps {
    enqueueSnackbar: ProviderContext['enqueueSnackbar'];
    term: string;
    sectionCodes: string[];
}

async function importCourses(props: ImportCoursesProps) {
    const { enqueueSnackbar, term, sectionCodes } = props;

    const currentScheduleIndex = AppStore.getCurrentScheduleIndex();

    try {
        const websocData = await queryWebsoc({ term, sectionCodes: sectionCodes.join(',') });
        const courseInfo = getCourseInfo(websocData);
        const sectionsAdded = addCoursesMultiple(courseInfo, term, currentScheduleIndex);

        logAnalytics({
            category: analyticsEnum.nav.title,
            action: analyticsEnum.nav.actions.IMPORT_STUDY_LIST,
            value: sectionsAdded / (sectionCodes.length || 1),
        });

        if (sectionsAdded === sectionCodes.length) {
            enqueueSnackbar(`Successfully imported ${sectionsAdded} of ${sectionsAdded} classes!`, {
                variant: 'success',
            });
            return;
        }

        if (sectionsAdded !== 0) {
            enqueueSnackbar(
                `Successfully imported ${sectionsAdded} of ${sectionCodes.length} classes.\n` +
                    `Please make sure that you selected the correct term and that none of your classes are missing.`,
                { variant: 'warning' }
            );
            return;
        }

        enqueueSnackbar('Failed to import any classes! Please make sure that you pasted the correct Study List.', {
            variant: 'error',
        });
    } catch (e) {
        enqueueSnackbar('An error occurred while trying to import the Study List.', {
            variant: 'error',
        });
        console.log(e);
    }
}

function ImportStudyListForm(props: NestedFormProps) {
    const { onClose } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [studyList, setStudyList] = useState('');

    const [term, setTerm] = useState(RightPaneStore.getFormData().term);

    const handleTermChange = useCallback((_field: string, value: string) => {
        setTerm(value);
    }, []);

    const handleStudyListChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setStudyList(event.target.value);
    }, []);

    const handleSubmit = useCallback(async () => {
        const sectionCodes = studyList.match(/\d{5}/g);

        if (!sectionCodes?.length) {
            enqueueSnackbar('Cannot import an empty/invalid Study List/Zotcourse.', { variant: 'error' });
            return;
        }

        await importCourses({ enqueueSnackbar, term, sectionCodes });

        onClose?.();
    }, [studyList, enqueueSnackbar, term, onClose]);

    return (
        <Stack gap={2}>
            <Typography>
                Paste the contents of your Study List below to import it into AntAlmanac.
                <br />
                To find your Study List, go to{' '}
                <Link href={'https://www.reg.uci.edu/cgi-bin/webreg-redirect.sh'}>WebReg</Link> or{' '}
                <Link href={'https://www.reg.uci.edu/access/student/welcome/'}>StudentAccess</Link>, and click on Study
                List once you&apos;ve logged in. Copy everything below the column names (Code, Dept, etc.) under the
                Enrolled Classes section.
            </Typography>

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
    const { onClose } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [zotcourseScheduleName, setZotcourseScheduleName] = useState('');

    const [term, setTerm] = useState(RightPaneStore.getFormData().term);

    const handleTermChange = useCallback((_field: string, value: string) => {
        setTerm(value);
    }, []);

    const handleZotcourseScheduleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setZotcourseScheduleName(event.target.value);
    }, []);

    const handleSubmit = useCallback(async () => {
        const currentScheduleIndex = AppStore.getCurrentScheduleIndex();

        const zotcourseImport = await queryZotCourse(zotcourseScheduleName).catch((e) => {
            console.log(e);
            return null;
        });

        const sectionCodes = zotcourseImport?.codes;

        if (zotcourseImport == null || !sectionCodes?.length) {
            enqueueSnackbar('Cannot import an empty/invalid Study List/Zotcourse.', { variant: 'error' });
            return;
        }

        zotcourseImport.customEvents.forEach((event) => {
            addCustomEvent(event, [currentScheduleIndex]);
        });

        await importCourses({ enqueueSnackbar, term, sectionCodes });

        onClose?.();
    }, [zotcourseScheduleName, enqueueSnackbar, term, onClose]);

    return (
        <Stack gap={2}>
            <Box>
                <Typography>Paste your Zotcourse schedule name below to import it into AntAlmanac.</Typography>

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

export type ImportDialogProps = DialogProps;

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
