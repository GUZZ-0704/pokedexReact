import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './NavMenu.css';


const NavMenuAdmin = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar bg="dark" expand="lg" expanded={expanded} className="navbar-custom">
            <Container>
                <Navbar.Brand href="/admin/pokemon" className="text-light fw-bold">
                    ⚔️ Proyecto Pokémon - Admin
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <NavDropdown title="Pokémon" id="pokemons-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/pokemon">Lista de Pokémon</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/pokemon/create">Crear Pokémon</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Tipos" id="types-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/types">Lista de Tipos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/types/create">Crear Tipo</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Habilidades" id="abilities-dropdown" className="custom-link">
                            <NavDropdown.Item as={Link} to="/admin/abilities">Lista de Habilidades</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/abilities/create">Crear Habilidad</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenuAdmin;
