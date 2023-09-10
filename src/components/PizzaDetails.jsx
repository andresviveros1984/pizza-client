import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';


const PizzaDetails = () => {
  let { id } = useParams();
  const [pizzaDetail, setPizzaDetail] = useState({})

  const getPizzaDetails = async () => {
    const response = await fetch(`/pizzas/${id}`);
    const data = await response.json();

    setPizzaDetail(data);
  }

  useEffect(() => {

    getPizzaDetails();
  }, [])

  return (
    <PizzaDetailsContainer>
      {pizzaDetail.status == 200 ? (
        <div className="image">
          <img src={pizzaDetail.data.src} alt="pizza" />
          <div className="pizza-detail">
            <h2>{pizzaDetail.data.name}</h2>
            <p>{[pizzaDetail.data.description]}</p>
            <h2>TOPPINGS</h2>
            <p>{pizzaDetail.data.toppings}</p>
            <h2>Price</h2>
            {Object.entries(pizzaDetail.data.price).map(price =>{
              return(
                <p><span>{price[0]}</span> {price[1]}</p>
              )
            })}
          </div>

          <Link to={'/order'}>Order Now</Link>
          
        </div>
      ) : <h1>Loading</h1>}


    </PizzaDetailsContainer>
  )
};
//create for this, image left side, button right side
export default PizzaDetails


const PizzaDetailsContainer = styled.div `
  padding:2rem;
  img{
    height:300px;
    width:300px;
  }
`
