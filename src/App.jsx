import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Instruments from './pages/Instruments'
import InstrumentDetail from './pages/InstrumentDetail'
import Learn from './pages/Learn'
import Experts from './pages/Experts'
import ExpertDetail from './pages/ExpertDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/instruments/:id" element={<InstrumentDetail />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/experts/:id" element={<ExpertDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
