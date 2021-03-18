import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'
import { getUserDetail, updateUserProfil } from '../redux/actions/userActions';
import FormContainer from '../components/Form';


const ProfilePage = ({location, history}) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error , loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ message, setMessage] = useState(null);

    useEffect(() => {
        if(!userInfo){
            history.push('/login');
        }else{
            if(!user.name){
                dispatch(getUserDetail('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user ])

    const submitHandler = event => {
        event.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password does not match')
        }else{
            dispatch(updateUserProfil({id : user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={4}>
            <FormContainer>
           <h3>User Profile</h3>
            { message &&  <Message variant="danger">{message}</Message>}
            { error &&  <Message variant="danger">{ error }</Message>}
            { success &&  <Message variant="success">Profil Update</Message>}
            { loading &&  <Loader/> }
            <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type='text' placeholder='enter your name' value={name} onChange={event => setName(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='enter email' value={email} onChange={event => setEmail(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='enter password' value={password} onChange={event => setPassword(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder='confirm password' value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update </Button>
                </Form>
            </FormContainer>
            </Col>
            <Col md={8}>
                <h3>My Orders</h3>
            </Col>
        </Row>
    )
}

export default ProfilePage
