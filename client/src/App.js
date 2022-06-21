import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Landing  from './components/Landing';
import  Home  from './components/Home';
import { DogCreate } from './components/DogCreate';
import Detail from './components/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
           <Route exact path='/' element={ <Landing/> } />
           <Route path='/home' element={ <Home/> } />
           <Route path='/dog' element={ <DogCreate/> } />
           <Route path='/home/:id' element={ <Detail/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
