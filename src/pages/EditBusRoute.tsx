import { useState } from 'react'
import { createBusRoute } from '../services/busRoutes'

function EditBusRoute() {
  const [busName, setBusName] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [time, setTime] = useState('')
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      await createBusRoute({ busName, from, to, time, period })
      setBusName('')
      setFrom('')
      setTo('')
      setTime('')
      setPeriod('AM')
      alert('Route submitted')
    } catch (error) {
      console.error('Failed to save route', error)
      alert('Failed to save route. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page home-page">
      <section className="panel route-card">
        <div className="card-header">
          <p className="eyebrow"><span className="brand">onKbus</span> &mdash; Route Management</p>
          <h1 className="card-title">Add new bus</h1>
          <p className="card-subtitle">Add or update routes, timing, and bus types from this panel.</p>
        </div>

        <form className="route-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="busName">Bus name</label>
            <input
              id="busName"
              name="busName"
              type="text"
              value={busName}
              onChange={(e) => setBusName(e.target.value)}
              placeholder="Enter bus name"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="fromStop">From (place / district)</label>
            <input
              id="fromStop"
              name="fromStop"
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Enter origin"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="toStop">To (place / district)</label>
            <input
              id="toStop"
              name="toStop"
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Enter destination"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="busTime">Departure time</label>
            <div className="edit-time-row">
              <input
                id="busTime"
                className="edit-time-input"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g., 10:30"
                required
              />
              <div className="period-toggle" role="group" aria-label="AM/PM toggle">
                <button
                  type="button"
                  id="periodAM"
                  className={period === 'AM' ? 'toggle-btn active' : 'toggle-btn'}
                  onClick={() => setPeriod('AM')}
                >
                  AM
                </button>
                <button
                  type="button"
                  id="periodPM"
                  className={period === 'PM' ? 'toggle-btn active' : 'toggle-btn'}
                  onClick={() => setPeriod('PM')}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save route'}
          </button>
          <p className="form-helper">All fields are required to add or update a route.</p>
        </form>
      </section>
    </div>
  )
}

export default EditBusRoute
