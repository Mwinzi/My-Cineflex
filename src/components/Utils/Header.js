import { useNavigate } from "react-router-dom";
import backArrow from "../../assets/img/back-arrow.svg";

export default function Header() {
    const navigate = useNavigate();

    function Navigate() {
        navigate(-1);
    }

    return (
        <>
            {window.location.pathname !== "/"
                ?
                <header className="header">
                    <p>CINEFLEX</p>
                    <ion-icon onClick={Navigate} className="back-arrow" name="chevron-back-sharp"></ion-icon>
                </header>
                :
                <header className="header">
                    <p>CINEFLEX</p>
                    <h1>This<br />is<br />Cinema</h1>
                </header>
            }
        </>
    );
}
