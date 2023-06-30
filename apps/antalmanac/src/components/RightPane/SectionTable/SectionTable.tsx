import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Assessment, Help, RateReview } from '@material-ui/icons';
import ShowChartIcon from '@material-ui/icons/ShowChart';
// import AlmanacGraph from '../EnrollmentGraph/EnrollmentGraph'; uncomment when we get past enrollment data back and restore the files (https://github.com/icssc/AntAlmanac/tree/5e89e035e66f00608042871d43730ba785f756b0/src/components/RightPane/SectionTable/EnrollmentGraph)
import { useEffect, useState } from 'react';
import { MOBILE_BREAKPOINT } from '../../../globals';
import RightPaneStore from '../RightPaneStore';
import CourseInfoBar from './CourseInfoBar';
import CourseInfoButton from './CourseInfoButton';
import GradesPopup from './GradesPopup';
import { SectionTableProps } from './SectionTable.types';
import SectionTableBody from './SectionTableBody';
import analyticsEnum from '$lib/analytics';

const styles = {
    flex: {
        display: 'flex',
        alignItems: 'center',
    },
    iconMargin: {
        marginRight: '4px',
    },
    cellPadding: {
        padding: '0px 0px 0px 0px',
    },
    row: {
        '&:nth-child(1)': {
            width: '8%',
        },
        '&:nth-child(2)': {
            width: '8%',
        },
        '&:nth-child(3)': {
            width: '8%',
        },
        '&:nth-child(4)': {
            width: '15%',
        },
        '&:nth-child(5)': {
            width: '12%',
        },
        '&:nth-child(6)': {
            width: '10%',
        },
        '&:nth-child(7)': {
            width: '10%',
        },
        '&:nth-child(8)': {
            width: '8%',
        },
        '&:nth-child(9)': {
            width: '8%',
        },
    },
};

const tableHeadColumns: { value: string; label: string }[] = [
    { value: 'sectionCode', label: 'Code' },
    { value: 'sectionDetails', label: 'Type' },
    { value: 'instructors', label: 'Instructors' },
    { value: 'dayAndTime', label: 'Times' },
    { value: 'location', label: 'Places' },
    { value: 'sectionEnrollment', label: 'Enrollment' },
    { value: 'restrictions', label: 'Rstr' },
    { value: 'status', label: 'Status' },
];

const SectionTable = (props: SectionTableProps) => {
    const { classes, courseDetails, term, colorAndDelete, highlightAdded, scheduleNames, analyticsCategory } = props;
    const courseId = courseDetails.deptCode.replaceAll(' ', '') + courseDetails.courseNumber;
    const encodedDept = encodeURIComponent(courseDetails.deptCode);
    const isMobileScreen = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}`);

    const [columns, setColumns] = useState([
        'sectionCode',
        'sectionDetails',
        'instructors',
        'dayAndTime',
        'location',
        'sectionEnrollment',
        'restrictions',
        'status',
    ]);

    useEffect(() => {
        RightPaneStore.on('columnChange', (columns) => {
            setColumns(columns);
        });

        return () => {
            RightPaneStore.removeListener('columnChange', (columns) => {
                setColumns(columns);
            });
        };
    }, [columns]);

    return (
        <>
            <div
                style={{
                    display: 'inline-flex',
                    gap: '4px',
                    marginTop: '4px',
                }}
            >
                <CourseInfoBar
                    deptCode={courseDetails.deptCode}
                    courseTitle={courseDetails.courseTitle}
                    courseNumber={courseDetails.courseNumber}
                    prerequisiteLink={courseDetails.prerequisiteLink}
                    analyticsCategory={analyticsCategory}
                />

                {/* Temporarily remove "Past Enrollment" until data on PeterPortal API */}
                {/* <AlmanacGraph courseDetails={courseDetails} />  */}

                <CourseInfoButton
                    analyticsCategory={analyticsCategory}
                    analyticsAction={analyticsEnum.classSearch.actions.CLICK_REVIEWS}
                    text="Reviews"
                    icon={<RateReview />}
                    redirectLink={`https://peterportal.org/course/${courseId}`}
                />
                <CourseInfoButton
                    analyticsCategory={analyticsCategory}
                    analyticsAction={analyticsEnum.classSearch.actions.CLICK_ZOTISTICS}
                    text="Zotistics"
                    icon={<Assessment />}
                    popupContent={
                        <GradesPopup
                            deptCode={courseDetails.deptCode}
                            courseNumber={courseDetails.courseNumber}
                            isMobileScreen={isMobileScreen}
                        />
                    }
                />

                <CourseInfoButton
                    analyticsCategory={analyticsCategory}
                    analyticsAction={analyticsEnum.classSearch.actions.CLICK_PAST_ENROLLMENT}
                    text="Past Enrollment"
                    icon={<ShowChartIcon />}
                    redirectLink={`https://zot-tracker.herokuapp.com/?dept=${encodedDept}&number=${courseDetails.courseNumber}&courseType=all`}
                />
            </div>

            <TableContainer component={Paper} style={{ margin: '8px 0px 8px 0px' }} elevation={0} variant="outlined">
                <Table className={classes?.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{ sizeSmall: classes?.cellPadding }} className={classes?.row} />
                            {tableHeadColumns
                                .filter((column) => columns.includes(column.value))
                                .map((column) => {
                                    return (
                                        <TableCell
                                            classes={{ sizeSmall: classes?.cellPadding }}
                                            className={classes?.row}
                                            key={column.label}
                                        >
                                            {!(column.label === 'Enrollment') ? (
                                                column.label
                                            ) : (
                                                <div className={classes?.flex}>
                                                    <span className={classes?.iconMargin}>{column.label}</span>
                                                    {!isMobileScreen && (
                                                        <Tooltip
                                                            title={
                                                                <Typography>
                                                                    Enrolled/Capacity
                                                                    <br />
                                                                    Waitlist
                                                                    <br />
                                                                    New-Only Reserved
                                                                </Typography>
                                                            }
                                                        >
                                                            <Help fontSize="small" />
                                                        </Tooltip>
                                                    )}
                                                </div>
                                            )}
                                        </TableCell>
                                    );
                                })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courseDetails.sections.map((section) => {
                            return (
                                <SectionTableBody
                                    key={section.sectionCode}
                                    section={section}
                                    courseDetails={courseDetails}
                                    term={term}
                                    colorAndDelete={colorAndDelete}
                                    highlightAdded={highlightAdded}
                                    scheduleNames={scheduleNames}
                                />
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default withStyles(styles)(SectionTable);
