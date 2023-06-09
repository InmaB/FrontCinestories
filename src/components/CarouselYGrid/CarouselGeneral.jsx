import React from 'react'
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import SwiperCore, { Pagination, Navigation } from "swiper";
import PosterTopRated from './PosterTopRated';
import PosterGeneral from './PosterGeneral';


export default function CarouselGeneral({ movies, moviesByRated, tvByRated, upcoming }) {

    SwiperCore.use([Pagination, Navigation]);

    return (
        <Contenedor>
            <h1 className='titulo'>Lo más trending</h1>
            {/* Código dado por la librería Swiper, aunque está personalizado  */}

            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {/* Se realiza una verificación para asegurarse de que películas "movies" tenga datos. Luego, se utiliza slice(0, 20) para obtener solo las primeras 20 películas y se realiza un mapeo sobre ellas. En los siguientes "swiper" se realiza lo mismo, pero con distintos arreglos: upcoming, moviesByRated y tvByRated que trae las peliculas corresponsientes a: peliculas próximas, por mejor votación y series de mayor votación */}
                {movies && movies.slice(0, 20).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterGeneral movieData={movie} index={index} />
                    </SwiperSlide>
                ))}

            </Swiper>

            <h1 className='titulo'>Próximos estrenos de películas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {movies && upcoming.slice(0, 20).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterGeneral movieData={movie} index={index} />
                    </SwiperSlide>
                ))}


            </Swiper>
            <h1 className='titulo'>Las 10 películas mejores valoradas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {movies && moviesByRated.slice(0, 10).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterTopRated movieData={movie} index={index} />
                    </SwiperSlide>
                ))}


            </Swiper>
            <h1 className='titulo'>Las 10 series mejores valoradas</h1>
            <Swiper
                slidesPerView={5}
                centeredSlides={false}
                spaceBetween={15}
                pagination={{
                    type: 'progressbar',
                }}
                navigation={true}
                className="mySwiper"
            >
                {movies && tvByRated.slice(0, 10).map((movie, index) => (
                    <SwiperSlide key={movie.id}>
                        <PosterTopRated movieData={movie} index={index} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </Contenedor>
    );
}

// Estilos
const Contenedor = styled.div`

.swiper-pagination-progressbar {
  height: 3px;
  position: relative;
  bottom: 10px;
  margin-top: 0px;
}
.swiper-pagination-progressbar-fill {
  background-color: white;
}

.swiper {
    margin-bottom:2rem;
    --swiper-navigation-color: '#fff';
}

`;
