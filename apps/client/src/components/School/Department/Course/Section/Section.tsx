import { useSnackbar } from 'notistack'
import { Box, Button, Link, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import type { WebsocCourse, WebsocSection } from 'peterportal-api-next-types'
import type { Section } from '@packages/types'
import locations from '$lib/location_ids'
import { analyticsEnum } from '$lib/analytics'
import { useSearchStore } from '$stores/search'
import AddCourseButton from '$components/buttons/AddCourse'
import AddCourseMenuButton from '$components/buttons/AddCourseMenu'
import DeleteCourseButton from '$components/buttons/DeleteCourse'
import ColorPicker from '$components/buttons/ColorPicker'

const restrictions: Record<string, string> = {
  A: 'A: Prerequisite required',
  M: 'M: Non-major only',
  E: 'E: Freshmen only',
  G: 'G: Lower-division only',
  I: 'I: Seniors only',
  N: 'N: School major only',
  F: 'F: Sophomores only',
  O: 'O: Non-school major only',
  H: 'H: Juniors only',
  J: 'J: Upper-division only',
  C: 'C: Fee required',
  D: 'D: Pass/Not Pass option only',
  X: 'X: Separate authorization codes required to add, drop, or change enrollment',
  R: 'R: Biomedical Pass/Fail course (School of Medicine only)',
  K: 'K: Graduate only',
  S: 'S: Satisfactory/Unsatisfactory only',
  B: 'B: Authorization code required',
  L: 'L: Major only',
}

const SectionTypeColors: Record<string, string> = {
  Act: '#c87137',
  Col: '#ff40b5',
  Dis: '#8d63f0',
  Fld: '#1ac805',
  Lab: '#1abbe9',
  Lec: '#d40000',
  Qiz: '#8e5c41',
  Res: '#ff2466',
  Sem: '#2155ff',
  Stu: '#179523',
  Tap: '#8d2df0',
  Tut: '#ffc705',
}

const SectionStatusColors: Record<string, string> = {
  open: '#00c853',
  waitl: '#1c44b2',
  full: '#e53935',
}

/**
 * column 0
 * actions for managing the course, e.g. add, delete, change color, add to schedule #
 */
function CourseActions({ ...props }: { section: Section | WebsocSection; course: WebsocCourse; term?: string }) {
  const term = props.term || useSearchStore.getState()?.form?.term

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
      {'color' in props.section ? <DeleteCourseButton {...props} /> : <AddCourseButton {...props} />}
      {'color' in props.section ? (
        <ColorPicker
          color={props.section.color}
          sectionCode={props.section.sectionCode}
          analyticsCategory={analyticsEnum.addedClasses.title}
          term={term}
        />
      ) : (
        <AddCourseMenuButton {...props} />
      )}
    </Box>
  )
}

/**
 * column 1
 * section code that can be copied to clipboard on click
 */
function SectionCode(props: { section: WebsocSection }) {
  const { enqueueSnackbar } = useSnackbar()
  const { section } = props

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (window.isSecureContext) {
      navigator.clipboard.writeText(section.sectionCode.toString())
      enqueueSnackbar('Section code copied to clipboard', { variant: 'success' })
    }
  }

  return (
    <Tooltip title="Click to Copy Course Code">
      <Button onClick={handleClick}>{section.sectionCode}</Button>
    </Tooltip>
  )
}

/**
 * column 2
 * information about the course type, units, etc.
 */
function CourseDetails(props: { section: WebsocSection }) {
  const { section } = props
  return (
    <Box>
      <Typography variant="body2" whiteSpace="nowrap" color={SectionTypeColors[section.sectionType]}>
        {section.sectionType}
      </Typography>
      <Typography variant="body2" whiteSpace="nowrap">
        Sec: {section.sectionNum}
      </Typography>
      <Typography variant="body2" whiteSpace="nowrap">
        Units: {section.units}
      </Typography>
    </Box>
  )
}

/**
 * column 3
 * course instructors
 */
function CourseInstructors(props: { section: WebsocSection }) {
  const { section } = props
  return (
    <Box>
      {section.instructors.map((instructor) => {
        const lastName = instructor.substring(0, instructor.indexOf(','))
        if (!lastName || lastName === 'STAFF') {
          return (
            <Typography key={instructor} variant="body2">
              {instructor}
            </Typography>
          )
        }
        return (
          <Box key={instructor}>
            <Link
              href={`https://www.ratemyprofessors.com/search/teachers?sid=U2Nob29sLTEwNzQ=&query=${lastName}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              whiteSpace="nowrap"
            >
              {instructor}
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}

/**
 * column 5
 * course meeting days/times
 */
function CourseTimes({ section }: { section: WebsocSection }) {
  return (
    <Box>
      {section.meetings.map((meeting) => (
        <Typography variant="body2" key={Object.values(meeting).join()}>
          {`${meeting.days} ${meeting.time.replace(/\s/g, '').split('-').join(' - ')}`}
        </Typography>
      ))}
    </Box>
  )
}

/**
 * column 6
 * meeting locations and links to the map
 */
function CoursePlaces({ section }: { section: WebsocSection }) {
  return (
    <Box>
      {section.meetings.map((meeting) => {
        /**
         * TODO: old peterportal API returns string; new returns array, update when necessary
         */
        const bldg = Array.isArray(meeting.bldg) ? meeting.bldg[0] : meeting.bldg
        if (!meeting || bldg === 'TBA') {
          return (
            <Typography key={Object.values(meeting).join()} variant="body2">
              {meeting.bldg}
            </Typography>
          )
        }
        const locationId = locations[bldg.split(' ')[0] as keyof typeof locations]
        const href = locationId
          ? `https://map.uci.edu/?id=463#!m/${locationId}`
          : 'https://map.uci.edu/?id=463#!ct/12035,12033,11888,0,12034'
        return (
          <Link
            key={Object.values(meeting).join()}
            variant="body2"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
          >
            {meeting.bldg}
          </Link>
        )
      })}
    </Box>
  )
}

/**
 * column 7
 * course's current enrollment data
 */
function CourseEnrollment(props: { section: WebsocSection }) {
  const { section } = props
  return (
    <Box>
      <Typography variant="body2">
        {section.numCurrentlyEnrolled.totalEnrolled}/{section.maxCapacity}
      </Typography>
      <Typography variant="body2">
        {section.numOnWaitlist && 'WL: '}
        {section.numOnWaitlist}
      </Typography>
      <Typography variant="body2">
        {section.numNewOnlyReserved && 'NOR: '}
        {section.numNewOnlyReserved}
      </Typography>
    </Box>
  )
}

/**
 * column 8
 * course's restrictions
 */
function CourseRestrictions(props: { section: WebsocSection }) {
  const { section } = props
  return (
    <Box>
      <Tooltip
        title={section.restrictions
          .split(' ')
          .filter((r) => r !== 'and' && r !== 'or')
          .map((r) => (
            <Typography key={r}>{restrictions[r]}</Typography>
          ))}
      >
        <Link href="https://www.reg.uci.edu/enrollment/restrict_codes.html" target="_blank" rel="noopener noreferrer">
          {section.restrictions}
        </Link>
      </Tooltip>
    </Box>
  )
}

/**
 * clumn 9
 * course's current status, e.g. full, open
 */
function CourseStatus(props: { section: WebsocSection }) {
  const { section } = props
  return (
    <Typography variant="body2" color={SectionStatusColors[section.status?.toLowerCase() || '']}>
      {section.status}
    </Typography>
  )
}

interface Props {
  course: WebsocCourse
  section: WebsocSection
  term?: string
}

/**
 * renders a table showing everything about the course,
 * e.g. section code, instructors, times, enrollment status, etc.
 */
export default function Section({ section, course, term }: Props) {
  return (
    <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
      <TableCell>
        <CourseActions section={section} course={course} term={term} />
      </TableCell>
      <TableCell>
        <SectionCode section={section} />
      </TableCell>
      <TableCell>
        <CourseDetails section={section} />
      </TableCell>
      <TableCell>
        <CourseInstructors section={section} />
      </TableCell>
      <TableCell>
        <CourseTimes section={section} />
      </TableCell>
      <TableCell>
        <CoursePlaces section={section} />
      </TableCell>
      <TableCell>
        <CourseEnrollment section={section} />
      </TableCell>
      <TableCell>
        <CourseRestrictions section={section} />
      </TableCell>
      <TableCell>
        <CourseStatus section={section} />
      </TableCell>
    </TableRow>
  )
}
