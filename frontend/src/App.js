import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Blogpage from './pages/Blogpage';
import Myblogpage from './pages/Myblogpage';
import Createblog from './pages/Createblog';
import Blogdetails from './pages/Blogdetails';

function App() {
  return (
    <div className="App">

      <Header/>
      <Routes>
         <Route path='/' element={<Blogpage/>}></Route>
         {/* <Route path='/' element={<Homepage/>}></Route> */}
         <Route path='/login' element={<Loginpage/>}></Route>
         <Route path='/register' element={<Registerpage/>}></Route>
         {/* <Route path='/blogs' element={<Blogpage/>}></Route> */}
         <Route path='/my-blogs' element={<Myblogpage/>}></Route>
         <Route path='/blog-details/:id' element={<Blogdetails/>}></Route>
         <Route path='/create-blog' element={<Createblog/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
