import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table} from "react-bootstrap";
import NavMenu from "../../components/NavMenu";

const PokemonDetailPage = () => {
    const { id } = useParams(); // Obtenemos el ID del Pokémon desde la URL
    const [pokemon, setPokemon] = useState(null);
    const [evolutionLine, setEvolutionLine] = useState([]);
    const [stats, setStats] = useState({});
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getPokemonDetails();
    }, [id]);

    const getPokemonDetails = () => {
        axios.get(`http://localhost:3000/pokemon/details/${id}`)
            .then(res => {
                const { pokemon, evolutionLine, stats } = res.data;
                console.log(evolutionLine);
                setPokemon(pokemon);
                setEvolutionLine(evolutionLine);
                setStats(stats);
                setImageUrl(`http://localhost:3000/pokemon/${pokemon.id}.jpg`);
            }).catch(error => {
                console.error(error);
            });
    };
    

    if (!pokemon) {
        return <div>Cargando...</div>;
    }

    return (
        <>
        <NavMenu />
        <Container className="mt-5">
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={imageUrl} alt={pokemon.name} />
                        <Card.Body>
                            <Card.Title>{pokemon.name}</Card.Title>
                            <Card.Text>
                                <strong>Número en la Pokédex:</strong> {pokemon.numPokedex} <br />
                                <strong>Descripción:</strong> {pokemon.description} <br />
                                <strong>Habilidades:</strong> 
                                <ul>
                                    <li>{pokemon.ability.name}</li>
                                    {pokemon.ability2 && <li>{pokemon.ability2.name}</li>}
                                    {pokemon.ability3 && <li>{pokemon.ability3.name}</li>}
                                </ul>
                                <strong>Tipos:</strong> 
                                <ul>
                                    <li>{pokemon.type.name}</li>
                                    {pokemon.type2 && <li>{pokemon.type2.name}</li>}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Estadísticas al nivel 100</Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Estadística</th>
                                        <th>Mínimo</th>
                                        <th>Máximo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>HP</td>
                                        <td>{stats.hp.min}</td>
                                        <td>{stats.hp.max}</td>
                                    </tr>
                                    <tr>
                                        <td>Ataque</td>
                                        <td>{stats.attack.min}</td>
                                        <td>{stats.attack.max}</td>
                                    </tr>
                                    <tr>
                                        <td>Defensa</td>
                                        <td>{stats.defense.min}</td>
                                        <td>{stats.defense.max}</td>
                                    </tr>
                                    <tr>
                                        <td>Ataque Especial</td>
                                        <td>{stats.specialAttack.min}</td>
                                        <td>{stats.specialAttack.max}</td>
                                    </tr>
                                    <tr>
                                        <td>Defensa Especial</td>
                                        <td>{stats.specialDefense.min}</td>
                                        <td>{stats.specialDefense.max}</td>
                                    </tr>
                                    <tr>
                                        <td>Velocidad</td>
                                        <td>{stats.speed.min}</td>
                                        <td>{stats.speed.max}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Línea Evolutiva</Card.Title>
                            <Row>
                                {evolutionLine.map((evo, index) => (
                                    <Col key={index} md={4}>
                                        <Card>
                                            <Card.Img variant="top" src={evo.imageUrl} alt={evo.name} />
                                            <Card.Body>
                                                <Card.Title>{evo.name}</Card.Title>
                                                <Card.Text>
                                                    Evoluciona al nivel {evo.lvlEvolution}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default PokemonDetailPage;
