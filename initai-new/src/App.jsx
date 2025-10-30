import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import AboutUs from './pages/AboutUs'
import Landing from './pages/Landing'
import Team from './pages/Team'
import Events from './pages/Events'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Projects from './pages/Projects'
import Achievements from './pages/Achievements' // Add this import

function App() {

  return (
    <>
      <nav>
        <Link to="/"></Link>
        <Link to="/blogs"></Link>
        <Link to="/team"></Link>
        <Link to="/events"></Link>
        <Link to="/about"></Link>
        <Link to="/projects"></Link>
        <Link to="/achievements"></Link> {/* Add this link */}
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/achievements" element={<Achievements />} /> {/* Add this route */}
        <Route path="/blogs/:id" element={<BlogDetail />} />
      </Routes>
    </>
  )
}

export default App
