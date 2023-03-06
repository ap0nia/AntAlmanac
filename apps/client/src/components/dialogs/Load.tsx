import { useState } from 'react'
import { useSnackbar } from 'notistack'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import useSettingsStore from '$stores/settings'
import { useScheduleStore } from '$stores/schedule'
import { analyticsEnum, logAnalytics } from '$lib/analytics'
import trpc from '$lib/trpc'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * dialog to load a schedule
 */
export default function LoadDialog({ open, setOpen }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [userID, setUserId] = useState('')
  const [remember, setRemember] = useState(false)
  const isDarkMode = useSettingsStore((store) => store.isDarkMode)
  const utils = trpc.useContext()
  const saved = useScheduleStore((store) => store.saved)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      logAnalytics({
        category: analyticsEnum.nav.title,
        action: analyticsEnum.nav.actions.LOAD_SCHEDULE,
        label: userID,
        value: remember ? 1 : 0,
      })

      if (
        userID == null ||
        (!saved && !window.confirm(`Are you sure you want to load a different schedule? You have unsaved changes!`))
      ) {
        return
      }

      if (remember) {
        window.localStorage.setItem('userID', userID)
      } else {
        window.localStorage.removeItem('userID')
      }

      const res = await utils.schedule.find.fetch(userID)
      useScheduleStore.setState(res)
      setLoading(false)
      setOpen(false)
      enqueueSnackbar(`Schedule for user ${userID} loaded!`, { variant: 'success' })
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: 'error' })
      }
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUserId(e.target.value)
  }

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>Load Schedule</DialogTitle>

      <DialogContent>
        <DialogContentText>Enter your username here to load your schedule.</DialogContentText>
        <TextField
          fullWidth
          onChange={handleChange}
          autoFocus
          margin="dense"
          label="User ID"
          type="text"
          placeholder="Enter here"
        />
        <FormControlLabel
          control={<Checkbox checked={remember} onChange={handleChecked} />}
          label="Remember Me (Uncheck on shared computers)"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} color={isDarkMode ? 'inherit' : 'primary'}>
          Cancel
        </Button>
        <LoadingButton onClick={handleSubmit} variant="contained" color="primary" loading={loading}>
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
