import { Link } from 'react-router-dom'

function EditBusRoute() {
  return (
    <div className="page edit-page">
      <div className="topbar">
        <Link className="menu-button menu-button-text" to="/" aria-label="Back to home">
          Back
        </Link>
      </div>

      <header className="hero">
        <p className="eyebrow">Route management</p>
        <h1>Edit bus route</h1>
        <p className="subtitle">
          Add or update routes, timing, and bus types from this page.
        </p>
      </header>

      <section className="panel-grid">
        <div className="panel route-panel">
          <div className="panel-header">
            <h2>Route details</h2>
            <p>Wire this panel to your backend or admin workflow.</p>
          </div>
          <div className="placeholder-box">
            Start adding your edit form here.
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditBusRoute
