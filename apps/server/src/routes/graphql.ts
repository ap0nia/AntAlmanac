import { z } from 'zod'
import fetch from 'node-fetch'
import { procedure, router } from '../trpc'

const PETERPORTAL_GRAPHQL_ENDPOINT = 'https://api.peterportal.org/graphql'

const statsSchema = z.object({
  deptCode: z.string(),
  courseNumber: z.string(),
})

type statsData = z.TypeOf<typeof statsSchema>

interface GradesGraphQLResponse {
  data: {
    courseGrades: {
      aggregate: {
        average_gpa: number
        sum_grade_a_count: number
        sum_grade_b_count: number
        sum_grade_c_count: number
        sum_grade_d_count: number
        sum_grade_f_count: number
        sum_grade_np_count: number
        sum_grade_p_count: number
      }
    }
  }
}

function getQuery(course: statsData) {
  const query = `
      { courseGrades: grades(department: "${course.deptCode}", number: "${course.courseNumber}", ) {
          aggregate {
            sum_grade_a_count
            sum_grade_b_count
            sum_grade_c_count
            sum_grade_d_count
            sum_grade_f_count
            sum_grade_p_count
            sum_grade_np_count
            average_gpa
          }
      },
    }`
  return query
}

const graphqlRouter = router({
  stats: procedure.input(statsSchema).query(async ({ input }) => {
    const response = await fetch(`${PETERPORTAL_GRAPHQL_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: getQuery(input),
      }),
    })

    const data = (await response.json()) as GradesGraphQLResponse

    const grades = data.data.courseGrades.aggregate

    const datasets = Object.entries(grades)
      .filter(([key]) => key !== 'average_gpa')
      .map(([, value]) => value)

    return {
      datasets,
      grades,
    }
  }),
})

export default graphqlRouter
