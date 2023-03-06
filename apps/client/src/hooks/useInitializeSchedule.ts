import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import trpc from '$lib/trpc'
import { useScheduleStore } from '$stores/schedule'

/**
 * load the user's schedule if the userId is in local storage
 * has to be in a component UNDER the snackbar provider, i.e. home page
 */
export default function useInitializeSchedule() {
  const { enqueueSnackbar } = useSnackbar()
  const utils = trpc.useContext()

  useEffect(() => {
    const userID = window.localStorage.getItem('userID')
    if (userID != null) {
      utils.schedule.find
        .fetch(userID)
        .then((res) => {
          useScheduleStore.setState(res)
          enqueueSnackbar(`Schedule for user ${userID} loaded!`, { variant: 'success' })
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: 'error' })
        })
    }
  }, [])

  return null
}
