import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ onSearch, placeholder = 'Search movies...' }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query.trim())
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-input-wrapper">
        <span className="search-bar-icon">🔍</span>
        <input
          type="text"
          className="search-bar-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button type="submit" className="search-bar-btn">Search</button>
    </form>
  )
}

export default SearchBar
