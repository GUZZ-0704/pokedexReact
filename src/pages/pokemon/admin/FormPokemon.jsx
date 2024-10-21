import { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [numPokedex, setNumPokedex] = useState('');
    const [idAbility, setIdAbility] = useState('');
    const [idAbility2, setIdAbility2] = useState('');
    const [idType, setIdType] = useState('');
    const [description, setDescription] = useState('');
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [specialAttack, setSpecialAttack] = useState('');
    const [specialDefense, setSpecialDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [lvlEvolution, setLvlEvolution] = useState('');

    const [showIdType2, setShowIdType2] = useState(false);
    const [idType2, setIdType2] = useState('');
    const [showIdAbility3, setShowIdAbility3] = useState(false);
    const [idAbility3, setIdAbility3] = useState('');

    const [abilitiesList, setAbilitiesList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getPokemonById();
        }
        getAbilitiesList();
        getTypesList();
    }, [id]);

    const getPokemonById = () => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                const pokemon = res.data;
                setName(pokemon.name);
                setNumPokedex(pokemon.numPokedex);
                setIdAbility(pokemon.idAbility);
                setIdAbility2(pokemon.idAbility2);
                setIdType(pokemon.idType);
                setIdType2(pokemon.idType2);
                setDescription(pokemon.description);
                setHp(pokemon.hp);
                setAttack(pokemon.attack);
                setDefense(pokemon.defense);
                setSpecialAttack(pokemon.specialAttack);
                setSpecialDefense(pokemon.specialDefense);
                setSpeed(pokemon.speed);
                setLvlEvolution(pokemon.lvlEvolution);
                setShowIdType2(!!pokemon.idType2);
                setShowIdAbility3(!!pokemon.idAbility3);
            }).catch(error => {
                console.error(error);
            });
    };

    const getAbilitiesList = () => {
        axios.get('http://localhost:3000/ability')
            .then(res => {
                setAbilitiesList(res.data);
            }).catch(error => {
                console.error(error);
            });
    };

    const getTypesList = () => {
        axios.get('http://localhost:3000/type')
            .then(res => {
                setTypesList(res.data);
            }).catch(error => {
                console.error(error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);

        if (e.currentTarget.checkValidity() === false) {
            return;
        }

        const pokemon = {
            name,
            numPokedex,
            idAbility,
            idAbility2,
            idType,
            description,
            hp,
            attack,
            defense,
            specialAttack,
            specialDefense,
            speed,
            lvlEvolution,
            idType2: showIdType2 ? idType2 : null,
            idAbility3: showIdAbility3 ? idAbility3 : null
        };

        if (id) {
            editPokemon(pokemon);
        } else {
            insertPokemon(pokemon);
        }
    };

    const editPokemon = (pokemon) => {
        axios.put(`http://localhost:3000/pokemon/${id}`, pokemon)
            .then(() => navigate('/admin/pokemon'))
            .catch(error => console.error(error));
    };

    const insertPokemon = (pokemon) => {
        axios.post('http://localhost:3000/pokemon', pokemon)
            .then(() => navigate('/admin/pokemon'))
            .catch(error => console.error(error));
    };

    const filterTypes = (typeId) => {
        return typeId !== idType && typeId !== idType2;
    };

    const filterAbilities = (abilityId) => {
        return abilityId !== idAbility && abilityId !== idAbility2 && abilityId !== idAbility3;
    };

    return (
        <Container>
            <Row className="mt-3 mb-3">
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h2>{id ? 'Editar Pokémon' : 'Crear Pokémon'}</h2>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control required value={name} onChange={(e) => setName(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese el nombre del Pokémon.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Número en Pokédex:</Form.Label>
                                    <Form.Control required value={numPokedex} type="number" onChange={(e) => setNumPokedex(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese el número en la Pokédex.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Descripción:</Form.Label>
                                    <Form.Control required value={description} onChange={(e) => setDescription(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese la descripción del Pokémon.</Form.Control.Feedback>
                                </Form.Group>

                                {/* Tipos */}
                                <Form.Group>
                                    <Form.Label>Tipo:</Form.Label>
                                    <Form.Select required value={idType} onChange={(e) => setIdType(e.target.value)}>
                                        <option value="">Seleccione un tipo...</option>
                                        {typesList.filter(type => filterTypes(type.id)).map(type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Por favor seleccione el tipo.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Check label="Añadir segundo tipo" onChange={(e) => setShowIdType2(e.target.checked)} />
                                </Form.Group>
                                {showIdType2 && (
                                    <Form.Group>
                                        <Form.Label>Segundo Tipo:</Form.Label>
                                        <Form.Select value={idType2} onChange={(e) => setIdType2(e.target.value)}>
                                            <option value="">Seleccione un tipo...</option>
                                            {typesList.filter(type => filterTypes(type.id)).map(type => (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                )}

                                <Form.Group>
                                    <Form.Label>Habilidad Principal:</Form.Label>
                                    <Form.Select required value={idAbility} onChange={(e) => setIdAbility(e.target.value)}>
                                        <option value="">Seleccione una habilidad...</option>
                                        {abilitiesList.filter(ability => filterAbilities(ability.id)).map(ability => (
                                            <option key={ability.id} value={ability.id}>{ability.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Por favor seleccione la habilidad principal.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Segunda Habilidad:</Form.Label>
                                    <Form.Select value={idAbility2} onChange={(e) => setIdAbility2(e.target.value)}>
                                        <option value="">Seleccione una habilidad...</option>
                                        {abilitiesList.filter(ability => filterAbilities(ability.id)).map(ability => (
                                            <option key={ability.id} value={ability.id}>{ability.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mt-3">
                                    <Form.Check label="Añadir tercera habilidad" onChange={(e) => setShowIdAbility3(e.target.checked)} />
                                </Form.Group>
                                {showIdAbility3 && (
                                    <Form.Group>
                                        <Form.Label>Tercera Habilidad:</Form.Label>
                                        <Form.Select value={idAbility3} onChange={(e) => setIdAbility3(e.target.value)}>
                                            <option value="">Seleccione una habilidad...</option>
                                            {abilitiesList.filter(ability => filterAbilities(ability.id)).map(ability => (
                                                <option key={ability.id} value={ability.id}>{ability.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                )}

                                <Form.Group>
                                    <Form.Label>HP:</Form.Label>
                                    <Form.Control required value={hp} type="number" onChange={(e) => setHp(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese HP.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Ataque:</Form.Label>
                                    <Form.Control required value={attack} type="number" onChange={(e) => setAttack(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese el ataque.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Defensa:</Form.Label>
                                    <Form.Control required value={defense} type="number" onChange={(e) => setDefense(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese la defensa.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Ataque Especial:</Form.Label>
                                    <Form.Control required value={specialAttack} type="number" onChange={(e) => setSpecialAttack(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese el ataque especial.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Defensa Especial:</Form.Label>
                                    <Form.Control required value={specialDefense} type="number" onChange={(e) => setSpecialDefense(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese la defensa especial.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Velocidad:</Form.Label>
                                    <Form.Control required value={speed} type="number" onChange={(e) => setSpeed(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese la velocidad.</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Nivel de Evolución:</Form.Label>
                                    <Form.Control required value={lvlEvolution} type="number" onChange={(e) => setLvlEvolution(e.target.value)} />
                                    <Form.Control.Feedback type="invalid">Por favor ingrese el nivel de evolución.</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" className="mt-3">Guardar Pokémon</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default FormPokemon;
