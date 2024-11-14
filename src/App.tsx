import { Routes, Route, HashRouter} from 'react-router-dom'
import Home from '@/pages/Home'
import Search from './pages/Search'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/search/:searchTerm?/:limit?"
          element={<Search />}
        />
      </Routes>
    </HashRouter>
  )

}

export default App
