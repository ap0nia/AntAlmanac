import { z } from 'zod'
import fetch from 'node-fetch'
import { procedure, router } from '../trpc'

// TODO: use this as CourseResponse when updated
// import type { Course } from 'peterportal-api-next-types'

const PETERPORTAL_REST_ENDPOINT = 'https://api.peterportal.org/rest/v0'

export interface CourseResponse {
  title: string
  description: string
  prerequisite_text: string
  prerequisite_for: string[]
  ge_list: string[]
}

const restRouter = router({
  course: procedure.input(z.string()).query(async ({ input }) => {
    const response = await fetch(`${PETERPORTAL_REST_ENDPOINT}/courses/${input}`)
    if (response.ok) {
      const jsonResp = (await response.json()) as CourseResponse
      return {
        title: jsonResp.title,
        prerequisite_text: jsonResp.prerequisite_text,
        prerequisite_for: jsonResp.prerequisite_for.join(', '),
        description: jsonResp.description,
        ge_list: jsonResp.ge_list.join(', '),
      }
    } else {
      return {
        title: 'No description available',
        prerequisite_text: '',
        prerequisite_for: '',
        description: '',
        ge_list: '',
      }
    }
  }),
})

export default restRouter
