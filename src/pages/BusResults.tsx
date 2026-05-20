import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getBusRoutesByStops } from '../services/busRoutes'
import type { BusRoute } from '../services/busRoutes'

function BusResults() {
  const [searchParams] = useSearchParams()
  const [routes, setRoutes] = useState<BusRoute[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const from = useMemo(() => searchParams.get('from')?.trim() ?? '', [searchParams])
  const to = useMemo(() => searchParams.get('to')?.trim() ?? '', [searchParams])

  useEffect(() => {
    let isActive = true

    if (!from || !to) {
      setRoutes([])
      setIsLoading(false)
      setErrorMessage('Please provide both stops to search.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    getBusRoutesByStops(from, to)
      .then((result) => {
        if (!isActive) {
          return
        }
        setRoutes(result)
      })
      .catch((error) => {
        if (!isActive) {
          return
        }
        console.error('Failed to fetch bus routes', error)
        setErrorMessage('Unable to load buses. Please try again.')
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [from, to])

  return (
    <div className="page home-page">
      <section className="panel route-card">
        <div className="card-header">
          <p className="eyebrow"><span className="brand">onKbus</span> &mdash; Results</p>
          <h1 className="card-title">Available buses</h1>
          <p className="card-subtitle">From {from || '...'} to {to || '...'}</p>
        </div>

        {isLoading && <p className="form-helper">Loading matching buses...</p>}
        {!isLoading && errorMessage && <p className="form-helper">{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <div className="results-list">
            {routes.length === 0 ? (
              <p className="form-helper">No buses found for this route.</p>
            ) : (
              routes.map((route) => (
                <div className="result-item" key={route.id}>
                  <div>
                    <p className="result-title">{route.busName}</p>
                    <p className="result-meta">{route.from} &rarr; {route.to}</p>
                  </div>
                  <p className="result-time">{route.time} {route.period}</p>
                </div>
              ))
            )}
          </div>
        )}

        <div className="secondary-link">
          <Link to="/">Search again</Link>
        </div>
      </section>
    </div>
  )
}

export default BusResults
