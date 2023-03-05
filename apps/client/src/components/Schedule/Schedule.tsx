import { Typography } from '@mui/material'
import type { School, Department, AACourse } from '$lib/peterportal.types'
import SchoolCard from './School'
import DepartmentCard from './Department'
import CourseCard from './Course'

interface Props {
  course: School | Department | AACourse
  term?: string

  /**
   * whether course body needs to manually search for more info
   */
  supplemental?: boolean
}

/**
 * renders a row in the list of course search results;
 */
export default function Schedule({ course, term, supplemental }: Props) {
  /**
   * course is School
   */
  if ('departments' in course) {
    return <SchoolCard school={course} />
  }

  /**
   * course is Department
   */
  if ('deptName' in course) {
    return <DepartmentCard department={course} />
  }

  /**
   * course is AACourse
   */
  if ('courseNumber' in course) {
    return <CourseCard course={course} term={term} supplemental={supplemental} />
  }

  /**
   * shouldn't ever get here
   */
  return <Typography color="error">Error!</Typography>
}
