import React, { useContext , useState} from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length>0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item=>{
        cartCtx.addItem({...item, amount : 1})
    };
    const checkoutHandler = () =>{
        setIsCheckOut(true);
    }
    const submitHandler = async (userData) =>{
        setDidSubmit(false);
        setIsSubmitting(true);
        await fetch('https://http-react-fc828-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                order: cartCtx.items
            })
            
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
        
    }
    const cartItems =<ul className={classes['cart-items']}>{cartCtx.items.map(item =>{
        return <CartItem key={item.id} name = {item.name} amount ={item.amount} price = {item.price} onRemove={cartItemRemoveHandler.bind(null, item.id)} onAdd = {cartItemAddHandler.bind(null, item)}/>
    })}</ul>
    const cartButtons = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItem && <button className={classes.button} onClick={checkoutHandler}
    >Order</button>}
</div>
const modalContent = <>{cartItems}
<div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
</div>
{isCheckOut && <Checkout onConfirm = {submitHandler} onClose = {props.onCancel}></Checkout>}
{!isCheckOut && cartButtons}
</>
const submittingContent = <p>order being sent to resteraunt...</p>
const orderSubmittedContent = <>
<p>order successful!!</p>
<div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>Close</button>
</div>
</>
  return (
    <Modal onClose = {props.onClose}>
        {!isSubmitting && !didSubmit && modalContent}
        {isSubmitting && !didSubmit && submittingContent}
        {didSubmit && !isSubmitting && orderSubmittedContent}
    </Modal>
  )
}

export default Cart