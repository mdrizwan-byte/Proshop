import React,{useState,useEffect} from 'react'
import {Link,useParams} from 'react-router-dom'
import {useDispatch, useSelector} from'react-redux'
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetails} from '../actions/productAction'
//import products from '../products'

const Product = ({history}) => {
const[qty,setQty] = useState(1)
let {id} = useParams();
const dispatch = useDispatch()
const productDetail = useSelector(state => state.productDetails)
const {loading,product,error} = productDetail


const addToCart = () => {
    history.push(`/cart/${id}?qty=${qty}`)
}

useEffect(()=>{
dispatch(listProductDetails(id))
},[dispatch,id])
 
  return (
      <>
      <Link className="btn btn-light my-3"  to= "/">
      Go Back
      </Link>
      <Row>
          <Col md={6}> 
          <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}> 
          <ListGroup variant ='flush'>
              <ListGroup.Item><h3>{product.name}</h3></ListGroup.Item>
              <ListGroup.Item><Rating value={product.rating} text = {`${product.numReviews} reviews`} /></ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
          </ListGroup>
          </Col>
          <Col md={3}>
              <Card>
                  <ListGroup variant ="flush">
                  <ListGroup.Item>
                      <Row>
                          <Col>
                          Price:
                          </Col>
                          <Col>
                          {product.price}
                          </Col>
                      </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Row>
                          <Col>
                          Status:
                          </Col>
                          <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                          </Col>
                      </Row>
                  </ListGroup.Item>
                   {
                    product.countInStock > 0 ? 
                    <ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form.Control as = 'select' value = {qty} onChange = {(e) => setQty(e.target.value)}>
                                 {[...Array(product.countInStock).keys()].map((x) => (
                                     <option key = {x+1} value = {x+1}>{x+1}</option>
                                 ))}
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item> : ''
                   }


                  <ListGroup.Item>
                      <Button className='btn-block' type = 'button' onClick = {addToCart} disabled ={product.countInStock === 0}>Add to Cart</Button>
                  </ListGroup.Item>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
      </>
  )
}

export default Product