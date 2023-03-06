import { Box } from '@mui/material'
import Department from './Department'
import type { WebsocSchool } from 'peterportal-api-next-types'

interface Props {
  school: WebsocSchool
}

export default function School({ school }: Props) {
  return (
    <Box>
      {school.departments.map((department) => (
        <Box key={department.deptCode}>
          <Department department={department} />
        </Box>
      ))}
    </Box>
  )
}
