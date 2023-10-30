import './styles/global.css';
import { BrowserRouter ,  Route, Routes} from 'react-router-dom';

import Modules from './pages/Modules/';
import User from './pages/User';
import Contents from './pages/Content';
import Binaural from './pages/Binaural';
import Meditation from './pages/Meditation';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import BinauralSound from './pages/BinauralSound';
import MeditationSound from './pages/MeditationSound';


function App() {



  return(
    <BrowserRouter>
      <Routes>
          <Route path='/modules' element= {<Modules/>}/>
          <Route path='/user' element= {<User/>}/>
          <Route path='/contents' element= {<Contents/>}/>
          <Route path='/binaurals' element= {<Binaural/>}/>
          <Route path='/binauralsound' element= {<BinauralSound/>}/>
          <Route path='/meditations' element= {<Meditation/>}/>
          <Route path='/meditationsound' element= {<MeditationSound/>}/>
          <Route path="/" element={<Login/>} />
          <Route path='*' element= {<NotFound/>}/>

      </Routes> 
    </BrowserRouter>)
  

}

export default App
