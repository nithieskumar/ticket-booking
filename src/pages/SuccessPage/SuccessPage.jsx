import styled from "styled-components"
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

export default function SuccessPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    console.log(state);

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/orders', state.reserveInfo);
            console.log('Order placed:', response.data);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <PageContainer>
            <h1>Order placed<br />successfully!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Film and session</p></strong>
                <p>{state.reserveInfo.movie}</p>
                <p>{state.reserveInfo.day} - {state.reserveInfo.hour}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Tickets</p></strong>
                {state.reserveInfo.seats.map((seat) => {
                    return <p key={seat}>Seat {seat}</p>;
                })}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Buyer</p></strong>
                <p>Name: {state.reserveInfo.name}</p>
                <p>CPF: {state.reserveInfo.cpf}</p>
            </TextContainer>

            <button onClick={() => {
                handlePlaceOrder();
                navigate("/");
            }} data-test="go-home-btn">Return to Home</button>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;
    p{
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
    }
    a {
        text-decoration: none;
    }
    button {
        margin-top: 20px;
        align-self: center;
        font-size: 18px;
        padding: 15px;
        padding-left: 65px;
        padding-right: 65px;
        color: #FFFFFF;
        background-color: #E8833A;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 25px;
    strong {
        font-weight: bold;
        margin-bottom: 5px;
    }
`;
