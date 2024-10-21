import PropTypes from 'prop-types';
import AbilityCard from './AbilityCard';

const AbilityList = ({ abilities, isAdmin, refreshAbilityList }) => {
    return (
        <div className="ability-list d-flex flex-wrap justify-content-center gap-3">
            {abilities.map(ability => (
                <AbilityCard
                    key={ability.id}
                    ability={ability}
                    isAdmin={isAdmin}
                    refreshAbilityList={refreshAbilityList}
                />
            ))}
        </div>
    );
};

AbilityList.propTypes = {
    abilities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    refreshAbilityList: PropTypes.func.isRequired,
};

export default AbilityList;
