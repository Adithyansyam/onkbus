import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

const places = [
  'Chennai',
  'Coimbatore',
  'Madurai',
  'Salem',
  'Tiruchirappalli',
  'Vellore',
]

const routes = [
  {
    from: 'Chennai',
    to: 'Madurai',
    buses: [
      { name: 'Kaveri Express', time: '06:30 AM', type: 'AC Sleeper' },
      { name: 'Southern Star', time: '09:15 AM', type: 'Semi Sleeper' },
      { name: 'Night Rider', time: '10:20 PM', type: 'Sleeper' },
    ],
  },
  {
    from: 'Coimbatore',
    to: 'Salem',
    buses: [
      { name: 'Blue Arrow', time: '07:10 AM', type: 'AC Seater' },
      { name: 'Hill Line', time: '01:45 PM', type: 'Seater' },
    ],
  },
  {
    from: 'Tiruchirappalli',
    to: 'Vellore',
    buses: [
      { name: 'East Coast', time: '05:40 AM', type: 'AC Seater' },
      { name: 'Crescent', time: '04:30 PM', type: 'Sleeper' },
    ],
  },
]

function App() {
  const navigate = useNavigate()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const matches = routes.filter(
    (route) => route.from === from && route.to === to
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasSearched(true)
  }

  const handleAddNewBus = () => {
    navigate('/add-new-bus')
  }

  const handleEditBusTiming = () => {
    window.alert('Edit bus timing clicked')
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">onKbus route guide</p>
        <h1>Find the bus route in seconds.</h1>
      </header>

      <section className="panel-grid">
        <div className="panel route-panel">
          <div className="panel-header">
            <h2>Where is my bus?</h2>
            <p>Choose your start and destination to reveal matching buses.</p>
          </div>

          <form className="route-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>From</span>
              <select value={from} onChange={(event) => setFrom(event.target.value)}>
                <option value="">Select boarding stop</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>To</span>
              <select value={to} onChange={(event) => setTo(event.target.value)}>
                <option value="">Select drop stop</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" disabled={!from || !to}>
              Show buses
            </button>
          </form>

          <div className="results">
            {!hasSearched && (
              <div className="results-footer">
                <p className="hint">Select both stops to view available buses.</p>
                <div className="card-actions">
                  <button type="button" className="card-action" onClick={handleAddNewBus}>
                    Add new bus
                  </button>
                  <button type="button" className="card-action" onClick={handleEditBusTiming}>
                    Edit bus timing
                  </button>
                </div>
              </div>
            )}
            {hasSearched && from && to && matches.length === 0 && (
              <p className="empty">No buses found on this route yet.</p>
            )}
            {hasSearched && matches.length > 0 && (
              <ul>
                {matches[0].buses.map((bus) => (
                  <li key={`${bus.name}-${bus.time}`}>
                    <div>
                      <h3>{bus.name}</h3>
                      <p>{bus.type}</p>
                    </div>
                    <span>{bus.time}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App