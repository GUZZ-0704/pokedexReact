import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AbilityList from './../../components/ability/AbilityList';
import NavMenu from './../../components/NavMenu';
import NavMenuAdmin from './../../components/NavMenuAdmin';

const AbilityPage = ({ isAdmin }) => {
    const [abilityList, setAbilityList] = useState([]);

    useEffect(() => {
        fetchAbilities();
    }, []);

    const fetchAbilities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/ability');
            setAbilityList(response.data);
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    };

    return (
        <>
        {isAdmin ? <NavMenuAdmin /> : <NavMenu />}
        <Container className="mt-4">
            <h1 className="text-center">Habilidades de Pokémon</h1>
            <AbilityList
                abilities={abilityList}
                isAdmin={isAdmin}
                refreshAbilityList={fetchAbilities}
            />
        </Container>
        </>
    );
};

AbilityPage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default AbilityPage;
