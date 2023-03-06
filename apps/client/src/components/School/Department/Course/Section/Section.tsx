import { Box } from '@mui/material'
import type { WebsocSection } from 'peterportal-api-next-types'

interface Props {
  section: WebsocSection
}

export default function Section({ section }: Props) {
  return (
    <Box>
      {JSON.stringify(section)}
    </Box>
  )
}
