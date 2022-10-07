import axios from "axios";
import Footer from "../Utils/Footer";
import Seat from "./Seat";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import loading from "../../assets/img/loading.svg";


export default function SeatSelection({ confirmSend }) {

    const { idSession } = useParams();
    const [sessionDetails, setSessionDetails] = useState();
    const [reserveSeats, setReserveSeats] = useState({ ids: [] });

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`);

        promise.then(response => {
            setSessionDetails(response.data);
        })
    }, [idSession]);


    if (sessionDetails === undefined) {
        return (
            <div className="loading">
                <img src={loading} />
                <h1>Loading, please wait...</h1>
            </div>
        );
    }

    const { movie, day, name } = sessionDetails;

    function handleSeat(idSeat, addArray) {
        if (addArray) {
            setReserveSeats({ ids: [...reserveSeats.ids, idSeat] });
        } else {
            setReserveSeats({
                ids: reserveSeats.ids.filter((idSeatCurrent) => {
                    return idSeatCurrent !== idSeat;
                })
            })
        }
    }

    function handleName(e) {
        setNome(e.target.value);

        setReserveSeats({
            ...reserveSeats,
            "name": e.target.value
        });
    }

    function handleCPF(e) {
        setCpf(e.target.value);

        setReserveSeats({
            ...reserveSeats,
            "cpf": e.target.value
        });
    }

    function tryAgain() {
        if (reserveSeats.ids.length === 0) {
            alert("Select a seat to proceed");
        } else if (nome.length === 0) {
            alert("Enter your full name to proceed");
        } else if (cpf.length !== 10) {
            alert("Enter phone number to proceed");
        }
    }

    function confirmation() {
        confirmSend(reserveSeats, idSession, '');
        axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, reserveSeats);
    }

    const isFilled = reserveSeats.ids.length !== 0 && nome.length !== 0 && !(cpf.length != 10);

    return (
        <main className="seat-selection-page">
            <div className="title-page">
                <span className="title">Select seat(s)</span>
            </div>
            <div className="seats">
                <div className="seats-to-choose">
                    {sessionDetails.seats.map(seat => (
                        (seat.isAvailable === true
                            ? <Seat classSeat="circle available" name={seat.name} id={seat.id} handle={handleSeat} />
                            : <Seat classSeat="circle unavailable" name={seat.name} />
                        )
                    ))}

                </div>
                <div className="seat-subtitle">
                    <div className="selected">
                        <div className="circle selected"></div>
                        Selected
                    </div>
                    <div className="available">
                        <div className="circle available"></div>
                        Available
                    </div>
                    <div className="unavailable">
                        <div className="circle unavailable"></div>
                        Unavailable
                    </div>

                </div>
            </div>

            <div className="buyer-info">
                <div className="buyer-name">
                    <span className="name">
                        Name of buyer:
                    </span>
                    <input type="text" className="input-name" placeholder='Type your name...' onChange={handleName} value={nome} />
                </div>
                <div className="buyer-cpf">
                    <span className="cpf">
                        Buyer phone number:
                    </span>
                    <input type="text" className="input-cpf" placeholder='Type your phone number...' onChange={handleCPF} value={cpf} />
                </div>
            </div>

            {isFilled === true
                ? <Link to="/receipt">
                    <Button isFilled={isFilled} onClick={() => confirmation()}>
                        Reserve seat(s)
                    </Button>
                </Link>
                : <Link to="#">
                    <Button isFilled={isFilled} onClick={() => tryAgain()}>
                        Reserve seat(s)
                    </Button>
                </Link>
            }

            <Footer
                src={movie.posterURL}
                alt={movie.title}
                title={movie.title}
                weekday={day.weekday}
                time={name}
            />
        </main>
    );
}

const Button = styled.button`
    width: 225px;
    height: 42px;

    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.04em;
    color: #fff;

    border-radius: 3px;
    background-color: #e8833a;

    margin: auto;
    margin-top: 35px;
    margin-bottom: 200px;

    cursor: ${({ isFilled }) => isFilled ? 'pointer' : 'not-allowed'};
    opacity: ${({ isFilled }) => isFilled ? '1' : '0.6'};
`