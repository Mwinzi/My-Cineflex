import { useState } from "react";

export default function Seat({ classSeat, name, id, handle }) {
    const [isSelected, setSelected] = useState(classSeat);

    function choosenSeat(selectedSeat, idSelectedSeat) {
        if (selectedSeat === 'circle available') {
            if (idSelectedSeat === 'circle selected') {
                handle(id, false);
                setSelected('circle available');
            } else {
                handle(id, true);
                setSelected('circle selected');
            }
        } else {
            alert('This seat is not available')
        }
    }

    return (
        <div className={isSelected} onClick={() => choosenSeat(classSeat, isSelected)}>
            {name}
        </div>
    );
}