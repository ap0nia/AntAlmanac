import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material'
import type { Section, Course } from '@packages/types'
import { useScheduleStore } from '$stores/schedule'
import { addCourse, addCourseToAllSchedules } from '$stores/schedule/course'

interface Props {
  section: Section
  course: Course
}

/**
 * button that opens a dropdown to add the provided course to a target schedule(s)
 */
export default function AddCourseMenuButton({ section, course }: Props) {
  const schedules = useScheduleStore((store) => store.schedules)
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  const handleAddAll = () => {
    addCourseToAllSchedules(section, course)
  }

  /**
   * returns function that will add a course to the schedule at the specified index
   */
  const handleAdd = (index: number) => () => {
    addCourse(section, course, index)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        {schedules.map((schedule, index) => (
          <MenuItem key={schedule.scheduleName} onClick={handleAdd(index)}>
            {schedule.scheduleName}
          </MenuItem>
        ))}
        <MenuItem onClick={handleAddAll}>Add to all schedules</MenuItem>
      </Menu>
    </>
  )
}
