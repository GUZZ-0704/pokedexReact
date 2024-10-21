import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import TypeList from './../../components/type/TypeList';
import PropTypes from 'prop-types';
import NavMenu from './../../components/NavMenu';
import NavMenuAdmin from './../../components/NavMenuAdmin';

const TypePage = ({ isAdmin }) => {
    const [typeList, setTypeList] = useState([]);

    useEffect(() => {
        fetchTypes();
    }, []);

    const fetchTypes = async () => {
        try {
            const response = await axios.get('http://localhost:3000/type');
            setTypeList(response.data);
        } catch (error) {
            console.error('Error fetching types:', error);
        }
    };

    return (
        <>
        {isAdmin ? <NavMenuAdmin /> : <NavMenu />}
        <Container className="mt-4">
            <h1 className="text-center">Tipos de Pokémon</h1>
            <TypeList
                types={typeList}
                isAdmin={isAdmin}
                refreshTypeList={fetchTypes}
            />
        </Container>
        </>
    );
};

TypePage.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

export default TypePage;
