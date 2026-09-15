import { useState } from "react";
import styles from "./dashboardStyles/dashboard.module.css";
import image from "../assets/picture_profile.png";
import icon from "/icon.png";
import Overview from "./dashboardPages/Overview";
import Main from "./dashboardPages/Main";
import Management from "./dashboardPages/Management";
import Message from "./dashboardPages/Message";

export default function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    const [activePage, setActivePage] = useState("Overview");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const menuItems = [
        { name: "Overview", icon: "🌐" },
        { name: "Main", icon: "🏠" },
        { name: "Management", icon: "💲" },
        { name: "Message", icon: "✉️" },
    ];
    const renderPage = () => {
        switch (activePage) {
            case "Overview":
                return <Overview />;
            case "Main":
                return <Main />;
            case "Management":
                return <Management />;
            case "Message":
                return <Message />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className={styles.dashboard}>
            {/* Aurora Background */}

            <div className={styles.aurora}></div>

            {/* Sidebar */}

            <aside
                className={`${styles.sidebar} ${
                    sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
                }`}
            >
                {/* Logo */}

                <div className={styles.logo}>
                    <div className={styles.logoMark}>
                        <img src={icon} alt="" />
                    </div>

                    <div className={styles.logoText}>
                        <strong>MY</strong>
                        <span>PORTFOLIO</span>
                    </div>

                    <button
                        className={styles.menuButton}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        🗙
                    </button>
                </div>

                {/* Profile */}

                <div className={styles.profile}>
                    <div className={styles.profileAvatar}>
                        <img src={image} alt="logo" />
                    </div>

                    <div className={styles.profileInfo}>
                        <strong>Admin</strong>
                        <span>Portfolio Owner</span>
                    </div>
                </div>

                {/* Navigation */}

                <nav className={styles.navigation}>
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            className={`${styles.navItem} ${
                                activePage === item.name ? styles.active : ""
                            }`}
                            onClick={() => setActivePage(item.name)}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>

                            <span className={styles.navText}>{item.name}</span>
                        </button>
                    ))}
                </nav>

                {/* Sidebar Bottom */}

                <div className={styles.sidebarBottom}>
                    <button
                        onClick={handleLogout}
                        className={styles.bottomButton}
                    >
                        <span>⏻</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}

            <div
                className={`${styles.mainArea} ${
                    sidebarOpen ? styles.mainWithSidebar : styles.mainFull
                }`}
            >
                {/* Topbar */}

                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <button
                            className={styles.menuButton}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>

                        <div>
                            <h1>{activePage}</h1>
                            <p>Manage your portfolio</p>
                        </div>
                    </div>

                    <div className={styles.topbarRight}>
                        <div className={styles.topProfile}>
                            <div className={styles.topAvatar}>
                                <img src={image} alt="logo" />
                            </div>

                            <div>
                                <strong>Admin</strong>
                                <span>Administrator</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}

                <main className={styles.content}>{renderPage()}</main>
            </div>
        </div>
    );
}
