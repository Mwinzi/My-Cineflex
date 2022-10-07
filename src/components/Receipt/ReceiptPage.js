import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import loading from "../../assets/img/loading.svg";

export default function ReceiptPage({ confirmSend }) {

    const [movieSession, setMovieSession] = useState();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${confirmSend.sessionId}/seats`);

        promise.then(response => {
            setMovieSession(response.data);
        });
    }, [confirmSend.sessionId]);

    if (movieSession === undefined) {
        return (
            <div className="loading">
                <img src={loading} />
                <h1>Loading, please wait...</h1>
            </div>
        );
    }

    confirmSend.cpf = confirmSend.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return (
        <main className="receipt-page">
            <div className="title-page">
                <span className="title">Order placed<br />successfully</span>
            </div>
            <div className="content">
                <div className="movie-session">
                    <div className="container">
                        <div className="title">
                            Movie in session
                        </div>
                        <div className="data">
                            {movieSession.movie.title}
                        </div>
                        <div className="data">
                            {movieSession.day.date} {movieSession.name}
                        </div>
                    </div>
                </div>
                <div className="tickets">
                    <div className="container">

                        <div className="title">
                            Tickets
                        </div>
                        {confirmSend.ids.map(seat => (
                            <div className="data">
                                Seat {seat % 50 === 0 ? "50" : seat % 50}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="buyer">
                    <div className="container">

                        <div className="title">
                            Buyer
                        </div>
                        <div className="data">
                            Name: {confirmSend.name}
                        </div>
                        <div className="data">
                            Phone: {confirmSend.cpf}
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/">
                <div className="home-button">
                    <button>Go to Home</button>
                </div>
            </Link>

        </main>
    );
}
