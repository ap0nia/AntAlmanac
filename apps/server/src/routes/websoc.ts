import { z } from 'zod'
import { procedure, router } from '../trpc'
import { queryWebsoc } from '$services/schedule'

const websocRouter = router({
  search: procedure.input(z.any()).query(async ({ input }) => {
    const response = await queryWebsoc(input)
    return response
  })
})

export default websocRouter
