import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './components/Main';
import {Route, Routes} from 'react-router-dom';
import Info from './components/Info';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}></Route>
      <Route path='/info/:id' element={<Info/>}></Route>
    </Routes>
  );
}

export default App;
