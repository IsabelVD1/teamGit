import React, {useState} from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const MessageCreate = (props) => {
    
    const [user, setUser] = useState(""); 
    const [room, setRoom] = useState("");
    const [body, setBody] = useState("");
    
    //Function here
    async function handleSubmit(e){
        e.preventDefault(); 

        let url = `http://localhost:4000/message/create`

        let bodyObject = {
            
            user: user,
            room: room,
            body: body,
          } 

          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", props.token);
      
          const requestOptions = {
              headers: myHeaders,
              method: "POST",
              body: JSON.stringify(bodyObject),
            };
            
            try {
              const response = await fetch(url, requestOptions);
              const data = await response.json();
              console.log(data);
                props.getViewAllMessages();
            } catch (error) {
              console.error(error.message);
            }  
        }    
    
    return (
    <>
    <h3>Create a Message</h3>
    <Form className="mb-5" onSubmit={handleSubmit}>
       

        <FormGroup>
            <Label>User:</Label>
            <Input type="text" value={user} onChange={(e)=> setUser(e.target.value)} />
        </FormGroup> 

        <FormGroup>
            <Label>Room:</Label>
            <Input type="text" value={room} onChange={(e)=> setRoom(e.target.value)} />
        </FormGroup>

        <FormGroup>
            <Label>Body:</Label>
            <Input type="text" value={body} onChange={(e)=> setBody(e.target.value)} />
        </FormGroup>
        <div className="d-grid gap-2 mb-4">
            <Button type="submit" color="success" >
                Save Message

            </Button>
        </div>
    </Form>
    
    </>  
    );
};
 
export default MessageCreate;