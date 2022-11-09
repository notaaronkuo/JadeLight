import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Navbar.css"

function PaymentList() {

    const [allPayments, setAllPayments] = useState([]);
    useEffect(() => {
        fetch("/getPayments")
            .then(res => res.json())
            .then(data => {
                setAllPayments(data);
            })
            .catch(e => console.log(e));
        setTimeout(() => {
        }, 5000);
    }, []);


    return (
        <div className='payment-list'>
            <h2>Payments list</h2>
            {/* <button onClick={getpayments}>Get Payments</button> */}
            <section className="allPayments">
                {/* {getpayments} */}
                {allPayments.map(pay => {
                    return (
                        <div className='payments-info'>
                            <div className="payment-details">
                                <span id="from">{pay.username}</span> paid
                                <span id="to">{pay.username2}</span>
                                <span id="amount">${pay.amount}</span> in
                                <span id="type">{pay.type} </span>
                            </div>

                            <div className='note'>
                                <span id="notes">"{pay.notes}"</span>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    )
}

export default PaymentList