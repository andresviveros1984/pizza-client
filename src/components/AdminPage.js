import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const AdminPage = (props) => {

  const [allOrders,setAllOrders] = useState({});



  const getAllOrders = async () => {
    const ordersResponse = await fetch('/orders');
    const ordersData = await ordersResponse.json();
    setAllOrders(ordersData);
  }

  useEffect(()=>{
    getAllOrders()
  },[])

  return(
    <div>
      {console.log(allOrders)}
      {Object.keys(allOrders).length > 1 && allOrders.data.map(order => {
        return(
          <StyLink to={`/order/${order.id}`}>{order.fname} {order.pizza.slice(0,order.pizza.length-2)} {order.id}</StyLink>
        )
      })}
    </div>
  )
}

export default AdminPage;

const StyLink = styled(Link)`
  display:block;
  margin:10px;
`