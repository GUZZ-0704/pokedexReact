import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TypeCard from './TypeCard';

const TypeList = ({ types, isAdmin, refreshTypeList }) => {
    return (
        <Container>
            <Row>
                {types.map((type) => (
                    <Col key={type.id} md={4}>
                        <TypeCard
                            type={type}
                            isAdmin={isAdmin}
                            refreshTypeList={refreshTypeList}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

TypeList.propTypes = {
    types: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    refreshTypeList: PropTypes.func.isRequired,
};

export default TypeList;
