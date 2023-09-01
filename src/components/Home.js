import React from 'react';
import Card from './Card';
import styled from 'styled-components';


const Home = ({data}) =>{
  
  return(
    <Container>
  
      {data !== undefined ? data.map(pizzaData =>{
        return(
          <Card pizza={pizzaData}/>
        )
      }): <h1>Loading</h1>}
      {}
    </Container>
  )
};

export default Home

const Container = styled.div `
  /* margin:50px; */
  display:flex;
  width:100vw;
  flex-wrap:wrap;
  justify-content:space-around;
  

`