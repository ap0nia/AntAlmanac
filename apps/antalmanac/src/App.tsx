import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import ReactGA4 from 'react-ga4';

import { undoDelete } from './actions/AppStoreActions';
import AppQueryProvider from './providers/Query';
import AppThemeProvider from './providers/Theme';

import Home from './routes/Home';
import Feedback from './routes/Feedback'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:tab',
    element: <Home />
  },
  {
    path: '/feedback',
    element: <Feedback />
  }
])

/**
 * renders the single page application
 */
export default function App() {
  useEffect(() => {
    document.addEventListener('keydown', undoDelete, false);
    ReactGA4.initialize('G-30HVJXC2Y4');
    ReactGA4.send('pageview');
    return () => {
      document.removeEventListener('keydown', undoDelete, false);
    };
  }, []);

  return (
    <AppQueryProvider>
      <AppThemeProvider>
        <SnackbarProvider>
          <RouterProvider router={BrowserRouter} />
        </SnackbarProvider>
      </AppThemeProvider>
    </AppQueryProvider>
  );
}
