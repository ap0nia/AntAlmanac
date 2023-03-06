import { Box, Typography } from '@mui/material'
import { useScheduleStore } from '$stores/schedule'
import Course from '$components/School/Department/Course'

/**
 * manage all currently added courses
 */
export default function AddedCourses() {
  const { schedules, scheduleIndex } = useScheduleStore()

  const coursesWithSections = schedules[scheduleIndex]?.courses.map((course) => ({
    ...course,
    sections: [course.section],
  }))

  const courses = coursesWithSections?.reduce((accumulated, current) => {
    const found = accumulated.find(
      (existing) => existing.courseNumber === current.courseNumber && existing.deptCode === current.deptCode
    )
    if (found) {
      found.sections.push({ ...current.section })
      return accumulated
    }
    const seggs = {
      ...current,
      sections: [{ ...current.section }],
    }
    return [...accumulated, seggs]
  }, [] as typeof coursesWithSections)

  const totalUnits = courses?.reduce((accumulated, current) => accumulated + parseInt(current.section.units, 10), 0)

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" padding={2}>
        {schedules[scheduleIndex]?.scheduleName} ({totalUnits} units)
      </Typography>
      {courses?.map((course) => (
        <Course key={course.courseNumber} course={course} term={course.term} supplemental={false} />
      ))}
    </Box>
  )
}
