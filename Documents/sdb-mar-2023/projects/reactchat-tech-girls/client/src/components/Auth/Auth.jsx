import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import { Container} from 'reactstrap';
const Auth = (props) => {

   //  currentForm is a state variable that will be used to determine which form to show
  const [currentForm, setCurrentForm] = useState("login");  

    
    return (
        <>
            <Container className='App'>
                {
                currentForm === "login" ? <Login updateToken={props.updateToken} setCurrentForm={setCurrentForm}/>  : <Signup updateToken={props.updateToken} setCurrentForm={setCurrentForm}/>
                }

            </Container>
        </>
        );
    }

export default Auth;