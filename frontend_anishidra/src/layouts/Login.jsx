import { useState } from "react";
import styles from "./dashboardStyles/login.module.css";
import API_URL from "../api";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError("Username or password is incorrect.");
                return;
            }

            localStorage.setItem("token", data.token);

            window.location.href = "/dashboard";
        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.logo}>
                    <span>A</span>
                    <span>H</span>
                </div>

                <h1>Welcome Back</h1>
                <p>Sign in to access your dashboard</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
