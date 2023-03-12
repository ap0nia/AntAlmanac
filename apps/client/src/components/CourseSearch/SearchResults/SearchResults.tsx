import { Box, IconButton } from '@mui/material'
import { ArrowBack as ArrowBackIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import { useSearchStore } from '$stores/search'
import useSettingsStore from '$stores/settings'
import trpc from '$lib/trpc'
import School from '$components/School'

/**
 * renders the list of course search results
 */
export default function CourseList() {
  const { form, getParams, showResults, setShowResults } = useSearchStore()
  const { isDarkMode } = useSettingsStore()

  const query = trpc.websoc.search.useQuery(getParams(), { enabled: showResults })

  const noResultsSrc = isDarkMode ? '/no_results/dark.png' : '/no_results/light.png'
  const loadingSrc = isDarkMode ? '/loading/dark.gif' : '/loading/light.gif'

  /**
   * whether course body needs to manually search for more info
   * @remarks prop drilling goes brrr
   */
  const supplemental = form.ge !== 'ANY'

  const handleRefresh = () => {
    query.refetch()
  }

  const handleBack = () => {
    setShowResults(false)
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ padding: 1 }}>
        <IconButton onClick={handleBack} size="large">
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleRefresh} size="large">
          <RefreshIcon />
        </IconButton>
      </Box>
      {!query.isFetched && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box component="img" src={loadingSrc} alt="Loading!" />
        </Box>
      )}
      {query.isFetched &&
        (query.data?.schools.length ? (
          <Box>
            {query.data.schools.map((school) => (
              <School key={school.schoolName} school={school} supplemental={supplemental} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box component="img" src={noResultsSrc} alt="No results found :(" />
          </Box>
        ))}
    </Box>
  )
}