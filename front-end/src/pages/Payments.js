// put payment js here
import { React, useState } from "react";
import { Redirect, useHistory, Link } from "react-router-dom";
import "../css/Login.css"

function Payments() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [username2, setUsername2] = useState("");
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState("");
    const [notes, setNotes] = useState("");
    const [checked, setchecked] = useState("");


    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [error, setError] = useState(null);


    function isValidPayment() {
        if (username === "" || username2 === "" || amount === 0 || type === "" || notes === "") {
            alert("Please fill all the fields");
        }
        else if (username === username2) {
            alert("Cannot send to yourself!");
        }
        else return true;
        return false;
    }

    const handlePayments = () => {

        if (isValidPayment()) {
            const body = {
                username: username,
                username2: username2,
                amount: amount,
                type: type,
                notes: notes,
            };
            const info = {
                method: "POST",
                body: JSON.stringify(body),
            };
            fetch("/Payment", info)
                .then(async (res) => {
                    let response = await res.json();
                    console.log(response);
                    if (response.paymentPossible) {
                        setIsPaymentDone(true);
                        console.log("Payment is made")
                        // history.push("/")
                    }
                    else {
                        alert("Payment failed");
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    if (isPaymentDone) {
        console.log("Payment done");
        return <Redirect to="/profile" />;
    }

    return (
        <>
            <section className="top-part">

                <section className="title">
                    <h1 className="logoName">JadeLight</h1>
                </section>

                <section className="navbar">
                    <Link style={{ textDecoration: 'none' }} to="/profile">Home </Link>
                    <Link style={{ textDecoration: 'none' }} to="/logout">Logout </Link>
                </section>

            </section>

            <div className="payments">
                <h2>Payment Form</h2>
                <div id="i-from">
                    <label>From:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div id="i-to">
                    <label>To:</label>
                    <input
                        value={username2}
                        onChange={(e) => setUsername2(e.target.value)} />
                </div>

                <div id="i-amount">
                    <label>Amount:</label>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div id="i-type" >
                    <label>Type:</label>
                    <input
                        type="radio"
                        value="Cash"
                        onChange={e => setType(e.target.value)}
                    />
                    <label for="css">Cash</label>
                    <input
                        type="radio"
                        value="Credit"
                        onChange={e => setType(e.target.value)}
                    />
                    <label for="css">Credit</label>
                </div>
                <div id="i-notes">
                    <label>Notes:</label>
                    <input
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button onClick={handlePayments}>Submit</button>
            </div>
        </>

    );
};

export default Payments;