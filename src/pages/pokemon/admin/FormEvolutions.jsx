import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormEvolutions = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [pokemonList, setPokemonList] = useState([]);
    const [idEvolutionPrev, setIdEvolutionPrev] = useState('');
    const [idEvolutionNext, setIdEvolutionNext] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        getPokemonList();
        if (id) {
            getPokemonEvolutions();
        }
    }, [id]);

    const getPokemonList = () => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setPokemonList(res.data);
            }).catch(error => {
                console.error(error);
            });
    };

    const getPokemonEvolutions = () => {
        axios.get(`http://localhost:3000/pokemon/details/${id}`)
            .then(res => {
                const pokemon = res.data.pokemon;
                setIdEvolutionPrev(pokemon.idEvolutionPrev || '');
                setIdEvolutionNext(pokemon.idEvolutionNext || '');
            }).catch(error => {
                console.error(error);
            });
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const evolutionData = {
            idEvolutionPrev: idEvolutionPrev || null,
            idEvolutionNext: idEvolutionNext || null
        };

        axios.put(`http://localhost:3000/pokemon/${id}/evolution`, evolutionData)
            .then(res => {
                console.log(res.data);
                navigate(`/admin/pokemon`);
            }).catch(error => {
                console.error(error);
            });
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>Actualizar Evoluciones del Pokémon</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                <Form.Group>
                                    <Form.Label>Evolución Previa:</Form.Label>
                                    <Form.Select
                                        value={idEvolutionPrev}
                                        onChange={(e) => setIdEvolutionPrev(e.target.value)}
                                    >
                                        <option value="">Selecciona un Pokémon...</option>
                                        {pokemonList
                                            .filter(pokemon => pokemon.id !== parseInt(idEvolutionNext))
                                            .map(pokemon => (
                                                <option key={pokemon.id} value={pokemon.id}>
                                                    {pokemon.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Label>Evolución Siguiente:</Form.Label>
                                    <Form.Select
                                        value={idEvolutionNext}
                                        onChange={(e) => setIdEvolutionNext(e.target.value)}
                                    >
                                        <option value="">Selecciona un Pokémon...</option>
                                        {pokemonList
                                            .filter(pokemon => pokemon.id !== parseInt(idEvolutionPrev))
                                            .map(pokemon => (
                                                <option key={pokemon.id} value={pokemon.id}>
                                                    {pokemon.name}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Button type="submit">Guardar Evoluciones</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormEvolutions;
