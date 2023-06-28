import React from 'react';
import Card from './Card';
import Header from './Header';


const Home = ({data}) =>{
  
  return(
    <div>
      <Header data ={data}/>
      {data !== undefined ? data.map(pizzaData =>{
        return(
          <Card pizza={pizzaData}/>
        )
      }): <h1>Loading</h1>}
      {}
    </div>
  )
};

export default Home