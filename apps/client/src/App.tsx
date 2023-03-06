/**
 * import all stylesheets here for the Vite React app
 * so that the rest of the app is compatible with NextJS
 */
import 'leaflet/dist/leaflet.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import '$components/Calendar/Calendar.css'
import '$components/Map/Map.css'
import './App.css'

import { SnackbarProvider } from 'notistack'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '$routes/Home'
import AppThemeProvider from '$providers/Theme'
import AppQueryProvider from '$providers/Query'
import Header from '$components/Header'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

export default function App() {
  return (
    <AppQueryProvider>
      <AppThemeProvider>
        <SnackbarProvider>
          <Header />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </AppThemeProvider>
    </AppQueryProvider>
  )
}
