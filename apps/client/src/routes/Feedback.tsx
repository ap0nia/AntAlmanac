import { useEffect } from 'react'

export default function Feedback() {
  useEffect(() => {
    window.location.replace('https://forms.gle/k81f2aNdpdQYeKK8A')
  }, [])
  return null
}
