import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'
import CheckOut from '../components/CheckoutSteps'

const Shipping = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    

    const history = useHistory()
     const [address, setAddress] = useState(shippingAddress.address)
     const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
     const [city, setCity] = useState(shippingAddress.city)
     const [country, setCountry] = useState(shippingAddress.country)

const submitHandler = (e) => {
    e.preventDefault();
   dispatch(saveShippingAddress({
       address,city,postalCode,country
   }))
history.push('/payment')
}


    return (
      <FormContainer>
        <CheckOut step1 step2 />
          <h1> Shipping Address</h1>
          <Form onSubmit = {submitHandler}>
          <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='address'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='city'
            placeholder='Enter City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='country'
         placeholder='Enter country'
            value={country}
         onChange={(e) => setCountry(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='postalCode'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}>
            </Form.Control>
        </Form.Group>

<Button type ="submit" variant = 'primary' >Continue</Button> 
          </Form>
      </FormContainer>
    )
}


export default Shipping