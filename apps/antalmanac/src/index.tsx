import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * This function runs in the browser to load the single-page React application.
 */
async function main() {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        throw new Error('This function must be run in a browser, not in a Node.js environment.');
    }

    const rootElementId = 'root';

    const rootElement = document.getElementById(rootElementId);

    if (!rootElement) {
        throw new Error(`Please create an element with id ${rootElementId}`);
    }

    createRoot(rootElement).render(<App />);
}

main();
