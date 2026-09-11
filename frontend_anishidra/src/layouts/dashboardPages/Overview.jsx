import React, { useEffect, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import styles from "../dashboardStyles/overview.module.css";
import API_URL from '/src/api.js';




const API = {
    // Management APIs
    clients:
        `${API_URL}/api/management/clients/`,

    externalIncome:
        `${API_URL}/api/management/externalincomes/`,

    externalExpense:
        `${API_URL}/api/management/externalexpenses/`,

    // Other APIs
    messages:
        `${API_URL}/api/contact/contactmessages/`,

    visitors:
        `${API_URL}/api/visitors/`,

};

// ======================================================
// HELPERS
// ======================================================

const getToken = () => {
    return localStorage.getItem("token");
};

const request = async (url, options = {}) => {
    const token = getToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            errorText || "Request failed"
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

const numberValue = (value) => {
    return Number(value || 0);
};

const formatMoney = (value) => {
    return numberValue(value).toLocaleString(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }
    );
};

// ======================================================
// COMPONENT
// ======================================================

export default function Overview() {

    // ==================================================
    // DATA
    // ==================================================

    const [clients, setClients] = useState([]);
    const [externalIncome, setExternalIncome] = useState([]);
    const [externalExpense, setExternalExpense] = useState([]);

    const [messages, setMessages] = useState([]);
    const [visitors, setVisitors] = useState([]);

    // ==================================================
    // UI
    // ==================================================

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==================================================
    // FETCH MANAGEMENT DATA
    // ==================================================

    useEffect(() => {
        const fetchManagementData = async () => {
            try {
                const [
                    clientsData,
                    incomeData,
                    expenseData,
                ] = await Promise.all([
                    request(API.clients),
                    request(API.externalIncome),
                    request(API.externalExpense),
                ]);

                setClients(
                    Array.isArray(clientsData)
                        ? clientsData
                        : clientsData.results || []
                );

                setExternalIncome(
                    Array.isArray(incomeData)
                        ? incomeData
                        : incomeData.results || []
                );

                setExternalExpense(
                    Array.isArray(expenseData)
                        ? expenseData
                        : expenseData.results || []
                );

            } catch (error) {
                console.error(
                    "Management data error:",
                    error
                );

                setError(
                    "Unable to load management data."
                );
            } finally {
              setLoading(false);
            }
        };

        fetchManagementData();
    }, []);

    // ==================================================
    // FETCH MESSAGES
    // ==================================================

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await request(
                    API.messages
                );

                const messageList =
                    Array.isArray(data)
                        ? data
                        : data.results || [];

                setMessages(messageList);

            } catch (error) {
                console.error(
                    "Messages error:",
                    error
                );
            }
        };

        fetchMessages();
    }, []);

    // ==================================================
    // FETCH VISITORS
    // ==================================================
    
    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const data = await request(
                    API.visitors
                );

                const visitorList =
                    Array.isArray(data)
                        ? data
                        : data.results || [];

                setVisitors(visitorList);

            } catch (error) {
                console.error(
                    "Visitors error:",
                    error
                );
            }
        };

        fetchVisitors();
    }, []);


    // ==================================================
    // FINANCIAL CALCULATIONS
    // SAME LOGIC AS MANAGEMENT
    // ==================================================

    const calculations = useMemo(() => {

        // ----------------------------------------------
        // CLIENT INCOME
        // ----------------------------------------------

        const clientIncome = clients.reduce(
            (sum, client) =>
                sum +
                numberValue(client.amount),
            0
        );

        // ----------------------------------------------
        // CLIENT EXPENSES
        // ----------------------------------------------

        const clientExpenses = clients.reduce(
            (sum, client) =>
                sum +
                numberValue(client.expenses),
            0
        );

        // ----------------------------------------------
        // EXTERNAL GROSS INCOME
        // ----------------------------------------------

        const externalGrossIncome =
            externalIncome.reduce(
                (sum, item) =>
                    sum +
                    numberValue(item.amount),
                0
            );

        // ----------------------------------------------
        // EXTERNAL INCOME EXPENSES
        // ----------------------------------------------

        const externalIncomeExpenses =
            externalIncome.reduce(
                (sum, item) =>
                    sum +
                    numberValue(item.expenses),
                0
            );

        // ----------------------------------------------
        // EXTERNAL EXPENSES
        // ----------------------------------------------

        const externalExpenses =
            externalExpense.reduce(
                (sum, item) =>
                    sum +
                    numberValue(item.expenses),
                0
            );

        // ----------------------------------------------
        // TOTAL INCOME
        // SAME AS MANAGEMENT
        // ----------------------------------------------

        const totalIncome =
            clientIncome +
            externalGrossIncome;

        // ----------------------------------------------
        // TOTAL EXPENSES
        // SAME AS MANAGEMENT
        // ----------------------------------------------

        const totalExpenses =
            clientExpenses +
            externalIncomeExpenses +
            externalExpenses;

        // ----------------------------------------------
        // NET PROFIT / BALANCE
        // SAME AS MANAGEMENT
        // ----------------------------------------------

        const balance =
            totalIncome -
            totalExpenses;

        return {
            clientIncome,
            clientExpenses,
            externalGrossIncome,
            externalIncomeExpenses,
            externalExpenses,
            totalIncome,
            totalExpenses,
            balance,
        };

    }, [
        clients,
        externalIncome,
        externalExpense,
    ]);

    // ==================================================
    // VISITOR CALCULATIONS
    // ==================================================

    const totalVisitors = visitors.length;

    const currentMonth = new Date();

    const visitorsThisMonth =
        visitors.filter((visitor) => {

            const date =
                visitor.visited_at ||
                visitor.createdAt ||
                visitor.date;

            if (!date) {
                return false;
            }

            const visitorDate =
                new Date(date);

            return (
                visitorDate.getMonth() ===
                    currentMonth.getMonth() &&
                visitorDate.getFullYear() ===
                    currentMonth.getFullYear()
            );
        }).length;

    // ==================================================
    // LATEST 5 CLIENTS
    // ==================================================

    const latestClients = useMemo(() => {

        return [...clients]
            .sort((a, b) => {

                const dateA =
                    new Date(
                        a.start || 0
                    ).getTime();

                const dateB =
                    new Date(
                        b.start || 0
                    ).getTime();

                return dateB - dateA;
            })
            .slice(0, 5);

    }, [clients]);

    // ==================================================
    // UNREAD MESSAGES
    // ==================================================

    const unreadMessages = useMemo(() => {

        return messages
            .filter(
                (message) =>
                    message.is_read === false
            )
            .slice(0, 5);

    }, [messages]);

    // ==================================================
    // VISITOR CHART
    // ==================================================

    const visitorChartData = useMemo(() => {

        const days = {};

        visitors.forEach((visitor) => {

            const date =
                visitor.visited_at ||
                visitor.createdAt ||
                visitor.date;

            if (!date) {
                return;
            }

            const d = new Date(date);

            if (
                Number.isNaN(
                    d.getTime()
                )
            ) {
                return;
            }

            const key =
                d.toISOString().split("T")[0];

            if (!days[key]) {
                days[key] = 0;
            }

            days[key] += 1;
        });

        return Object.entries(days)
            .sort(([a], [b]) =>
                a.localeCompare(b)
            )
            .map(([date, count]) => ({
                date,
                visitors: count,
            }));

    }, [visitors]);

    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {
        return (
            <div className={styles.overview}>
                <div className={styles.empty}>
                    Loading Overview...
                </div>
            </div>
        );
    }

    // ==================================================
    // RENDER
    // ==================================================

    return (
        <div className={styles.overview}>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className={styles.heading}>

                <div>

                    <span>
                        WELCOME BACK
                    </span>

                    <h2>
                        Portfolio Overview
                    </h2>

                    <p>
                        Here's what's happening
                        with your portfolio.
                    </p>

                </div>

            </div>

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            {/* ==================================================
                STATS
            ================================================== */}

            <div className={styles.stats}>

                {/* TOTAL VISITORS */}

                <div className={styles.card}>

                    <span>
                        Visitors
                    </span>

                    <strong>
                        {totalVisitors.toLocaleString(
                            "en-US"
                        )}
                    </strong>

                    <small>
                        Visitors Total
                    </small>

                </div>

                {/* VISITORS THIS MONTH */}

                <div className={styles.card}>

                    <span>
                        Visitors
                    </span>

                    <strong>
                        {visitorsThisMonth.toLocaleString(
                            "en-US"
                        )}
                    </strong>

                    <small>
                        Visitors this month
                    </small>

                </div>

                {/* TOTAL GROSS INCOME */}

                <div className={styles.card}>

                    <span>
                        Gross Income
                    </span>

                    <strong
                        className={
                            styles.income
                        }
                    >
                        + $ {formatMoney(
                            calculations.totalIncome
                        )}
                    </strong>

                    <small>
                        Total Gross Income
                    </small>

                </div>

                {/* NET PROFIT */}

                <div className={styles.card}>

                    <span>
                        Net Profit
                    </span>

                    <strong
                        className={
                            calculations.balance >= 0
                                ? styles.income
                                : styles.expense
                        }
                    >
                        {calculations.balance >= 0
                            ? "+ "
                            : "- "
                        }
                        $ {formatMoney(
                            Math.abs(
                                calculations.balance
                            )
                        )}
                    </strong>

                    <small>
                        Net Profit Remaining
                    </small>

                </div>

            </div>

            {/* ==================================================
                CHART + CLIENTS
            ================================================== */}

            <div className={styles.grid}>

                {/* VISITOR CHART */}

                <div className={styles.panel}>

                    <div
                        className={
                            styles.panelHeader
                        }
                    >

                        <div>

                            <h3>
                                Visitors Over Time
                            </h3>

                            <p>
                                Portfolio traffic
                            </p>

                        </div>

                    </div>

                    <div
                        className={
                            styles.chartPlaceholder
                        }
                    >

                        {visitorChartData.length === 0 ? (

                            <div
                                className={
                                    styles.empty
                                }
                            >
                                No visitor data yet
                            </div>

                        ) : (

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >

                                <LineChart
                                    data={
                                        visitorChartData
                                    }
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="date"
                                    />

                                    <YAxis
                                        allowDecimals={false}
                                    />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="visitors"
                                        name="Visitors"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={{
                                            r: 4
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        )}

                    </div>

                </div>

                {/* LATEST CLIENTS */}

                <div className={styles.panel}>

                    <div
                        className={
                            styles.panelHeader
                        }
                    >

                        <div>

                            <h3>
                                Clients
                            </h3>

                            <p>
                                Latest 5 clients
                            </p>

                        </div>

                    </div>

                    {latestClients.length === 0 ? (

                        <div
                            className={
                                styles.empty
                            }
                        >
                            No clients yet
                        </div>

                    ) : (

                        <div
                            className={
                                styles.clientList
                            }
                        >

                            {latestClients.map(
                                (client) => (

                                    <div
                                        key={client.id}
                                        className={
                                            styles.clientItem
                                        }
                                    >

                                        <div>

                                            <strong>
                                                {
                                                    client.firstName
                                                }{" "}
                                                {
                                                    client.lastName
                                                }
                                            </strong>

                                            <small>
                                                {
                                                    client.role
                                                }
                                            </small>

                                        </div>

                                        <div>

                                            <small>
                                                {
                                                    client.type
                                                }
                                            </small>

                                            <span className={`${styles.status} ${styles[client.status]}`} >
                                                {client.status}
                                            </span>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

            {/* ==================================================
                RECENT UNREAD MESSAGES
            ================================================== */}

            <div className={styles.panel}>

                <div
                    className={
                        styles.panelHeader
                    }
                >

                    <div>

                        <h3>
                            Recent Messages
                        </h3>

                        <p>
                            Unread messages
                        </p>

                    </div>

                    <button
                        onClick={() => {
                            window.location.href =
                                "/dashboard";
                        }}
                    >
                        View all
                    </button>

                </div>

                {unreadMessages.length === 0 ? (

                    <div
                        className={
                            styles.empty
                        }
                    >
                        No unread messages
                    </div>

                ) : (

                    <div
                        className={
                            styles.messageList
                        }
                    >

                        {unreadMessages.map(
                            (message) => (

                                <div
                                    key={message.id}
                                    className={
                                        styles.messageItem
                                    }
                                >

                                    <div>

                                        <strong>
                                            {
                                                message.firstName
                                            }{" "}
                                            {
                                                message.lastName
                                            }
                                        </strong>

                                        <small>
                                            {
                                                message.email
                                            }
                                        </small>

                                    </div>

                                    <div>

                                        <small>
                                            WhatsApp:{" "}
                                            {
                                                message.whatsapp ||
                                                "—"
                                            }
                                        </small>

                                        <span>
                                            {
                                                message.subject
                                            }
                                        </span>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}
