import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages';
import Home from './pages/home';
import Cls from './pages/cls';
import Cto from './pages/cto';
import Are from './pages/are';
import Cte from './pages/cte';
import Ure from './pages/ure';
import Raise_Pr from './pages/raise_pr';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home/>} />
		<Route path='/cls' element={<Cls/>} />
		<Route path='/cte' element={<Cte/>} />
		<Route path='/cto' element={<Cto/>} />
		<Route path='/ure' element={<Ure/>} />
		<Route path='/are' element={<Are/>} />
    <Route path='/raise_pr' element={<Raise_Pr/>} />
	</Routes>
	</Router>
);
}

export default App;