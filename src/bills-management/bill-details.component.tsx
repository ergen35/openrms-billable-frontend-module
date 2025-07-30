import React from 'react';
import { useParams } from 'react-router-dom';


const BillDetails: React.FC = () => {

    const params = useParams();

    return (
        <div style={{ paddingTop: 50 }}>
            <h3>Details for bill #{params.billId}</h3>
        </div>
    )
}


export default BillDetails;
