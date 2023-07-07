import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import {Routes,Route,Link} from 'react-router-dom';
import PizzaDetails from './components/PizzaDetails';
import Order from './components/Order';
import Success from './components/Success';
import AdminPage from './components/AdminPage';
import OrderDetails from './components/OrderDetails';

function App() {

const [pizzas,setPizzas] = useState([]);

const fetchPizzas = async () =>{
  const response  = await fetch('/pizzas');
  const data = await response.json();
  setPizzas(data);
}

useEffect(()=>{
  fetchPizzas()
},[])

  return (
    <div className="App">
      {/* add header here */}
      <Routes>
        <Route path='/' element={<Home data ={pizzas.data} />} />
        <Route path='/:id' element={<PizzaDetails />} />
        <Route path='/order' element={<Order pizzas={pizzas}/>}/>
        <Route path={'/success/:id'} element={<Success />}/>
        <Route path={'/admin'} element={<AdminPage />} />
        <Route path={'/order/:id'} element={<OrderDetails pizzas={pizzas}/>} />
      </Routes>
    
    </div>
  );
}
//create pizza details page
//more info will be a link
//use params to get id from route when pressing more info
export default App;
