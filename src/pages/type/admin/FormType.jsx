import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormType = () => {
    const navigate = useNavigate();
    const { id } = useParams();  // Obtenemos el ID del tipo para saber si estamos en modo edición

    // Estado para el nombre del tipo
    const [name, setName] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (id) {
            getTypeById();
        }
    }, [id]);

    const getTypeById = () => {
        axios.get(`http://localhost:3000/type/${id}`)
            .then(res => {
                const type = res.data;
                setName(type.name);
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

        const type = { name };

        if (id) {
            editType(type);
        } else {
            insertType(type);
        }
    };

    const editType = (type) => {
        axios.put(`http://localhost:3000/type/${id}`, type)
            .then(res => {
                console.log(res.data);
                navigate('/admin/types');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertType = (type) => {
        axios.post('http://localhost:3000/type', type)
            .then(res => {
                console.log(res.data);
                navigate('/admin/types');
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
                                    <h2>{id ? 'Editar Tipo' : 'Crear Tipo'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre del Tipo:</Form.Label>
                                        <Form.Control
                                            required
                                            value={name}
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese el nombre del tipo.
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

export default FormType;
