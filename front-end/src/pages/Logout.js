import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function Logout() {
    const history = useHistory();
    useEffect(() => {
        fetch ("/LogOut");
        setTimeout(() => {
            history.push('/')
        }, 5000);
    }, []);


    return (
        <>
            <h1>You are now logged out</h1>
            <h1>You will be redirected in 5 seconds</h1>
            <h2>If you are not redirected</h2>
            <Link to="/">Click here</Link>
        </>
    );
}

export default Logout;