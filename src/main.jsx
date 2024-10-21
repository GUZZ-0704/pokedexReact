import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonPage from './pages/pokemon/PokemonPage';
import TypePage from './pages/type/TypePage';
import PokemonDetailPage from './pages/pokemon/PokemonDetailPage';
import FormPokemon from './pages/pokemon/admin/FormPokemon';
import FormEvolutions from './pages/pokemon/admin/FormEvolutions';
import PhotoPokemon from './pages/pokemon/admin/PhotoPokemon';
import FormType from './pages/type/admin/FormType';
import AbilityPage from './pages/ability/AbilityPage';
import FormAbility from './pages/ability/admin/FormAbility';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PokemonPage isAdmin={false} />,
  },
  {
    path: "/pokemon",
    element: <PokemonPage isAdmin={false} />,
  },
  {
    path: "/types",
    element: <TypePage isAdmin={false}/>
  },
  {
    path: "/abilities",
    element: <AbilityPage isAdmin={false}/>
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetailPage/>
  },
  {
    path: "/admin/pokemon",
    element: <PokemonPage isAdmin={true} />,
  },
  {
    path: "/admin/pokemon/create",
    element: <FormPokemon />,
  },{
    path: "/admin/pokemon/:id",
    element: <FormPokemon />,
  },
  {
    path: "/admin/pokemon/:id/evolutions",
    element: <FormEvolutions />,
  },
  {
    path: "/admin/pokemon/:id/photo",
    element: <PhotoPokemon/>,
  },
  {
    path: "/admin/types",
    element: <TypePage isAdmin={true}/>,
  },
  {
    path: "/admin/types/create",
    element: <FormType/>,
  },
  {
    path: "/admin/types/:id",
    element: <FormType/>,
  },
  {
    path: "/admin/abilities",
    element: <AbilityPage isAdmin={true}/>,
  },
  {
    path: "/admin/abilities/create",
    element: <FormAbility/>,
  },
  {
    path: "/admin/abilities/:id",
    element: <FormAbility/>,
  },
  
  
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

