import React, { useState } from 'react';
import { styled } from 'styled-components';
import pizzaLogo from "../images/italian-pizza.jpeg"
import { Link } from 'react-router-dom';


const Header = ({ data }) => {
  const [searchPizza, setSearchPizza] = useState("");
  const [inputText, setInputText] = useState("");
  // const [displayList,setDisplayList] = useState(false)
  

  const handleDropDownMenu = () => {
    let uL = document.querySelector('#myUL');
    uL.style.display = 'block';
    let closeButton = document.querySelector('#closeList');
    closeButton.style.display = 'block';
    closeButton.addEventListener('click', () => {
      closeButton.style.display = 'none'
      uL.style.display = 'none'
    })

  }

  const handleSearch = (e) => {
    let li = document.getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      let pizzaName = li[i].innerText.split(' ')[0].toLowerCase();
      if (pizzaName.indexOf(inputText.toLowerCase()) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }

    }

  }



  return (
    <HeaderContainer>
      <img src={pizzaLogo} alt="pizza logo" />
      <h1>FABIO'S PIZZA STORE</h1>
      <div id='input-li-container'>
        <input type="text" id='myInput' placeholder='Search Pizzas' onClick={() => handleDropDownMenu()} onChange={(e) => setInputText(e.target.value)} onKeyUp={(e) => handleSearch(e)} />
        <div className='ul-container'>
          <ul id='myUL'>
            {data && data.map(pizzaData => {
              return (
                <li><StyledLink to={`/${pizzaData.id}`} style={{ textDecoration: 'none' }}>{pizzaData.name}</StyledLink></li>
              )
            })}
          </ul>
          <p id='closeList' style={{ display: "none" }}>Close</p>
        </div>
      </div>
    </HeaderContainer>
  )
};

export default Header;

const HeaderContainer = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  input{
    margin-right:10px;
  }
  h1{
    margin-left:10px;
  }
  img{
    height:100px;
    width:100px;
  }
  #myInput {
    font-size:16px;
    /* border:1px solid grey; */
  }

  #myUL {
    list-style-type:none;
    padding:0;
    margin:0;
    display:none;
  }

  #closeList {
    margin:0;
  }

  #myUL li {
    border:1px solid #ddd;
    margin-top:-1px;
    text-decoration:none;
    
  }

  .ul-container {
    display:flex;
    flex-direction:column;
    position:absolute;
    
  }

  #myUL li:hover{
    background-color:#ec2e2b;
  }

`
const StyledLink = styled(Link)`
  color:black;
  
`