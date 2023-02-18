import { Box, Typography } from '@mui/material'
import { useScheduleStore } from '$stores/schedule'
import Schedule from '$components/Schedule'

/**
 * manage all currently added courses here
 */
export default function AddedCourses() {
  const { schedules, scheduleIndex } = useScheduleStore()

  const coursesWithSections = schedules[scheduleIndex]?.courses.map((course) => {
    return {
      ...course,
      sections: [course.section],
    }
  })

  const courses = coursesWithSections.reduce((accumulated, current) => {
    const found = accumulated.find(
      (existing) => existing.courseNumber === current.courseNumber && existing.deptCode === current.deptCode
    )
    if (found) {
      found.sections.push(current.section)
      return accumulated
    } else {
      return [...accumulated, current]
    }
  }, [] as typeof coursesWithSections)

  const totalUnits = courses.reduce((accumulated, current) => {
    return accumulated + parseInt(current.section.units, 10)
  }, 0)

  return (
    <Box>
      <Typography variant="h5" padding={2}>
        {schedules[scheduleIndex].scheduleName} ({totalUnits} units)
      </Typography>
      {courses.map((course, index) => (
        <Schedule key={index} course={course} term={course.term} />
      ))}
    </Box>
  )
}