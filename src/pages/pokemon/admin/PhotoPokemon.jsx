import axios from "axios";
import { useState } from "react";
import NavMenu from "../../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PhotoPokemon = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const [validated, setValidated] = useState(false);

    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]);
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);

        axios.post(`http://localhost:3000/pokemon/${id}/photo`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/admin/pokemon`);
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Subir Foto del Pokémon</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control required type="file" onChange={onChangePhoto} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo de imagen.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar foto</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PhotoPokemon;
