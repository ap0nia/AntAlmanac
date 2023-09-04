import { useCallback, useRef } from 'react';
import { createEvents } from 'ics';
import { useSnackbar } from 'notistack';
import { Button, type ButtonProps, Link, Tooltip } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { getEventsFromCourses, vTimeZoneSection } from '$lib/download';
import analyticsEnum, { logAnalytics } from '$lib/analytics';

export function DownloadButton(props: ButtonProps = {}) {
    const ref = useRef<HTMLAnchorElement>(null);

    const { enqueueSnackbar } = useSnackbar();

    const exportCalendar = useCallback(() => {
        const events = getEventsFromCourses();

        createEvents(events, (err, val) => {
            logAnalytics({
                category: 'Calendar Pane',
                action: analyticsEnum.calendar.actions.DOWNLOAD,
            });

            if (err || !ref.current) {
                enqueueSnackbar('Something went wrong! Unable to download schedule.', { variant: 'error' });
                console.log(err);
                return;
            }

            // Add timezone information to start and end times for events
            const icsString = val
                .replaceAll('DTSTART', 'DTSTART;TZID=America/Los_Angeles')
                .replaceAll('DTEND', 'DTEND;TZID=America/Los_Angeles');

            // inject the VTIMEZONE section into the .ics file
            const blob = new Blob([icsString.replace('BEGIN:VEVENT', vTimeZoneSection)], {
                type: 'text/plain;charset=utf-8',
            });

            ref.current.href = URL.createObjectURL(blob);
            ref.current.download = 'schedule.ics';
            ref.current.click();

            enqueueSnackbar('Schedule downloaded!', { variant: 'success' });
        });
    }, [enqueueSnackbar]);

    return (
        <>
            <Tooltip title="Download Schedule (.ics)" placement="left">
                <Button startIcon={<DownloadIcon fontSize="small" />} onClick={exportCalendar} {...props}>
                    Download
                </Button>
            </Tooltip>
            <Link ref={ref} sx={{ display: 'none' }} href="/">
                Invisible link to download files
            </Link>
        </>
    );
}
