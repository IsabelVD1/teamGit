import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const Signup = (props) => {
    // UserState Variables On Top
    const [firstName, setFirstName] = useState("Isa");
    const [lastName, setLastName] = useState("Villa");
    const [email, setEmail]= useState("ivilladur@gmail.com");
    const [password, setPassword] = useState("password1234");

    //BrowserRouter Hook
    const navigate = useNavigate();
    //Function here

    async function handleSubmit(e) {
        e.preventDefault();
        let url = "http://localhost:4000/user/create";
        let bodyObject = {
                firstName: firstName,
                lastName: lastName,
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
                if(data.message === "new user created") {
                    props.updateToken(data.updateToken);
                    navigate("/server");
                }
            }
            catch (error) {
                console.error(error.message);
            }
    }

    return (
        <>
        <div className='auth-form-container'display='center' >
            <h2 className="text-center">Signup</h2>
            <Form className="signup-form" onSubmit={handleSubmit}>
                {/* Star of First Name */}
                <FormGroup>
                    <Label>  First Name:</Label>
                    <Input value={firstName} onChange={(e)=> setFirstName(e.target.value) } />
                </FormGroup>
                    {/* End of First Name */}
                    {/* Star of LastName */}
                <FormGroup>
                    <Label>  Last Name:</Label>
                    <Input value={lastName} onChange={(e)=> setLastName(e.target.value) } />
                </FormGroup>
                    {/* End of LastName */}
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
                    <Button type="submit" color="primary">Signup</Button>
                </div>
            </Form>
        </div>
        </>
    );
};

export default Signup;
