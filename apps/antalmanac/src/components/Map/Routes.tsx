import { useEffect } from 'react'
import L from 'leaflet'
import type { LatLngTuple } from 'leaflet'
import { useMap } from 'react-leaflet'
import 'leaflet-routing-machine'
import { createElementHook, createElementObject, useLeafletContext } from '@react-leaflet/core'
import type { LeafletContextInterface } from '@react-leaflet/core'

const ACCESS_TOKEN = 'pk.eyJ1IjoicGVkcmljIiwiYSI6ImNsZzE0bjk2ajB0NHEzanExZGFlbGpwazIifQ.l14rgv5vmu5wIMgOUUhUXw';

interface ClassRoutesProps {
  /**
   * Waypoints needs to be `L.Routing.Waypoint[]` or `LatLng[]` when creating an `L.Routing.plan`.
   * For ease of use from outside, pass in a valid `LatLngTuple[]`, and convert to LatLng inside.
   * @example [[33.6405, -117.8443], [33.6405, -117.8443]]
   */
  latLngTuples: LatLngTuple[]

  /**
   * Color of line for this route.
   */
  color?: string
}

/**
 * Use react-leaflet's core API to manage lifecycle of leaflet elements properly.
 * @see {@link https://react-leaflet.js.org/docs/core-architecture/#element-hook-factory}
 */
function createRouter(props: ClassRoutesProps, context: LeafletContextInterface) {
  const latLngTuples = props.latLngTuples || []

  /**
   * Convert each tuple to an actual `LatLng` object.
   */
  const waypoints = latLngTuples.map((latLngTuple) => L.latLng(latLngTuple))

  const routerControl = L.Routing.control({
    router: L.Routing.mapbox(ACCESS_TOKEN, {
      /**
       * Default is mapbox/driving. More options:
       * @see {@link https://docs.mapbox.com/api/navigation/directions/#routing-profiles}
       */
      profile: 'mapbox/walking',
    }),

    /**
     * When searching a location, it yanks control of the map;
     * not turning this off will screw that up since it refuses to allow the routes to go offscreen.
     */
    fitSelectedRoutes: false,

    plan: L.Routing.plan(waypoints, {
      addWaypoints: false,
      createMarker: () => false,
    }),

    routeLine(route) {
      const line = L.Routing.line(route, {
        addWaypoints: false,
        extendToWaypoints: true,
        missingRouteTolerance: 0,
        styles: [
          { color: 'skyblue', opacity: 0.5, weight: 30 }, // invisble line extends the range of click/hover events
          { color: props.color, weight: 3 },
        ],
      })

      const totalTime = route.summary?.totalTime || 0
      const totalDistance = route.summary?.totalDistance || 0

      const duration = totalTime > 30 ? `${Math.round(totalTime / 60)} min` : '<1 min'
      const miles = `${Math.floor(totalDistance / 1.609 / 10) / 100} mi`

      const content = `
       <div style="position:relative; 
                  top: -200%;
                  left:2px;
                  pointer-events: none;
                  background-color: white;
                  border-left-color: ${props.color};
                  border-left-style: solid;
                  width: fit-content;
                  border-left-width: 5px;
                  padding-left: 10px;
                  padding-right: 10px;
                  padding-top: 4px;
                  padding-bottom: 4px;"
       />
       <span style="color:${props.color}">${duration}</span>
       <br>
       <span style="color:#888888">${miles}</span>
      `
      const popup = L.popup({ content })

      /**
       * @see {@link https://github.com/perliedman/leaflet-routing-machine/issues/117}
       */
      line.eachLayer((lineLayer) => {
        lineLayer.on('click', (leafletMouseEvent) => {
          popup.setLatLng(leafletMouseEvent.latlng).openOn(context.map)
        })
        lineLayer.on('mouseover', (leafletMouseEvent) => {
          popup.setLatLng(leafletMouseEvent.latlng).openOn(context.map)
        })
        lineLayer.on('mousemove', (leafletMouseEvent) => {
          popup.setLatLng(leafletMouseEvent.latlng).openOn(context.map)
        })
        lineLayer.on('mouseout', () => {
          popup.close()
        })
      })

      return line
    },
  })

  const router = createElementObject(routerControl, context)
  return router
}

/**
 * Turn the createRouter function into a hook for the main component.
 */
const useRouter = createElementHook(createRouter)

/**
 * Given waypoints of a route and a color for the route, draw a route to the map.
 * Forward the props to a custom hook that manages the leaflet element's lifecycle.
 */
export default function ClassRoutes(props: ClassRoutesProps) {
  const context = useLeafletContext()
  const routerRef = useRouter(props, context)

  useEffect(() => {
    routerRef.current.instance.addTo(context.map)
    routerRef.current.instance.hide()
    return () => {
      routerRef.current.instance.remove()
    }
  }, [])

  return null
}