import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';



const OrderDetails = ({ pizzas }) => {

  let { id } = useParams();
  const [selectedPizza, setSelectedPizza] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [orderDetail, setOrderDetail] = useState({});
  const [disabled,setDisabled] = useState(true);
  const [newOrder,setNewOrder] = useState({})
  const navigate = useNavigate()


  const getPizzaById = async (id) => {
    const response = await fetch(`/pizzas/${id}`);
    const pizzaData = await response.json();
    setSelectedPizza(pizzaData.data);
  }


  const getOrderDetails = async () => {
    const response = await fetch(`/orders/${id}`);
    const data = await response.json();
    setOrderDetail(data.data);
    getPizzaById(data.data.pizza)
  }

 
  useEffect(() => {
    getOrderDetails()
    // getPizzaById()
  }, [])

  const handleSelect = (e) => {
    let pizzaId = e.target.value;
    let filteredPizza = pizzas.data.filter(pzza => {
      return (
        pzza.id === pizzaId
      )
    })
    setSelectedPizza(filteredPizza[0]);
    setNewOrder({...newOrder,pizza:filteredPizza[0].id})
  }

const handleUpdateOrder = ()=>{
  setDisabled(false)
  setNewOrder({
    fname:orderDetail.fname,
    lname:orderDetail.lname,
    address:orderDetail.address,
    email:orderDetail.email,
    phone:orderDetail.phone,
    price:orderDetail.price,
    pizza:orderDetail.pizza
  })
  
}


const handlePrice = (event) => {
  setNewOrder({...newOrder,price:event.target.value})
}


const handleSubmit = async () => {
  const response  = await fetch(`/orders/${orderDetail.id}`, {
    method: "PATCH",
    headers: {
      "content-Type":"application/json",
    },
    body:JSON.stringify({newOrder:newOrder})
  })
  const received =  await response.json()
  
  if(received.status == 200){
    navigate(`/admin`)
  }
}

  return (
    <FormArea className="form-area" >
      <p>Order : {orderDetail.id}</p>
      {console.log(newOrder)}
      {Object.keys(selectedPizza).length > 1 ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">First Name: <input type="text" id='fname' name='fname' placeholder='fabio' disabled value={orderDetail.fname} /></label>
          <label htmlFor="sname">Surname: <input type="text" id='lname' name='lname' placeholder='lopez' disabled value={orderDetail.lname} /></label>
          <label htmlFor="address">Address: <input type="text" id='address' name='address' placeholder='London Town' value={orderDetail.address} disabled/></label>
          <label htmlFor="email">Email: <input type="email" id='email' name='email' placeholder='fabio.lopez@email.com'  value={orderDetail.email} disabled /></label>
          <label htmlFor="tel">Telephone <input type="tel" id='phone' name='phone' placeholder='111-111-1111' disabled value={orderDetail.phone} /></label>

          <label htmlFor="pizzas">
            Pizza:
            <select name="pizza" id="" onChange={handleSelect} disabled={disabled} >
              <option value={orderDetail.pizza}>{selectedPizza.name}</option>
              {pizzas.status == 200 ? pizzas.data.map(pizza => {
                return (
                  <option value={pizza.id}>{pizza.name}</option>
                )
              }) : <h1>Loading</h1>}
            </select>
          </label>
          <label htmlFor="price">Price: {Object.keys(selectedPizza.price).map(p => {
            return (
              <div className='radioarea'>
                { disabled ? <input type="radio" name='price' value={selectedPizza.price[p]} checked={selectedPizza.price[p] === orderDetail.price} disabled={disabled} /> : <input type="radio" name='price' disabled={disabled} value={selectedPizza.price[p]} onChange={handlePrice}/> }
                <p>{p}</p>
                <p>{selectedPizza.price[p]}</p>
              </div>
            )
          })}</label>
          {errorMessage.length > 0 && <div className='errormessages'>
            <p>{errorMessage}</p>
          </div>}
          {!disabled && (<button id='save-changes-btn' type='submit'>Save Changes</button>)}
        </form>
      ) : (<h1>Loading</h1>)}
        <button onClick={handleUpdateOrder} >Update Order</button>
    </FormArea>
  )

}
export default OrderDetails;

const FormArea = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;
width:100vw;
flex-direction:column;
form{
 
  border-radius:20px;
  box-shadow:10px 10px 5px lightblue;
  border:1px solid lightblue;
  width:500px;
  height:max-content;
  display:flex;
  flex-direction:column;
  justify-content:space-evenly;
  /* align-items:flex-start; */
  align-items:center;
  padding:10px;

  label {
    width:260px;
    display:flex;
    justify-content:space-between;
    padding:20px 30px;
  }
  input,select {
    width:120px;
    border-radius:10px;
    text-align:center;
  
  }
}
button {
  margin:0 auto;
  padding:10px;
  border-radius:10px;
  border:1px solid lightblue;
  background-color:white;
}

.radioarea{
  /* width:60px; */
  input{
    width:14px;
    
  }
 font-size:12px;
 font-weight:bold;
 
}

.errormessages p{
  font-weight:bolder;
  color:red;
}



`

