import { useState } from 'react'
import Split from 'react-split'
import { Box, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import {
  FormatListBulleted as BulletListIcon,
  MyLocation as MyLocationIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import Calendar from '$components/Calendar'
import CourseSearch from '$components/CourseSearch'
import AddedCourses from '$components/AddedCourses'
import Map from '$components/Map'

export default function Home() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileTab, setMobileTab] = useState(0)
  const [tab, setTab] = useState(0)

  /**
   * on mobile, switch between calendar and classes panel
   */
  const handleMobileTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setMobileTab(newValue)
  }

  /**
   * switch between tabs within the classes panel
   */
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue)
  }

  /**
   * on mobile screen, only either the calendar or class panel can be visible at once
   */
  if (isMobile) {
    return (
      <>
        <Tabs value={mobileTab} onChange={handleMobileTabChange} variant="fullWidth">
          <Tab label="Calendar" />
          <Tab label="Courses" />
        </Tabs>
        <Box
          sx={{
            height: 'calc(100vh - 112px)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          {mobileTab === 0 && <Calendar />}
          {mobileTab === 1 && (
            <>
              <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ height: 48 }}>
                <Tab
                  label="Course Search"
                  icon={<SearchIcon />}
                  iconPosition="start"
                  sx={{ minHeight: 0, height: 48 }}
                />
                <Tab
                  label="Added Courses"
                  icon={<BulletListIcon />}
                  iconPosition="start"
                  sx={{ minHeight: 0, height: 48 }}
                />
                <Tab label="Map" icon={<MyLocationIcon />} iconPosition="start" sx={{ minHeight: 0, height: 48 }} />
              </Tabs>
              {tab === 0 && <CourseSearch />}
              {tab === 1 && <AddedCourses />}
              {tab === 2 && <Map />}
            </>
          )}
        </Box>
      </>
    )
  }

  return (
    <Split
      sizes={[50, 50]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      style={{ display: 'flex', height: 'calc(100vh - 64px)' }}
      gutterStyle={() => ({ backgroundColor: theme.palette.primary.main, width: '10px' })}
    >
      <Box sx={{ overflowY: 'auto' }}>
        <Calendar />
      </Box>

      {/** the Box with Map MUST be flexed; since the Map uses flexGrow to size its height */}
      <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Tabs value={tab} onChange={handleTabChange} variant="fullWidth" sx={{ height: 48 }}>
          <Tab label="Course Search" icon={<SearchIcon />} iconPosition="start" sx={{ minHeight: 0, height: 48 }} />
          <Tab label="Added Courses" icon={<BulletListIcon />} iconPosition="start" sx={{ minHeight: 0, height: 48 }} />
          <Tab label="Map" icon={<MyLocationIcon />} iconPosition="start" sx={{ minHeight: 0, height: 48 }} />
        </Tabs>
        {tab === 0 && <CourseSearch />}
        {tab === 1 && <AddedCourses />}
        {tab === 2 && <Map />}
      </Box>
    </Split>
  )
}
