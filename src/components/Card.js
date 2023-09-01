import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


const Card = ({ pizza }) => {
  return (
    <Container>
      <img src={pizza.src} alt="#" />
      <div className="info">
        <h5>{pizza.name}</h5>
        <p>{pizza.description}</p>
        <StyledLink to={`/${pizza.id}`}>More Info</StyledLink>
      </div>
    </Container>
  )
}
//xvxcv
export default Card;

const Container = styled.div`
  border-radius:20px;
  background-color:#5ae021;
  width:300px;
  height:400px;
  img{
    border-radius:10px;
    height:200px;
    width:100%;
  }
  margin:50px;

  .info{
    /* background-color:#f77673; */
    padding:10px 20px;
    text-align:left;
    height:180px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:flex-start;
  }

`;

const StyledLink = styled(Link)`
  text-decoration:none;
  background-color:#c95553;
  padding:10px 20px;
  color:white;
`