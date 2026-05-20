import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'

export type NewBusRoute = {
  busName: string
  from: string
  to: string
  time: string
  period: 'AM' | 'PM'
}

export type BusRoute = NewBusRoute & {
  id: string
}

export async function createBusRoute(payload: NewBusRoute) {
  const routesRef = collection(db, 'busRoutes')
  const docRef = await addDoc(routesRef, {
    ...payload,
    createdAt: serverTimestamp(),
  })

  return docRef.id
}

export async function getBusRoutesByStops(from: string, to: string) {
  const routesRef = collection(db, 'busRoutes')
  const routesQuery = query(
    routesRef,
    where('from', '==', from),
    where('to', '==', to)
  )
  const snapshot = await getDocs(routesQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as NewBusRoute),
  }))
}

let cachedStops: string[] | null = null

async function loadStops() {
  if (cachedStops) {
    return cachedStops
  }

  const routesRef = collection(db, 'busRoutes')
  const snapshot = await getDocs(routesRef)
  const stops = new Set<string>()

  snapshot.docs.forEach((doc) => {
    const data = doc.data() as Partial<NewBusRoute>
    if (data.from) {
      stops.add(data.from)
    }
    if (data.to) {
      stops.add(data.to)
    }
  })

  cachedStops = Array.from(stops)
  return cachedStops
}

export async function getStopSuggestions(queryText: string) {
  const queryValue = queryText.trim().toLowerCase()
  if (!queryValue) {
    return []
  }

  const stops = await loadStops()

  return stops
    .filter((stop) => stop.toLowerCase().includes(queryValue))
    .slice(0, 5)
}
