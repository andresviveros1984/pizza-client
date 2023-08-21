import React from 'react';
import Card from './Card';



const Home = ({data}) =>{
  
  return(
    <div>
  
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