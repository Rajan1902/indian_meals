import classes from './Checkout.module.css';
import {useRef, useState} from 'react';
const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    contact: true,
    pin: true,
    address: true
  });
  // helper functions
  const isEmpty = value => value.trim() === '';
  const isValidPin = value => value.trim().length === 6;
  const isValidContact = value => value.trim().length === 10;

  const nameRef = useRef();
  const contactRef = useRef();
  const pinRef = useRef();
  const addressRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    // getting user input
    const enteredName = nameRef.current.value;
    const enteredContact = contactRef.current.value;
    const enteredPin = pinRef.current.value;
    const enteredAddress = addressRef.current.value;
    // validating user input
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredContactIsValid = isValidContact(enteredContact);
    const enteredPinIsValid = isValidPin(enteredPin);
    const enteredAddressIsValid = !isEmpty(enteredAddress);

    // overall form validation
    const formIsValid = enteredNameIsValid && enteredContactIsValid && enteredPinIsValid && enteredAddressIsValid;

    setFormInputsValidity({
      name: enteredNameIsValid,
      contact: enteredContactIsValid,
      pin: enteredPinIsValid,
      address: enteredAddressIsValid
    })

    if(! formIsValid){
      return;
    }
    props.onConfirm({
      name: enteredName,
      contact: enteredContact,
      pin: enteredPin,
      address: enteredAddress
    });
  };
  const nameClass = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
  const ContactClass = `${classes.control} ${formInputsValidity.contact ? '' : classes.invalid}`;
  const pinClass = `${classes.control} ${formInputsValidity.pin ? '' : classes.invalid}`;
  const addressClass = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formInputsValidity.name && <p>Please Enter a Name</p>}
      </div>
      <div className={ContactClass}>
        <label htmlFor='phone'>Contact</label>
        <input type='text' id='Contact' ref={contactRef}/>
        {!formInputsValidity.contact && <p>Please Enter a valid contact number</p>}
      </div>
      <div className={pinClass}>
        <label htmlFor='pin'>Pin Code</label>
        <input type='text' id='pin' ref={pinRef}/>
        {!formInputsValidity.pin && <p>Please Enter a valid pinCode</p>}
      </div>
      <div className={addressClass}>
        <label htmlFor='address'>Complete Address</label>
        <input type='text' id='address' ref={addressRef}/>
        {!formInputsValidity.address && <p>Please Enter your address</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} type='submit'>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
