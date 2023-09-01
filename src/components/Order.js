import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Order = ({pizzas}) => {

const [selectedPizza,setSelectedPizza] = useState({});
const [displayPrice,setDisplayPrice] = useState(false);

let initialState = {
  fname:'',
  lname:'',
  address:'',
  email:'',
  phone:'',
  price:'',
  pizza:''
};
const [formData,setFormData] = useState(initialState);
const [errorMessage,setErrorMessage] = useState('');
const navigate = useNavigate();

const handleSelect = (e) =>{
  let pizzaId = e.target.value;
  let filteredPizza = pizzas.data.filter(pzza =>{
    return(
      pzza.id === pizzaId
    )
  })
  
  setSelectedPizza(filteredPizza[0]);
  if(pizzaId === ""){
    setDisplayPrice(false)
  }else{
    setDisplayPrice(true)
  };
  setFormData({...formData,pizza:filteredPizza[0].id})
}

const postForm = async () =>{
  const response  = await fetch('/orders', {
    method: "POST",
    headers: {
      "content-Type":"application/json",
    },
    body:JSON.stringify({order:formData})
  })
  const received =  await response.json()
  
  if(received.status == 200){
    navigate(`/success/${received.data.id}`)
  }
};


const handleSubmit = (e) =>{
  // const reg = /sdffdsf@cxvxv.com/ /[\w+\.]@(\w\.)+\w+/
  e.preventDefault();

  if(formData.fname.length < 2 || formData.lname.length < 2 || formData.address.length < 2 || formData.email.length < 2 || formData.phone < 2){
    setErrorMessage("Fields must have more than 2 characters")
    
  }else{
    postForm();
  }
}



  return (
    <FormArea className="form-area">
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First Name: <input type="text" id='fname' name='fname' placeholder='fabio' onChange={(e)=>setFormData({...formData,fname:e.target.value})} /></label>
        <label htmlFor="sname">Surname: <input type="text" id='lname' name='lname' placeholder='lopez' onChange={(e)=>setFormData({...formData,lname:e.target.value})}/></label>
        <label htmlFor="address">Address: <input type="text" id='address' name='address' placeholder='London Town' onChange={(e)=>setFormData({...formData,address:e.target.value})}/></label>
        <label htmlFor="email">Email: <input type="email" id='email' name='email' placeholder='fabio.lopez@email.com' onChange={(e)=>setFormData({...formData,email:e.target.value})}/></label>
        <label htmlFor="tel">Telephone <input type="tel" id='phone' name='phone' placeholder='111-111-1111' onChange={(e)=>setFormData({...formData,phone:e.target.value})}/></label>

        <label htmlFor="pizzas">
          Pizza: 
          <select name="pizza" id="" onChange={handleSelect}>
            <option value={""}>Pick Your Pizza</option>
            {pizzas.status == 200 ?  pizzas.data.map(pizza => {
              return(
                <option value={pizza.id}>{pizza.name}</option>
              )
            }) : <h1>Loading</h1>}
          </select>
        </label>
        
        {displayPrice &&  (<label htmlFor="price">Price: {Object.keys(selectedPizza.price).map(p => {
          return(
            <div className='radioarea'>
              <input type="radio" name='price' value={selectedPizza.price[p]} onChange={(e)=>{setFormData({...formData,price:e.target.value})}}/>
                <p>{p}</p>
                <p>{selectedPizza.price[p]}</p>
            </div>
          )
        })}</label>)}
        {errorMessage.length > 0 && <div className='errormessages'>
          <p>{errorMessage}</p>
        </div>}
        <button type='submit'>Get my Pizza</button>
      </form>
    </FormArea>
  )
  
}
export default Order;

const FormArea = styled.div `
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  width:100vw;
  form{
   
    border-radius:20px;
    box-shadow:10px 10px 5px #f77673;
    border:1px solid #75f763;
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

