import React from 'react'
import classes from "./Header.module.css"
import Meals from '../../assets/Meals.jpg'
import CartButton from './CartButton'

const Header = (props) => {

  return (
    <>
        <header className= {classes.header}>
            <h1>Indian-Meals</h1>
            <CartButton onClick = {props.onShowCart}>Your Cart</CartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={Meals} alt=""/>
        </div>
    </>
  )
}

export default Header