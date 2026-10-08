// useDeviceOrientation.js
import { useState, useEffect } from 'react'

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    isLandscape: window.innerWidth > window.innerHeight,
    permissionGranted: false,
    isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent)
  })

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission()
        if (permission === 'granted') {
          setOrientation(prev => ({ ...prev, permissionGranted: true }))
          startListening()
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      // Android أو Desktop
      setOrientation(prev => ({ ...prev, permissionGranted: true }))
      startListening()
    }
  }

  const startListening = () => {
    window.addEventListener('deviceorientation', (e) => {
      // beta قريب من 0 = أفقي، قريب من 90 = عمودي
      const isLandscape = Math.abs(e.beta) < 45
      setOrientation(prev => ({ ...prev, isLandscape }))
    })
  }

  useEffect(() => {
    // fallback عبر resize لو ما اشتغل الـ deviceorientation
    const handleResize = () => {
      setOrientation(prev => ({
        ...prev,
        isLandscape: window.innerWidth > window.innerHeight
      }))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { ...orientation, requestPermission }
}