import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Col, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { getOrders } from '../redux/actions/orderActions';
import { useHistory } from 'react-router-dom';


const OrderListPage = ( ) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const orderList = useSelector(state => state.orderList)
    const { error, loading, orders } = orderList

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrders())
        } else {
            history.push('/login')
        }
    },[dispatch, history, userInfo])

    return (
        <>
            <Row className="align-items-center mt-5">
                <Col>
                    <h1>Orders</h1>
                </Col>
            </Row>
            
            {

                loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                (
                    <Table striped bordered hover responsive className="table-sm mt-3">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Total Price </th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name }</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{
                                            order.isPaid ? 
                                            order.paidAt.substring(0,10) : 
                                            <i className="fas fa-times" style={{color : 'red'}}></i>
                                        }</td>
                                        <td>{
                                            order.isDelivered ? 
                                            order.deliveredAt.substring(0,10) : 
                                            <i className="fas fa-times" style={{color : 'red'}}></i>
                                        }</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}/`}>
                                                    <Button variant="light" className="btn-sm">
                                                        Detail
                                                    </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
           
        </>
    )
}

export default OrderListPage
