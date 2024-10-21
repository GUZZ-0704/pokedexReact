import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TypeCard = ({ type, isAdmin, refreshTypeList }) => {
    const navigate = useNavigate();

    const goToDetail = () => {
        if (isAdmin) {
            navigate(`/admin/types/${type.id}`);
        } else {
            navigate(`/types/${type.id}`);
        }
    };

    const eliminarType = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar este tipo?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/type/${id}`)
            .then(res => {
                console.log(res.data);
                refreshTypeList();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <Card
            className="type-card mb-4"
            style={{ width: '12rem', cursor: 'pointer', position: 'relative' }}
            onClick={goToDetail}
        >
            <Card.Body
                className="text-center"
                style={{ position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}
            >
                <Card.Title className="mb-0">{type.name}</Card.Title>
                
                {isAdmin && (
                    <div className="d-flex justify-content-around mt-2">
                        <Link
                            className="btn btn-primary btn-sm"
                            to={`/admin/types/${type.id}`}
                            style={{ maxWidth: '45%' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <FaEdit /> Editar
                        </Link>
                        <Button
                            variant="danger"
                            className="btn-sm"
                            style={{ maxWidth: '45%' }}
                            onClick={(e) => { e.stopPropagation(); eliminarType(type.id); }}
                        >
                            <FaTrash /> Eliminar
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

TypeCard.propTypes = {
    type: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    refreshTypeList: PropTypes.func.isRequired,
};

export default TypeCard;
