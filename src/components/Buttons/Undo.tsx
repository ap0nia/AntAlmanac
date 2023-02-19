import { IconButton } from '@mui/material'
import { Undo as UndoIcon } from '@mui/icons-material'
import { undo } from '$stores/schedule/course'

export default function UndoDeleteButton() {
  function handleClick() {
    undo()
  }

  return (
    <IconButton onClick={handleClick} size="small">
      <UndoIcon />
    </IconButton>
  )
}