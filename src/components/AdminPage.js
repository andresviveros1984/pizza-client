import React, { useEffect, useState } from 'react';

const AdminPage = (props) => {

  const [allOrders,setAllOrders] = useState();



  const getAllOrders = async () => {
    const ordersResponse = await fetch('/orders');
    const ordersData = await ordersResponse.json();
    setAllOrders(ordersData);
  }

  useEffect(()=>{
    getAllOrders()
  },[])

  return(
    <>
      {console.log(allOrders)}
    </>
  )
}

export default AdminPage;