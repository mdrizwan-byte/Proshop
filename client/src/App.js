import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CartScreen from './screens/CartScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import {BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  return (
   <>
   <Router>
   <Header />
   <main className = 'py-3'>
     <Container>
    <Route path = '/' component = {HomeScreen} exact />
    <Route path = '/PlaceOrder' component = {PlaceOrderScreen} exact />
    <Route path = '/register' component = {RegisterScreen} exact />
    <Route path = '/profile' component = {ProfileScreen} exact />
    <Route path = '/login' component = {LoginScreen} exact />
    <Route path = '/product/:id' component = {ProductScreen} exact />
    <Route path = '/cart/:id?' component = {CartScreen} />
    <Route path = '/shipping' component = {ShippingScreen}/>
    <Route path = '/payment' component = {PaymentScreen}/>
     </Container>
     </main>
   <Footer />
   </Router>
   </>
  )
}

export default App;
