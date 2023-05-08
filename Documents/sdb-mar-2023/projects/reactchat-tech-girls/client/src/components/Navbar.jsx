import { Button } from 'reactstrap';

const Navbar = (props) => {
    return ( 
        <nav class= "navbar navbar-light bg-light">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Chat App</span>
            { props.token ? <Button onClick={props.clearToken}>Log Out </Button>: null}
        </div>
        </nav>
    );
}

export default Navbar;