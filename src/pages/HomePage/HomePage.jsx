import styled from "styled-components"
import axios from "axios";
import React, { useEffect, useState } from "react";
import loading from '../../assets/loading.gif';
import { Link } from "react-router-dom";

export default function HomePage() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';

        const promise = axios.get(URL);

        promise.then((resposta) =>{
            //console.log(resposta.data);
            setMovies(resposta.data);
        });

        promise.catch((erro) => {
            console.log(erro.response.data);
        });
    }, []);

    if(movies.length === 0){
        return(
            <LoadingDiv>
                <img src={loading}></img>
            </LoadingDiv>
        )
    }

    return (
        <PageContainer>
            Select Your Movie

            <ListContainer>
                {movies.map(movie => (
                    <MovieContainer key={movie.id} data-test="movie">
                        <Link to={`/sessoes/${movie.id}`}>
                            <img src={movie.posterURL} alt="movie poster"/>
                        </Link>
                    </MovieContainer>
                ))}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
const LoadingDiv = styled.div`
    padding-top: 10%;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
        width: 200px;
    }
`