import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page home-page">
      <section className="panel route-card">
        <div className="card-header">
          <p className="eyebrow"><span className="brand">onKbus</span></p>
          <h1 className="card-title">Where is my bus?</h1>
          <p className="card-subtitle">Choose your start and destination to reveal matching buses.</p>
        </div>

        <form className="route-form">
          <div className="form-row">
            <label htmlFor="fromStop">From</label>
            <input id="fromStop" name="fromStop" type="text" placeholder="Enter boarding stop" />
          </div>
          <div className="form-row">
            <label htmlFor="toStop">To</label>
            <input id="toStop" name="toStop" type="text" placeholder="Enter drop stop" />
          </div>
          <button className="primary-button" type="button">Show buses</button>
          <p className="form-helper">Select both stops to view available buses.</p>
        </form>

        <div className="secondary-link">
          <Link to="/edit">Edit routes</Link>
        </div>
      </section>
    </div>
  )
}

export default Home
