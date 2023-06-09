import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Registro from './pages/Registro';
import Cinestories from './pages/Cinestories';
import Pelis from './pages/Pelis';
import SeriesyTv from './pages/SeriesyTv';
import InfoPeli from './pages/InfoPeli';
import ListaFavoritas from './pages/ListaFavoritas';
import ListaPendientes from './pages/ListaPendientes';

export default function App() {

  return (
    //Con BrowserRouter hace que la app responda a diferentes URLs sin necesidad de cargar una nueva página.
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/registro' element={<Registro />}></Route>
        <Route exact path='/' element={<Cinestories />}></Route>
        <Route exact path='/peliculas' element={<Pelis />}></Route>
        <Route exact path='/seriestv' element={<SeriesyTv />}></Route>
        <Route exact path='/listaFavoritas' element={<ListaFavoritas />}></Route>
        <Route exact path='/listaPendientes' element={<ListaPendientes />}></Route>
        <Route exact path='/infoPeli' element={<InfoPeli />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

