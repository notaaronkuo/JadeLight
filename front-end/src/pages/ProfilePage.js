import { React } from 'react';
import { Link } from "react-router-dom";
import "../css/Home.css";
import "../css/Navbar.css"
import "../css/Profile.css"
import PaymentList from './PaymentList';

function ProfilePage() {
    return (
        <>
            <section className="top-part">

                <section className="title">
                    <h1 className="logoName">JadeLight</h1>
                </section>

                <section className="navbar">
                    <Link style={{ textDecoration: 'none' }} to="/logout">Logout </Link>
                </section>

            </section>

            <section className="home-layout">

                <section className="left-part">
                    <h3 className="username">
                        Hello, User
                    </h3>
                    <Link id="submit-payment" style={{ textDecoration: 'none' }} to="/payments">Submit Payments </Link>

                </section>

                <section className="right-part">
                    <PaymentList />

                </section>



            </section>


        </>

    )
}

export default ProfilePage