import LazyLoad from 'react-lazyload'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Typography } from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import type { WebsocSchool } from 'peterportal-api-next-types'
import Department from './Department'

interface Props {
  school: WebsocSchool
  supplemental?: boolean
}

export default function School({ school }: Props) {
  return (
    <>
      <Grid item xs={12} marginY={1}>
        <Paper elevation={1} square>
          <Accordion sx={{ padding: 0 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h5" fontWeight="semi-bold">
                {school?.schoolName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{school?.schoolComment ? 'Comments: ' : 'No comments found'}</Typography>
              <Box sx={{ fontSize: 12 }} dangerouslySetInnerHTML={{ __html: school?.schoolComment }} />
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Grid>
      {school.departments.map((department) => (
        <LazyLoad once key={department.deptCode} height={department.courses.length * 60 + 60} offset={500} overflow>
          <Department key={department.deptCode} department={department} />
        </LazyLoad>
      ))}
    </>
  )
}