import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || ''

export default function MapView({ source, destination, driverLocation }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const directionsRenderer = useRef(null)
  const driverMarker = useRef(null)

  useEffect(() => {
    const loader = new Loader({ apiKey: GOOGLE_MAPS_KEY, version: 'weekly' })
    loader.load().then((google) => {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 20.5937, lng: 78.9629 },
        zoom: 5,
        mapTypeControl: false
      })
      directionsRenderer.current = new google.maps.DirectionsRenderer()
      directionsRenderer.current.setMap(mapInstance.current)
    })
  }, [])

  useEffect(() => {
    if (!source || !destination || !mapInstance.current) return
    const loader = new Loader({ apiKey: GOOGLE_MAPS_KEY, version: 'weekly' })
    loader.load().then((google) => {
      const service = new google.maps.DirectionsService()
      service.route(
        { origin: source, destination, travelMode: google.maps.TravelMode.DRIVING },
        (result, status) => {
          if (status === 'OK') directionsRenderer.current.setDirections(result)
        }
      )
    })
  }, [source, destination])

  useEffect(() => {
    if (!driverLocation || !mapInstance.current) return
    const loader = new Loader({ apiKey: GOOGLE_MAPS_KEY, version: 'weekly' })
    loader.load().then((google) => {
      const pos = { lat: driverLocation.lat, lng: driverLocation.lng }
      if (driverMarker.current) {
        driverMarker.current.setPosition(pos)
      } else {
        driverMarker.current = new google.maps.Marker({
          position: pos,
          map: mapInstance.current,
          title: 'Driver',
          label: '🚚'
        })
      }
      mapInstance.current.panTo(pos)
    })
  }, [driverLocation])

  return <div ref={mapRef} className="w-full h-80 rounded-xl shadow-md" />
}
