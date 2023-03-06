import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  Assessment as AssessmentIcon,
  Assignment as AssignmentIcon,
  RateReview as RateReviewIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material'
import type { WebsocCourse } from 'peterportal-api-next-types'
import { analyticsEnum } from '$lib/analytics'
import CourseSummaryButton from '$components/buttons/CourseSummary'
import CourseReferenceButton from '$components/buttons/CourseReference'
import GradesPopup from './GradesPopup'
import Section from './Section'

interface Props {
  course: WebsocCourse
  term?: string
  supplemental?: boolean
}

export default function Course({ course }: Props) {
  const courseId = course.deptCode.replaceAll(' ', '') + course.courseNumber
  const encodedDept = encodeURIComponent(course.deptCode)
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', marginY: 2 }}>
        <CourseSummaryButton course={course} />
        {course.prerequisiteLink && (
          <CourseReferenceButton
            analyticsAction={analyticsEnum.classSearch.actions.CLICK_PREREQUISITES}
            title="Prerequisites"
            icon={<AssignmentIcon />}
            href={course.prerequisiteLink}
          />
        )}
        <CourseReferenceButton
          analyticsAction={analyticsEnum.classSearch.actions.CLICK_PREREQUISITES}
          title="Reviews"
          icon={<RateReviewIcon />}
          href={`https://peterportal.org/course/${courseId}`}
        />
        <CourseReferenceButton
          analyticsAction={analyticsEnum.classSearch.actions.CLICK_ZOTISTICS}
          title="Zotistics"
          icon={<AssessmentIcon />}
        >
          <GradesPopup course={course} />
        </CourseReferenceButton>
        <CourseReferenceButton
          analyticsAction={analyticsEnum.classSearch.actions.CLICK_PAST_ENROLLMENT}
          title="Past Enrollment"
          icon={<ShowChartIcon />}
          href={`https://zot-tracker.herokuapp.com/?dept=${encodedDept}&number=${course.courseNumber}&courseType=all`}
        />
      </Box>

      <TableContainer component={Paper} style={{ margin: '8px 0px 8px 0px' }} elevation={0} variant="outlined">
        <Table size="small" sx={{ '& .MuiTableCell-root': { padding: 0.5 } }}>
          <TableHead>
            <TableRow>
              <TableCell width="4%" />
              <Tooltip title="Course Code">
                <TableCell width="10%">Code</TableCell>
              </Tooltip>
              <Tooltip title="Course Type">
                <TableCell width="10%">Type</TableCell>
              </Tooltip>
              <Tooltip title="Course Instructors">
                <TableCell width="15%">Instructors</TableCell>
              </Tooltip>
              <Tooltip title="Course Meeting Times">
                <TableCell width="12%">Times</TableCell>
              </Tooltip>
              <Tooltip title="Location of Meetings">
                <TableCell width="10%">Places</TableCell>
              </Tooltip>
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
                <TableCell width="10%">Enrollment</TableCell>
              </Tooltip>
              <Tooltip title="Restrictions">
                <TableCell width="8%">Rstr</TableCell>
              </Tooltip>
              <Tooltip title="Current Status">
                <TableCell width="8%">Status</TableCell>
              </Tooltip>
            </TableRow>
          </TableHead>

          <TableBody sx={{ padding: 0 }}>
            {course.sections.map((section) => (
              <Section key={section.sectionCode} section={section} course={course} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
