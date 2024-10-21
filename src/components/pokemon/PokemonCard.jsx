import { Card, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FaEdit, FaTrash, FaCamera, FaLink } from 'react-icons/fa';

const PokemonCard = ({ pokemon, isAdmin, refreshPokemonList }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    if (isAdmin) {
      navigate(`/admin/pokemon/${pokemon.id}`);
    } else {
      navigate(`/pokemon/${pokemon.id}`);
    }
  };

  const eliminarPokemon = (id) => {
    const confirm = window.confirm("¿Está seguro de eliminar este Pokémon?");
    if (!confirm) {
      return;
    }
    axios.delete(`http://localhost:3000/pokemon/${id}`)
      .then(res => {
        console.log(res.data);
        refreshPokemonList();
      }).catch(error => {
        console.log(error);
      });
  };

  return (
    <Card
      className="pokemon-card mb-4"
      style={{ width: '14rem', cursor: 'pointer', position: 'relative' }}
      onClick={goToDetail}
    >
      <Card.Img
        variant="top"
        src={`http://localhost:3000/pokemon/${pokemon.id}.jpg`}
        alt={pokemon.name}
        style={{ borderRadius: '10px', objectFit: 'cover' }}
      />

      <Card.Body
        className="text-dark"
        style={{ position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px' }}
      >
        <Card.Title className="mb-1 text-center">{pokemon.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center"># {pokemon.numPokedex}</Card.Subtitle>

        {isAdmin && (
          <div className="d-flex flex-wrap justify-content-around mt-3 gap-2">
            <Link
              className="btn btn-secondary btn-sm"
              to={`/admin/pokemon/${pokemon.id}/photo`}
              onClick={(e) => e.stopPropagation()}
            >
              <FaCamera /> Foto
            </Link>

            <Link
              className="btn btn-primary btn-sm"
              to={`/admin/pokemon/${pokemon.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <FaEdit /> Editar
            </Link>

            <Link
              className="btn btn-warning btn-sm"
              to={`/admin/pokemon/${pokemon.id}/evolutions`}
              onClick={(e) => { e.stopPropagation();}}
            >
              <FaLink /> Evoluciones
            </Link>

            <Button
              variant="danger"
              size="sm"
              onClick={(e) => { e.stopPropagation(); eliminarPokemon(pokemon.id); }}
            >
              <FaTrash /> Eliminar
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    numPokedex: PropTypes.number.isRequired,
  }).isRequired,
  isAdmin: PropTypes.bool,
  refreshPokemonList: PropTypes.func,
};

export default PokemonCard;
