import React from 'react'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';

function App() {

  const routes = (
    <Router>
      <Routes>
        <Route path='/dashboard' exact element={<Home/>}/>
        <Route path='/' exact element={<LogIn/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
      </Routes>
    </Router>
  );

  return (
    <div>{routes}</div>
  )
}

export default App