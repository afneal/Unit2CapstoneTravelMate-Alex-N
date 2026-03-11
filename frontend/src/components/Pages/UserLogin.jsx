import { useState } from "react";
import { useNavigate } from "react-router";



function UserLogin({ isLoggedIn, setIsLoggedIn, isNewUser, setIsNewUser, username, setUsername }) {
    const [password, setPassword] = useState("");

    const [hasErrors, setHasErrors] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();




    const handleLogin = async () => {
        const response = await fetch(`http://localhost:8080/api/users/login`, {

            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json();

        if (response.ok) {
            setIsLoggedIn(true);
            setIsNewUser(false);
            setHasErrors(false);
            setErrorMessage("");
            setUsername(username);
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
        } else {
            setHasErrors(true),
                setErrorMessage(data.message)
            setUsername("");
            setPassword("");
        }
    }

    const handleRegisterUser = async () => {
        const response = await fetch(`http://localhost:8080/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        const data = await response.json();

        if (response.ok) {
            setIsLoggedIn(true);
            setIsNewUser(false);
            setHasErrors(false);
            setErrorMessage("");
            localStorage.setItem("isLoggedIn", "true");
            navigate("/");
        } else {
            setHasErrors(true),
                setErrorMessage(data.message)

        }
    }





    return (
        <div className="user-login-form">
            {!isNewUser ? ( //ternary: not new user = login form
                <>
                    <div className="login-title">
                        <h1>Log In</h1>
                    </div>
                    <div className="login-inputs">
                        <input
                            className="username-input"
                            value={username}
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)} />


                        <input
                            className="password-input"
                            value={password}
                            type="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <button className="login-button" onClick={handleLogin}>Login</button>


                    <p>Don't have an account?</p>
                    <button className="create-account-button" onClick={() => {
                        setIsNewUser(true);
                        setErrorMessage("");
                        setHasErrors(false)
                    }}
                    >Create Account</button>
                    {hasErrors && <p className="error-message-login">{errorMessage}</p>}
                </>
            ) : ( //ternary: is new user = create new account form
                //if clicks "create account", toggles to isNewUser(true) to show 
                //"create an account" form
                <>
                    <div className="login-title">
                        <h1>Create an Account</h1>
                    </div>
                    <div className="login-inputs">
                        <input
                            className="username-input"
                            value={username}
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value)} />

                        <input
                            className="password-input"
                            value={password}
                            placeholder="Password"
                            type="password"
                            onChange={e => setPassword(e.target.value)} />
                    </div>
                    {hasErrors && <p className="error-message-register">{errorMessage}</p>}

                    <button className="create-account-button" onClick={handleRegisterUser}>Create Account</button>
                    <button className="login-back-button" onClick={() => setIsNewUser(false)}>Back to Login</button>

                </>
            )
            }
        </div>
    )
}

export default UserLogin;