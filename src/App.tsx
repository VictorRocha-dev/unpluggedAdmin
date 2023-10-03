import './styles/global.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules/';
import User from './pages/User';
import Contents from './pages/Content';
import Binaural from './pages/Binaural';
import Meditation from './pages/Meditation';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path='/dashboard' element= {<Dashboard/>}/>
      <Route path='/modules' element= {<Modules/>}/>
      <Route path='/user' element= {<User/>}/>
      <Route path='/contents' element= {<Contents/>}/>
      <Route path='/binaurals' element= {<Binaural/>}/>
      <Route path='/meditations' element= {<Meditation/>}/>
      <Route path='*' element= {<NotFound/>}/>

      
    </Routes>
  </Router>

  )
}

export default App
