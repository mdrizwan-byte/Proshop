import React,{useEffect} from 'react'
import {Link,useHistory,useLocation,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Row, Col,ListGroup,Image,Form,Card,Button} from 'react-bootstrap'
import {addToCart,removeFromCart} from '../actions/cartActions'
import Message from '../components/Message'
import queryString from 'query-string' 


const CartScreen = () => {
const history = useHistory()
const {id} = useParams()
const {search} = useLocation()
const {qty} = queryString.parse(search)
const dispatch = useDispatch()
const cart = useSelector(state => state.cart)
const {cartItems} = cart

useEffect(() => {
    if(id){
    dispatch(addToCart(id,qty))
    }
},[dispatch,qty,id])

const removeCartHandler = (productId) => {
    console.log("p")
    dispatch(removeFromCart(productId))
} 

const checkOut = () => {
    history.push('/login?redirect=shipping')
} 

return (
    <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {
              cartItems.length === 0 ? <Message>Your Cart is Empty <Link to ='/'>Go Back</Link></Message> :(
                  <ListGroup variant="flush">
                      {cartItems.map(item => (
                          <ListGroup.Item key={item.product}>
                               <Row>
                                   <Col md={2}>
                                       <Image src ={item.image} alt ={item.name} fluid rounded/>
                                   </Col>
                                   <Col md={3}>
                                       <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                   </Col>
                                   <Col md={2} >
                                    ${item.price}
                                   </Col>
                                   <Col md ={2}>
                                   <Form.Control as = 'select' value = {item.qty} onChange = {(e) =>  dispatch(addToCart(item.product,Number(e.target.value)))}>
                                 {[...Array(item.countInStock).keys()].map((x) => (
                                     <option key = {x+1} value = {x+1}>{x+1}</option>
                                 ))}
                            </Form.Control>
                                   </Col>
                                   <Col md ={2}>
                                       <Button type='button' variant ='light' onClick = {()=>removeCartHandler(item.product)}>
                                           <i className = 'fas fa-trash'></i>
                                       </Button>
                                   </Col>
                               </Row>
                          </ListGroup.Item>
                      ))}
                  </ListGroup>
              )
          }
        </Col>
        <Col md={4}>
             <Card>
                 <ListGroup variant="flush">
                     <ListGroup.Item>
                         <h2> SubTotal ({cartItems.reduce((acc,item)=>acc+Number(item.qty),0)}) items</h2>
                         ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Button type="button" className="btn-block" disabled = {cartItems.length===0} onClick = {checkOut}>
                             Proceed to Pay</Button> 
                     </ListGroup.Item>
                 </ListGroup>
             </Card>
        </Col>
    </Row>
)
}

export default CartScreen