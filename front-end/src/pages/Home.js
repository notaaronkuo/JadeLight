import { React } from 'react';
import { Link } from "react-router-dom";

import "../css/Home.css";
import "../css/Navbar.css"
import PaymentList from './PaymentList';

export const Home = () => {

    return (
        <>
            <section className="top-part">

                <section className="title">
                    <h1 className="logoName">JadeLight</h1>
                </section>

                <section className="navbar">
                    {/* <Link to="/">Home </Link> */}
                    {/* <p id="login" component={Link} to={'/login'}>Log in</p> */}
                    <Link id="login" style={{ textDecoration: 'none' }} to="/login">Log in </Link>
                    {/* <p id="signup" component={Link} to={'/register'}>Sign Up</p> */}
                    <Link id="signup" style={{ textDecoration: 'none' }} to="/register">Sign Up </Link>
                    {/* <Link to="/payments">Payments </Link> */}
                    {/* <Link to="/logout">Logout </Link> */}
                </section>

            </section>

            <section className='information'>
                <h2 style={{ margin: '200px auto', color: "aliceblue" }}>Please, Log In to make/see the payments</h2>

            </section>

            {/* <PaymentList /> */}
        </>
    );
}