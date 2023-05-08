import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Login = (props) => {
    // UserState Variables 
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    //BrowserRouter Hook
    const navigate = useNavigate();

    //Function here
    async function handleSubmit(e) {
        e.preventDefault();
        let url = "http://localhost:4000/user/login";

        let bodyObject = {
                email: email,
                password: password,
            };

            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(bodyObject),
            };
            try {
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                console.log(data);
                if(data.message === "password matched") {
                props.updateToken(data.token);
                navigate("/driver-log");

            }
            }
            catch (error) {
                console.error(error.message);
            }
    
    }
        return ( 
            <>
            <div className='auth-form-container'>
            <h2 className="text-center">Login</h2>
            
            <Form className= "login-form" onSubmit={handleSubmit}>
                {/* Star of Email */}
                <FormGroup>
                        <Label>Email:</Label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                     {/* End of Email */}
                     {/* Star of Password */}
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input value={password} onChange={(e)=> setPassword(e.target.value) } />
                       {/* End of Password */} 
                    </FormGroup>
                    <div className="text-center d-grid gap-2 mb-4">
                     <Button type="submit" color="primary">Login</Button>
                     </div>
            </Form>
            </div>
            </>
    
         );
    }
    export default Login;
