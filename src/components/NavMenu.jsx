import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavMenu.css';


const NavMenu = () => {
    return (
        <Navbar bg="dark" expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand href="/" className="text-light fw-bold">
                    ⚔️ Proyecto Pokémon
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link custom-link" to="/pokemon">Pokémon</Link>
                        <Link className="nav-link custom-link" to="/types">Tipos</Link>
                        <Link className="nav-link custom-link" to="/abilities">Habilidades</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
