import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';



const Success = ({ formdata }) => {

  const [order, setOrder] = useState({});

  let { id } = useParams();

  //useffect
  //diplay order data



  const getOrder = async (id) => {
    const response = await fetch(`/orders/${id}`)
    const data = await response.json();
    setOrder(data)
  }

  useEffect(() => {
    getOrder(id);
  }, [])


  return (

    <div>
      {console.log(order)}
      {/* {console.log(id)} */}
      {/* {console.log(order.data.fname)} */}
      {Object.keys(order).length > 1 ? (<div>
        <h1>RECEIPT No: {id}</h1>
        <p>Order successfull</p>
        <h2>{order.data.pizza} Pizza</h2>
        <p>Full name: {order.data.fname} {order.data.lname}</p>
        <p>Delivery address: {order.data.address}</p>
        <p>Please pay: {order.data.price}</p>
        <h3>Thank you for your order</h3>
      </div>)
        : <h1>Loading</h1>}
      {/* {admin page, showing} */}
    </div>
  )
}

export default Success;