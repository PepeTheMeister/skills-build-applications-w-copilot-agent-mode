import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <h1>OctoFit Tracker</h1>
        <Routes>
          <Route path="/" element={<div>Welcome to OctoFit Tracker</div>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
