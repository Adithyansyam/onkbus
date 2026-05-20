import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB1EbH9k20h-Wmy0jrrWRc4wfcg9IFdZbk',
  authDomain: 'onkbus.firebaseapp.com',
  projectId: 'onkbus',
  storageBucket: 'onkbus.firebasestorage.app',
  messagingSenderId: '1098995622160',
  appId: '1:1098995622160:web:859cc44348b72484490595',
  measurementId: 'G-ZZTZ8XL5R2',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app)
  }
})
