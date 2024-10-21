import PropTypes from 'prop-types';
import { Row, Col, Container } from 'react-bootstrap';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemonList, isAdmin, refreshPokemonList }) => {
  return (
    <Container>
      <Row className="mt-4">
        {pokemonList.map((pokemon) => (
          <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <PokemonCard
              pokemon={pokemon}
              isAdmin={isAdmin}
              refreshPokemonList={refreshPokemonList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

PokemonList.propTypes = {
  pokemonList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numPokedex: PropTypes.number.isRequired,
    })
  ).isRequired,
  isAdmin: PropTypes.bool.isRequired,
  refreshPokemonList: PropTypes.func.isRequired,
};

export default PokemonList;
