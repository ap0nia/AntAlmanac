import { useEffect, useRef, useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material'

/**
 * button that opens menu with account controls
 */
export default function Account() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const [loggedIn, setLoggedIn] = useState(false)

  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (loggedIn) {
      return
    }

    window.google.accounts.id.initialize({
      client_id: '381900514017-40ti38q9heo7aghcaaotdo1repun1lma.apps.googleusercontent.com',
      ux_mode: 'popup',
      auto_select: true,
      callback(response) {
        console.log(response)
        setLoggedIn(true)
      },
      itp_support: true,
      context: 'use',
    })

    if (ref.current) {
      window.google.accounts.id.renderButton(ref.current, {
        type: 'icon',
        size: 'medium',
        shape: 'circle',
      })
    }
  }, [loggedIn])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(undefined)
  }

  const logout = () => {
    window.google.accounts.id.revoke('')
    setAnchorEl(undefined)
    setLoggedIn(false)
  }

  return (
    <>
      <Tooltip title="Account">
        {loggedIn ? (
          <IconButton color="inherit" onClick={handleClick} ref={ref}>
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box ref={ref} />
          </Box>
        )}
      </Tooltip>
      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
