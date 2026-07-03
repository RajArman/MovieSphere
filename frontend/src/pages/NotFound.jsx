import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="page not-found">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-text">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}

export default NotFound
