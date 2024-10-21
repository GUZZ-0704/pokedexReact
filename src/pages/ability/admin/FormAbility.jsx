import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormAbility = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getAbilityById();
        }
    }, [id]);

    const getAbilityById = () => {
        axios.get(`http://localhost:3000/ability/${id}`)
            .then(res => {
                const ability = res.data;
                setName(ability.name);
            }).catch(error => {
                console.log(error);
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

        const ability = { name };

        if (id) {
            editAbility(ability);
        } else {
            insertAbility(ability);
        }
    };

    const editAbility = (ability) => {
        axios.put(`http://localhost:3000/ability/${id}`, ability)
            .then(res => {
                console.log(res.data);
                navigate('/admin/abilities');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertAbility = (ability) => {
        axios.post('http://localhost:3000/ability', ability)
            .then(res => {
                console.log(res.data);
                navigate('/admin/abilities');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>{id ? 'Editar Habilidad' : 'Crear Habilidad'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre de la Habilidad:</Form.Label>
                                        <Form.Control
                                            required
                                            value={name}
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el nombre de la habilidad.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? 'Actualizar' : 'Guardar'}</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormAbility;
