import './Loader.css'

function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      {text && <p className="loader-text">{text}</p>}
    </div>
  )
}

export default Loader
