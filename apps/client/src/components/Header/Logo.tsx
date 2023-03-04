import { useTheme, useMediaQuery } from '@mui/material'

/**
 * responsive logo that changes based on screen size
 */
export default function Logo() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  if (isMobile) {
    return (
      <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 131.25 60.7">
        <path
          d="m0,43.52c.44-.99.94-1.95,1.48-2.89.77-1.31,2.33-1.93,3.79-1.49,7.72,1.56,15.46,3,23.2,4.54.66.13,1.38.31,1.85-.45.51-.62.41-1.53-.21-2.04-.23-.18-.5-.3-.79-.32l-18.32-3.53c-1.46-.29-2.91-.66-4.38-1-.84-.19-1.19-.74-.92-1.51.34-1.05.8-2.05,1.36-3,.77-1.2,2.25-1.74,3.62-1.32l22,4.36c1,.21,1.59-.13,1.76-1s-.23-1.33-1.29-1.54c-6.91-1.37-13.82-2.73-20.72-4.1-.88-.17-1.17-.61-1-1.42.24-1.82,1.25-3.44,2.76-4.47.83-.55,1.85-.72,2.81-.48,6.47,1.3,13,2.57,19.43,3.84,1.07.21,1.44,0,1.7-.91s0-1.48-1-1.68c-3.72-.75-7.45-1.47-11.18-2.2l-4.77-.93c-1.45-.28-1.73-1-.77-2.11,4.07-4.86,8.95-8.97,14.42-12.17,3.48-2.05,7.17-3.72,11-5,5.2-1.64,10-.52,13,4.74l9.07-2.63.27.33c-.25.09-.49.22-.71.37-3.39,2.9-4.64,7.58-3.14,11.78,1.76,4.13,5.7,6.9,10.18,7.16,3.85.34,7.61-1.28,10-4.31,4.27-5.24,2.21-13.25-4.12-16.33l-.91-.44v-.24h.9c5.09.2,10.15.84,15.13,1.92,4.29.87,8.63,1.61,13,2.18,3.94.48,7.94.27,11.81-.62,2.2-.55,4.5-.51,6.68.11,1.11.37,2.13.97,3,1.76,1.61,1.49,1.64,3.35.3,5.1-1.13,1.35-2.59,2.39-4.24,3-6.05,2.55-12.21,4.9-18.13,7.72-14.89,7.12-28.31,16.97-39.58,29.02-1.92,2-3.59,4.3-5.35,6.48-.94,1.33-2.26,2.34-3.79,2.9h-2.62c-2.18-.48-4.11-1.74-5.44-3.53-.93-1.28-1.73-2.65-2.4-4.09-.77-1.7-1.28-3.52-1.94-5.36-.13.28-.26.55-.38.82-1.07,2.56-2.64,4.89-4.62,6.84-3.79,3.58-8.62,2.57-11.88.16-.88-.58-1.42-1.55-1.44-2.61.07-.79-.52-1.49-1.31-1.56h-.08l-21.18-4.14c-1.97-.42-3.91-.85-5.91-1.29,0,0,0-2.42,0-2.42Z"
          fill="#fff"
        />
        <path
          d="m36.15,54.21c1.3.14,2.57-.45,3.29-1.54.19-.34.24-1.1.06-1.22-.46-.25-.98-.35-1.5-.28-.39,0-.73.46-1.12.62-.87.37-1.87.09-2.42-.68-.57-.69-.5-1.69.15-2.3.47-.52,1.05-.95,1.69-1.24.72-.32.83-.82.47-1.3-.33-.34-.8-.5-1.27-.46-2.32.24-4.01,2.31-3.77,4.63h0c.17,2.29,1.88,3.74,4.42,3.77Z"
          fill="#fff"
        />
        <path
          d="m44.28,33.81c1.17.03,2.27-.54,2.92-1.51.21-.34.25-1.2.09-1.27-.5-.22-1.06-.3-1.6-.23-.39.05-.73.45-1.13.6-.85.31-1.8,0-2.32-.73-.53-.67-.47-1.63.13-2.23.55-.48,1.13-.93,1.73-1.34.27-.23.65-.62.6-.84-.14-.38-.43-.68-.8-.84-.33-.09-.68-.07-1,.05-2.21.46-3.68,2.56-3.36,4.79.25,2.12,2.01,3.55,4.74,3.55Z"
          fill="#fff"
        />
        <path
          d="m40.5,44.13c1.27.14,2.51-.43,3.24-1.48.23-.4.26-.88.08-1.31-.35-.5-1.04-.62-1.53-.27-.02,0-.03.02-.05.04-.32.21-.65.41-1,.57-.88.4-1.93.12-2.5-.66-.54-.71-.42-1.72.26-2.29.47-.52,1.05-.94,1.69-1.23.68-.3.82-.81.5-1.24-.35-.35-.83-.54-1.32-.5-2.29.22-3.96,2.25-3.74,4.54,0,.06,0,.13.02.19.11,2.19,1.85,3.61,4.35,3.64Z"
          fill="#fff"
        />
        <path
          d="m51.27,27.25c-.25,1-.23,1,.58,1.21,2.85.65,5.78-.69,7.15-3.27,1.6-2.93,2.4-6.24,2.29-9.58-.09-.31-.33-.55-.64-.63-.32.08-.57.31-.67.62-.19,1.1-.22,2.22-.41,3.32-.29,2.36-1.17,4.61-2.57,6.54-1.14,1.57-3.11,2.31-5,1.86-.24-.04-.49-.06-.73-.07Z"
          fill="#fff"
        />
        <path
          d="m60.79,12.74c.65.02,1.19-.48,1.21-1.13v-.1c0-.67-.54-1.22-1.21-1.23h-.04c-.68-.02-1.26.51-1.28,1.2v.12c.02.71.53,1.14,1.32,1.14Z"
          fill="#fff"
        />
        <path
          d="m75,2.89c4.72-.02,8.7,3.51,9.24,8.19.36,3.74-1.95,7.21-5.54,8.32-2.39.8-4.98.72-7.32-.2-3.31-1.08-5.5-4.22-5.38-7.7.05-3.77,2.57-7.06,6.2-8.09.93-.25,1.89-.35,2.8-.52Zm6.73,6.59c-1.37,5.1-4.51,7.49-9.71,7.16,1.94,1.5,4.61,1.63,6.69.32,2.57-1.39,3.67-3.96,3.06-7.48,0,0-.04,0-.04,0Z"
          fill="#fff"
        />
      </svg>
    )
  }

  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="269" height="40" viewBox="0 0 400 60.7">
      <g id="_0Pee7b.tif">
        <path
          d="m0,43.52c.44-.99.94-1.95,1.48-2.89.77-1.31,2.33-1.93,3.79-1.49,7.72,1.56,15.46,3,23.2,4.54.66.13,1.38.31,1.85-.45.51-.62.41-1.53-.21-2.04-.23-.18-.5-.3-.79-.32l-18.32-3.53c-1.46-.29-2.91-.66-4.38-1-.84-.19-1.19-.74-.92-1.51.34-1.05.8-2.05,1.36-3,.77-1.2,2.25-1.74,3.62-1.32l22,4.36c1,.21,1.59-.13,1.76-1s-.23-1.33-1.29-1.54c-6.91-1.37-13.82-2.73-20.72-4.1-.88-.17-1.17-.61-1-1.42.24-1.82,1.25-3.44,2.76-4.47.83-.55,1.85-.72,2.81-.48,6.47,1.3,13,2.57,19.43,3.84,1.07.21,1.44,0,1.7-.91s0-1.48-1-1.68c-3.72-.75-7.45-1.47-11.18-2.2l-4.77-.93c-1.45-.28-1.73-1-.77-2.11,4.07-4.86,8.95-8.97,14.42-12.17,3.48-2.05,7.17-3.72,11-5,5.2-1.64,10-.52,13,4.74l9.07-2.63.27.33c-.25.09-.49.22-.71.37-3.39,2.9-4.64,7.58-3.14,11.78,1.76,4.13,5.7,6.9,10.18,7.16,3.85.34,7.61-1.28,10-4.31,4.27-5.24,2.21-13.25-4.12-16.33l-.91-.44v-.24h.9c5.09.2,10.15.84,15.13,1.92,4.29.87,8.63,1.61,13,2.18,3.94.48,7.94.27,11.81-.62,2.2-.55,4.5-.51,6.68.11,1.11.37,2.13.97,3,1.76,1.61,1.49,1.64,3.35.3,5.1-1.13,1.35-2.59,2.39-4.24,3-6.05,2.55-12.21,4.9-18.13,7.72-14.89,7.12-28.31,16.97-39.58,29.02-1.92,2-3.59,4.3-5.35,6.48-.94,1.33-2.26,2.34-3.79,2.9h-2.62c-2.18-.48-4.11-1.74-5.44-3.53-.93-1.28-1.73-2.65-2.4-4.09-.77-1.7-1.28-3.52-1.94-5.36-.13.28-.26.55-.38.82-1.07,2.56-2.64,4.89-4.62,6.84-3.79,3.58-8.62,2.57-11.88.16-.88-.58-1.42-1.55-1.44-2.61.07-.79-.52-1.49-1.31-1.56-.03,0-.05,0-.08,0l-21.18-4.14c-1.97-.42-3.91-.85-5.91-1.29v-2.42Zm36.15,10.69c1.3.14,2.57-.45,3.29-1.54.19-.34.24-1.1.06-1.22-.46-.25-.98-.35-1.5-.28-.39,0-.73.46-1.12.62-.87.37-1.87.09-2.42-.68-.57-.69-.5-1.69.15-2.3.47-.52,1.05-.95,1.69-1.24.72-.32.83-.82.47-1.3-.33-.34-.8-.5-1.27-.46-2.32.24-4.01,2.31-3.77,4.63,0,0,0,0,0,0,.17,2.29,1.88,3.74,4.42,3.77Zm8.13-20.4c1.17.03,2.27-.54,2.92-1.51.21-.34.25-1.2.09-1.27-.5-.22-1.06-.3-1.6-.23-.39.05-.73.45-1.13.6-.85.31-1.8,0-2.32-.73-.53-.67-.47-1.63.13-2.23.55-.48,1.13-.93,1.73-1.34.27-.23.65-.62.6-.84-.14-.38-.43-.68-.8-.84-.33-.09-.68-.07-1,.05-2.21.46-3.68,2.56-3.36,4.79.25,2.12,2.01,3.55,4.74,3.55Zm-3.78,10.32c1.27.14,2.51-.43,3.24-1.48.23-.4.26-.88.08-1.31-.35-.5-1.04-.62-1.53-.27-.02.01-.03.02-.05.04-.32.21-.65.41-1,.57-.88.4-1.93.12-2.5-.66-.54-.71-.42-1.72.26-2.29.47-.52,1.05-.94,1.69-1.23.68-.3.82-.81.5-1.24-.35-.35-.83-.54-1.32-.5-2.29.22-3.96,2.25-3.74,4.54,0,.06.01.13.02.19.11,2.19,1.85,3.61,4.35,3.64Zm10.77-16.88c-.25,1-.23,1,.58,1.21,2.85.65,5.78-.69,7.15-3.27,1.6-2.93,2.4-6.24,2.29-9.58-.09-.31-.33-.55-.64-.63-.32.08-.57.31-.67.62-.19,1.1-.22,2.22-.41,3.32-.29,2.36-1.17,4.61-2.57,6.54-1.14,1.57-3.11,2.31-5,1.86-.24-.04-.49-.06-.73-.07Zm9.52-14.51c.65.02,1.19-.48,1.21-1.13,0-.03,0-.07,0-.1,0-.67-.54-1.22-1.21-1.23-.01,0-.03,0-.04,0-.68-.02-1.26.51-1.28,1.2,0,.04,0,.08,0,.12.02.71.53,1.14,1.32,1.14Z"
          fill="#fff"
        />
        <path
          d="m400,42.96c-2.52,1.52-5.43,2.25-8.37,2.09-6.84-.25-12.19-5.99-11.95-12.84,0-.11,0-.22.02-.33.23-5.75,3.23-10.24,8.13-11.94,3.93-1.39,8.27-.92,11.82,1.26-.47,1.08-.91,2.1-1.38,3.21-2.6-1.6-5.27-2.47-8.27-1.6-1.96.58-3.67,1.8-4.84,3.48-2.62,3.81-2.46,8.88.39,12.52,2.47,2.93,8.22,4.3,12.94,1.14.51.94,1,1.89,1.51,2.83v.18Z"
          fill="#fff"
        />
        <path
          d="m296.56,44.81h-3.31v-16l-.21-.07-9.18,13-9.18-12.75v15.76h-3.3v-26.11l12.52,17.64,12.66-17.61v26.14Z"
          fill="#fff"
        />
        <path d="m186,45.69l-18.67-18.83v17.95h-3.33v-26.25l18.66,19.12v-18.19h3.34v26.2Z" fill="#fff" />
        <path d="m328.66,18.58l18.66,19.11v-18.18h3.34v26.19l-18.6-18.81v17.85h-3.4v-26.16Z" fill="#fff" />
        <path
          d="m75,2.89c4.72-.02,8.7,3.51,9.24,8.19.36,3.74-1.95,7.21-5.54,8.32-2.39.8-4.98.72-7.32-.2-3.31-1.08-5.5-4.22-5.38-7.7.05-3.77,2.57-7.06,6.2-8.09.93-.25,1.89-.35,2.8-.52Zm6.73,6.59c-1.37,5.1-4.51,7.49-9.71,7.16,1.94,1.5,4.61,1.63,6.69.32,2.57-1.39,3.67-3.96,3.06-7.48h-.04Z"
          fill="#fff"
        />
        <path
          d="m366.83,18.44l11.1,26.37h-3.55c-.23,0-.54-.35-.65-.6-.74-1.78-1.46-3.57-2.14-5.37-.11-.45-.54-.74-1-.68h-8.25c-.46-.05-.89.25-1,.7-.69,1.8-1.46,3.57-2.15,5.37-.1.45-.55.73-1,.63h-2.72c3.73-8.87,7.42-17.63,11.1-26.39l.26-.03Zm3.3,16.67c-1.21-3.08-2.36-6-3.57-9.11-1.28,3.14-2.48,6.09-3.7,9.11h7.27Z"
          fill="#fff"
        />
        <path
          d="m244.81,44.81h-3.54c-.3-.08-.54-.3-.66-.58-.74-1.77-1.45-3.56-2.13-5.36-.1-.46-.53-.77-1-.72h-8.33c-.45-.08-.89.2-1,.65-.7,1.8-1.46,3.57-2.15,5.36-.1.46-.54.75-1,.68h-2.67c3.72-8.86,7.41-17.62,11.1-26.38h.25l11.13,26.35Zm-7.81-9.68c-1.19-3-2.34-6-3.57-9.13l-3.7,9.13h7.27Z"
          fill="#fff"
        />
        <path
          d="m323.86,44.81h-3.53c-.3-.08-.55-.29-.67-.58-.74-1.78-1.44-3.57-2.12-5.37-.11-.45-.54-.75-1-.71h-8.33c-.44-.05-.84.23-.95.66-.7,1.8-1.46,3.57-2.16,5.36-.1.46-.54.75-1,.68h-2.67l11.07-26.42h.25l11.11,26.38Zm-11.38-18.81l-3.69,9.09h7.21c-1.14-3.01-2.27-5.91-3.52-9.09Z"
          fill="#fff"
        />
        <path
          d="m159.16,44.81h-3.6c-.22,0-.51-.38-.62-.65-.71-1.72-1.39-3.45-2.06-5.19-.09-.54-.6-.9-1.14-.82h-8.14c-.5-.06-.97.26-1.09.75-.67,1.8-1.4,3.58-2.2,5.34-.18.31-.5.52-.85.57-.92.05-1.84.05-2.76,0l11.09-26.36h.26l11.11,26.36Zm-7.81-9.7l-3.57-9.1-3.69,9.1h7.26Z"
          fill="#fff"
        />
        <path d="m198.08,22.81h-6.55v-3.31h16.75v3.23h-6.69v22h-3.51v-21.92Z" fill="#fff" />
        <path d="m252.88,41.5h12.93v3.31h-16.23v-25.31h3.3v22Z" fill="#fff" />
      </g>
    </svg>
  )
}
