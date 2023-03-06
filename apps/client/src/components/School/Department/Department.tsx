import { Box } from '@mui/material'
import type { WebsocDepartment } from 'peterportal-api-next-types'
import Course from './Course'

interface Props {
  department: WebsocDepartment
}

export default function Department({ department }: Props) {
  return (
    <Box>
      {department.courses.map((course) => (
        <Box key={course.courseNumber}>
          <Course course={course} />
        </Box>
      ))}
    </Box>
  )
}
