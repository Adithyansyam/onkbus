import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getStopSuggestions } from '../services/busRoutes'

function Home() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([])
  const [toSuggestions, setToSuggestions] = useState<string[]>([])
  const navigate = useNavigate()
  const lastSelectedRef = useRef({ from: '', to: '' })

  useEffect(() => {
    if (from && from === lastSelectedRef.current.from) {
      setFromSuggestions([])
      return
    }

    let isActive = true
    const timeoutId = window.setTimeout(() => {
      getStopSuggestions(from)
        .then((results) => {
          if (isActive) {
            setFromSuggestions(results)
          }
        })
        .catch(() => {
          if (isActive) {
            setFromSuggestions([])
          }
        })
    }, 200)

    return () => {
      isActive = false
      window.clearTimeout(timeoutId)
    }
  }, [from])

  useEffect(() => {
    if (to && to === lastSelectedRef.current.to) {
      setToSuggestions([])
      return
    }

    let isActive = true
    const timeoutId = window.setTimeout(() => {
      getStopSuggestions(to)
        .then((results) => {
          if (isActive) {
            setToSuggestions(results)
          }
        })
        .catch(() => {
          if (isActive) {
            setToSuggestions([])
          }
        })
    }, 200)

    return () => {
      isActive = false
      window.clearTimeout(timeoutId)
    }
  }, [to])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!from.trim() || !to.trim()) {
      return
    }

    const params = new URLSearchParams({
      from: from.trim(),
      to: to.trim(),
    })

    navigate(`/results?${params.toString()}`)
  }

  return (
    <div className="page home-page">
      <section className="panel route-card">
        <div className="card-header">
          <p className="eyebrow"><span className="brand">onKbus</span></p>
          <h1 className="card-title">Where is my bus?</h1>
          <p className="card-subtitle">Choose your start and destination to reveal matching buses.</p>
        </div>

        <form className="route-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="fromStop">From</label>
            <input
              id="fromStop"
              name="fromStop"
              type="text"
              placeholder="Enter boarding stop"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              required
            />
            {fromSuggestions.length > 0 && (
              <ul className="suggestions" role="listbox" aria-label="From suggestions">
                {fromSuggestions.map((stop) => (
                  <li key={stop}>
                    <button
                      type="button"
                      className="suggestion-item"
                      onClick={() => {
                        setFrom(stop)
                        setFromSuggestions([])
                        lastSelectedRef.current.from = stop
                      }}
                    >
                      {stop}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-row">
            <label htmlFor="toStop">To</label>
            <input
              id="toStop"
              name="toStop"
              type="text"
              placeholder="Enter drop stop"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              required
            />
            {toSuggestions.length > 0 && (
              <ul className="suggestions" role="listbox" aria-label="To suggestions">
                {toSuggestions.map((stop) => (
                  <li key={stop}>
                    <button
                      type="button"
                      className="suggestion-item"
                      onClick={() => {
                        setTo(stop)
                        setToSuggestions([])
                        lastSelectedRef.current.to = stop
                      }}
                    >
                      {stop}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="primary-button" type="submit">Show buses</button>
          <p className="form-helper">Select both stops to view available buses.</p>
        </form>

        <div className="secondary-link">
          <Link to="/edit">Add new bus</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
