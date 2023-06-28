import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Card = ({ pizza }) => {
  return (
    <Container>
      <img src={pizza.src} alt="#" />
      <div className="info">
        <h1>{pizza.name}</h1>
        <p>{pizza.price.Small}</p>
        <p>{pizza.toppings}</p>
        <Link to={`/${pizza.id}`}>More Info</Link>
      </div>
    </Container>
  )
}
//xvxcv
export default Card;

const Container = styled.div`
  
  border:1px solid black;
  img{
    height:100px;
    width:100px;
  }
  padding:10px;
`;