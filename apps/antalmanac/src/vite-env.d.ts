/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.svg';

// Both of these variables should rarely be set manually
interface ImportMetaEnv {
    /**
     * Subdomain to use for API calls
     *
     * @example 'staging-123.api.antalmanac.com'
     */
    VITE_ENDPOINT?: string;

    /**
     * The local server to use for API calls
     *
     * @example 'http://localhost:8080'
     */
    VITE_LOCAL_SERVER?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
