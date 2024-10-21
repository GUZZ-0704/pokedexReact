import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form } from 'react-bootstrap';
import PokemonList from './../../components/pokemon/PokemonList';
import NavMenu from './../../components/NavMenu';
import NavMenuAdmin from './../../components/NavMenuAdmin';

const PokemonPage = ({ isAdmin }) => {
    const [pokemonList, setPokemonList] = useState([]);
    const [search, setSearch] = useState('');
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        fetchTypes();
        fetchPokemons();
    }, [search, selectedType]);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/type');
            setTypes(response.data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    const fetchPokemons = async () => {
        try {
            const response = await axios.get('http://localhost:3000/pokemon/search', {
                params: {
                    search: search ? search.trim() : undefined,
                    type: selectedType || undefined
                }
            });
            setPokemonList(response.data);
        } catch (error) {
            console.error('Error fetching pokemons:', error);
        }
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };


    return (
        <>
            {isAdmin ? <NavMenuAdmin /> : <NavMenu />}
            <Container className="mt-4">
                <h1 className="text-center">Pokémon List</h1>

                <Form className="mb-4">
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="searchInput">
                                <Form.Label>Buscar por Nombre o Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nombre o Número del Pokémon"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="typeSelect">
                                <Form.Label>Filtrar por Tipo</Form.Label>
                                <Form.Control as="select" value={selectedType} onChange={handleTypeChange}>
                                    <option value="">Todos</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <PokemonList
                    pokemonList={pokemonList}
                    isAdmin={isAdmin}
                    refreshPokemonList={fetchPokemons}
                />
            </Container>
        </>
    );
};

PokemonPage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default PokemonPage;
