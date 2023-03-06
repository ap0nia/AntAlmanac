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
import type { WebsocCourse } from 'peterportal-api-next-types'
import Section from './Section'

interface Props {
  course: WebsocCourse
  term?: string
  supplemental?: boolean
}

export default function Course({ course }: Props) {
  return (
    <Box>
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
