import LazyLoad from 'react-lazyload'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Typography } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import type { WebsocDepartment } from 'peterportal-api-next-types'
import Course from './Course'

interface Props {
  department: WebsocDepartment
}

export default function Department({ department }: Props) {
  return (
    <>
      <Grid item xs={12} marginY={1}>
        <Paper elevation={1} square>
          <Accordion sx={{ padding: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{`Department of ${department.deptName}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{department.deptComment ? 'Comments: ' : 'No comments found'}</Typography>
              <Box sx={{ fontSize: 12 }} dangerouslySetInnerHTML={{ __html: department.deptComment }} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      {department.courses.map((course) => (
        <LazyLoad once key={course.courseNumber} height={course.sections.length * 50 + 100}>
          <Course course={course} />
        </LazyLoad>
      ))}
    </>
  )
}
