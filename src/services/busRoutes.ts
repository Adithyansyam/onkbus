import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export type NewBusRoute = {
  busName: string
  from: string
  to: string
  time: string
  period: 'AM' | 'PM'
}

export async function createBusRoute(payload: NewBusRoute) {
  const routesRef = collection(db, 'busRoutes')
  const docRef = await addDoc(routesRef, {
    ...payload,
    createdAt: serverTimestamp(),
  })

  return docRef.id
}
