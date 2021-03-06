import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {  Button, Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { createOrder } from '../redux/actions/orderActions'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderPage = ({history}) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate

    const addDecimal = num => ( (Math.round(num * 100) / 100).toFixed(2))
    
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice)).toFixed(2)

    const { cartItems, shippingAddress, itemsPrice, taxPrice, shippingPrice, totalPrice } = cart

    useEffect(()=>{
        if(success){
            history.push(`order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [success,history,order])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems : cartItems,
            shippingAddress,
            paymentMethod : true,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }))
    }
    
    return (
        <>
        <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shiiping</h2>
                            <p>
                                <strong>Address : </strong>
                                { cart.shippingAddress.address}, { cart.shippingAddress.city},
                                { cart.shippingAddress.postalCode}, { cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method : </strong>
                                { cart.paymentMethod }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Ordered items</h2>
                           {
                               cart.cartItems.length === 0 ? <Message> Your card is empty </Message> : 
                               <ListGroup variant='flush'>
                                   {
                                       cart.cartItems.map((item, index) => (
                                           <ListGroup.Item key={index}>
                                               <Row>
                                                   <Col md={1}>
                                                       <Image src={item.image} alt={item.name} fluid rounded />
                                                   </Col>
                                                   <Col>
                                                        <Link to={`product/${item.product}`}> {item.name}</Link>
                                                   </Col>
                                                   <Col md={4}>
                                                       { item.qty } x ${item.price} = ${ item.qty * item.price}
                                                    </Col>
                                               </Row>
                                           </ListGroup.Item>
                                       )) 
                                   }
                               </ListGroup>
                           }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {
                                    error && <Message variant="danger">{error}</Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn btn-block' 
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}>
                                        Place Order
                                    </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderPage
