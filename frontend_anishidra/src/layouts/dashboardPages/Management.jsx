import React, { useEffect, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import styles from "../dashboardStyles/management.module.css";
import API_URL from '/src/api.js';



// ======================================================
// API URLS
// ======================================================

const API = {
    clients: `${API_URL}/api/management/clients/`,
    externalIncome: `${API_URL}/api/management/externalincomes/`,
    externalExpense: `${API_URL}/api/management/externalexpenses/`,
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
        throw new Error(errorText || "Request failed");
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};


const numberValue = (value) => {
    return Number(value || 0);
};


const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numberValue(value));
};


const incomeDisplay = (value) => {
    return `+ $ ${formatNumber(value)}`;
};


const expenseDisplay = (value) => {
    return `- $ ${formatNumber(value)}`;
};


const formatDate = (date) => {
    if (!date) return "—";

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleDateString("en-GB");
};


const getMonthKey = (date) => {
    if (!date) return null;

    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
        return null;
    }

    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};


const getMonthLabel = (monthKey) => {
    if (!monthKey) return "";

    const [year, month] = monthKey.split("-");

    const date = new Date(
        Number(year),
        Number(month) - 1,
        1
    );

    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};


// ======================================================
// COMPONENT
// ======================================================

export default function Management() {

    // --------------------------------------------------
    // DATA
    // --------------------------------------------------

    const [clients, setClients] = useState([]);
    const [externalIncome, setExternalIncome] = useState([]);
    const [externalExpense, setExternalExpense] = useState([]);

    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeModal, setActiveModal] = useState(null);

    const [editingClient, setEditingClient] = useState(null);
    const [editingIncome, setEditingIncome] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);

    // --------------------------------------------------
    // FORMS
    // --------------------------------------------------

    const emptyClient = {
        firstName: "",
        lastName: "",
        role: "",
        email: "",
        whatsapp: "",
        type: "",
        start: "",
        end: "",
        amount: "",
        expenses: "",
        status: "In Progress",
    };

    const emptyIncome = {
        source: "",
        type: "",
        amount: "",
        expenses: "",
        date: "",
    };

    const emptyExpense = {
        beneficiary: "",
        type: "",
        expenses: "",
        date: "",
    };

    const [clientForm, setClientForm] = useState(emptyClient);
    const [incomeForm, setIncomeForm] = useState(emptyIncome);
    const [expenseForm, setExpenseForm] = useState(emptyExpense);


    // ==================================================
    // FETCH DATA
    // ==================================================

    const fetchData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                clientsData,
                incomeData,
                expenseData
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

        } catch (err) {

            console.error(err);

            setError(
                "Unable to load management data."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    // ==================================================
    // CALCULATIONS
    // ==================================================

    const calculations = useMemo(() => {

        const clientIncome = clients.reduce(
            (sum, client) => {
                if(client.status === "Delivered") {
                    return sum + numberValue(client.amount);
                }
                return sum;
            },
                0
        );


        const clientExpenses = clients.reduce(
            (sum, client) =>
                sum + numberValue(client.expenses),
            0
        );


        const externalGrossIncome =
            externalIncome.reduce(
                (sum, item) =>
                    sum + numberValue(item.amount),
                0
            );


        const externalIncomeExpenses =
            externalIncome.reduce(
                (sum, item) =>
                    sum + numberValue(item.expenses),
                0
            );


        const externalExpenses =
            externalExpense.reduce(
                (sum, item) =>
                    sum + numberValue(item.expenses),
                0
            );


        const totalIncome =
            clientIncome +
            externalGrossIncome;


        const totalExpenses =
            clientExpenses +
            externalIncomeExpenses +
            externalExpenses;


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
    // CURRENCY
    // ==================================================

    const [rates, setRates] = useState({
        EUR: null,
        GBP: null,
        CHF: null,
        DZD: null,
    });


    useEffect(() => {

        const fetchRates = async () => {

            try {

                const response = await fetch(
                    "https://open.er-api.com/v6/latest/USD"
                );

                if (!response.ok) {
                    throw new Error("Currency request failed");
                }

                const data = await response.json();

                setRates({
                    EUR: data.rates.EUR,
                    GBP: data.rates.GBP,
                    CHF: data.rates.CHF,
                    DZD: data.rates.DZD,
                });

            } catch (error) {

                console.error(
                    "Currency rate error:",
                    error
                );

            }
        };


        fetchRates();

    }, []);


    const convertedBalance = {
        EUR:
            rates.EUR !== null
                ? calculations.balance * rates.EUR
                : null,

        GBP:
            rates.GBP !== null
                ? calculations.balance * rates.GBP
                : null,

        CHF:
            rates.CHF !== null
                ? calculations.balance * rates.CHF
                : null,

        DZD:
            rates.DZD !== null
                ? calculations.balance * rates.DZD
                : null,
    };


    // ==================================================
    // CHART DATA
    // ==================================================

    const chartData = useMemo(() => {

        const months = {};


        const addIncome = (date, amount) => {

            const key = getMonthKey(date);

            if (!key) return;

            if (!months[key]) {
                months[key] = {
                    month: key,
                    income: 0,
                    expenses: 0,
                };
            }

            months[key].income +=
                numberValue(amount);
        };


        const addExpense = (date, amount) => {

            const key = getMonthKey(date);

            if (!key) return;

            if (!months[key]) {
                months[key] = {
                    month: key,
                    income: 0,
                    expenses: 0,
                };
            }

            months[key].expenses +=
                numberValue(amount);
        };


        clients.forEach(client => {

            addIncome(
                client.start,
                client.amount
            );

            addExpense(
                client.start,
                client.expenses
            );

        });


        externalIncome.forEach(item => {

            addIncome(
                item.date,
                item.amount
            );

            addExpense(
                item.date,
                item.expenses
            );

        });


        externalExpense.forEach(item => {

            addExpense(
                item.date,
                item.expenses
            );

        });


        return Object.values(months)
            .sort((a, b) =>
                a.month.localeCompare(b.month)
            )
            .map(item => ({
                ...item,
                label: getMonthLabel(item.month),
            }));

    }, [
        clients,
        externalIncome,
        externalExpense,
    ]);


    // ==================================================
    // CLIENT CRUD
    // ==================================================

    const openAddClient = () => {

        setEditingClient(null);
        setClientForm(emptyClient);
        setActiveModal("client");

    };


    const openEditClient = (client) => {

        setEditingClient(client);

        setClientForm({
            firstName: client.firstName || "",
            lastName: client.lastName || "",
            role: client.role || "",
            email: client.email || "",
            whatsapp: client.whatsapp || "",
            type: client.type || "",
            start: client.start || "",
            end: client.end || "",
            amount: client.amount || "",
            expenses: client.expenses || "",
            status: client.status || "In Progress",
        });

        setActiveModal("client");

    };


    const saveClient = async (e) => {

        e.preventDefault();

        try {

            const body = {
                ...clientForm,
                amount: Number(clientForm.amount),
                expenses: Number(clientForm.expenses),
            };


            if (editingClient) {

                await request(
                    `${API.clients}${editingClient.id}/`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(body),
                    }
                );

            } else {

                await request(
                    API.clients,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                    }
                );

            }


            setActiveModal(null);

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to save client."
            );

        }

    };


    const deleteClient = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this client?"
            )
        ) {
            return;
        }


        try {

            await request(
                `${API.clients}${id}/`,
                {
                    method: "DELETE",
                }
            );

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete client."
            );

        }

    };


    // ==================================================
    // EXTERNAL INCOME CRUD
    // ==================================================

    const openAddIncome = () => {

        setEditingIncome(null);
        setIncomeForm(emptyIncome);
        setActiveModal("income");

    };


    const openEditIncome = (item) => {

        setEditingIncome(item);

        setIncomeForm({
            source: item.source || "",
            type: item.type || "",
            amount: item.amount || "",
            expenses: item.expenses || "",
            date: item.date || "",
        });

        setActiveModal("income");

    };


    const saveIncome = async (e) => {

        e.preventDefault();

        try {

            const body = {
                ...incomeForm,
                amount: Number(incomeForm.amount),
                expenses: Number(incomeForm.expenses),
            };


            if (editingIncome) {

                await request(
                    `${API.externalIncome}${editingIncome.id}/`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(body),
                    }
                );

            } else {

                await request(
                    API.externalIncome,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                    }
                );

            }


            setActiveModal(null);

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to save external income."
            );

        }

    };


    const deleteIncome = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this income?"
            )
        ) {
            return;
        }


        try {

            await request(
                `${API.externalIncome}${id}/`,
                {
                    method: "DELETE",
                }
            );

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete external income."
            );

        }

    };


    // ==================================================
    // EXTERNAL EXPENSE CRUD
    // ==================================================

    const openAddExpense = () => {

        setEditingExpense(null);
        setExpenseForm(emptyExpense);
        setActiveModal("expense");

    };


    const openEditExpense = (item) => {

        setEditingExpense(item);

        setExpenseForm({
            beneficiary:
                item.beneficiary || "",

            type:
                item.type || "",

            expenses:
                item.expenses || "",

            date:
                item.date || "",
        });

        setActiveModal("expense");

    };


    const saveExpense = async (e) => {

        e.preventDefault();

        try {

            const body = {
                ...expenseForm,
                expenses: Number(
                    expenseForm.expenses
                ),
            };


            if (editingExpense) {

                await request(
                    `${API.externalExpense}${editingExpense.id}/`,
                    {
                        method: "PATCH",
                        body: JSON.stringify(body),
                    }
                );

            } else {

                await request(
                    API.externalExpense,
                    {
                        method: "POST",
                        body: JSON.stringify(body),
                    }
                );

            }


            setActiveModal(null);

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to save external expense."
            );

        }

    };


    const deleteExpense = async (id) => {

        if (
            !window.confirm(
                "Are you sure you want to delete this expense?"
            )
        ) {
            return;
        }


        try {

            await request(
                `${API.externalExpense}${id}/`,
                {
                    method: "DELETE",
                }
            );

            await fetchData();

        } catch (err) {

            console.error(err);

            alert(
                "Unable to delete external expense."
            );

        }

    };


    // ==================================================
    // LOADING
    // ==================================================

    if (loading) {

        return (
            <div className={styles.loading}>
                Loading Management...
            </div>
        );

    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <div className={styles.management}>

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className={styles.pageHeader}>

                <div>
                    <h1>Management</h1>

                    <p>
                        Manage clients, incomes,
                        expenses and profits.
                    </p>
                </div>

            </div>


            {error && (

                <div className={styles.error}>
                    {error}
                </div>

            )}


            {/* ==================================================
                BALANCE
            ================================================== */}

            <section className={styles.balanceSection}>

                <span className={styles.balanceLabel}>
                    TOTAL BALANCE
                </span>

                <div
                    className={`${styles.balanceAmount} ${
                        calculations.balance >= 0
                            ? styles.positive
                            : styles.negative
                    }`}
                >
                    {calculations.balance >= 0
                        ? "+ "
                        : "- "
                    }

                    $ {formatNumber(
                        Math.abs(
                            calculations.balance
                        )
                    )}
                </div>


                <div className={styles.currencies}>

                    <Currency
                        name="EUR"
                        value={convertedBalance.EUR}
                        positive={
                            calculations.balance >= 0
                        }
                    />

                    <Currency
                        name="GBP"
                        value={convertedBalance.GBP}
                        positive={
                            calculations.balance >= 0
                        }
                    />

                    <Currency
                        name="CHF"
                        value={convertedBalance.CHF}
                        positive={
                            calculations.balance >= 0
                        }
                    />

                    <Currency
                        name="DZD"
                        value={convertedBalance.DZD}
                        positive={
                            calculations.balance >= 0
                        }
                    />

                </div>


                <div className={styles.balanceSummary}>

                    <div>
                        <span>Total Income</span>

                        <strong
                            className={styles.income}
                        >
                            {incomeDisplay(
                                calculations.totalIncome
                            )}
                        </strong>
                    </div>


                    <div>
                        <span>Total Expenses</span>

                        <strong
                            className={styles.expense}
                        >
                            {expenseDisplay(
                                calculations.totalExpenses
                            )}
                        </strong>
                    </div>

                </div>

            </section>


            {/* ==================================================
                FOUR SUMMARY TABLES
            ================================================== */}

            <section className={styles.summaryGrid}>

                <SummaryCard
                    title="Client Gross Income"
                    value={
                        calculations.clientIncome
                    }
                    type="income"
                />

                <SummaryCard
                    title="Client Expenses"
                    value={
                        calculations.clientExpenses
                    }
                    type="expense"
                />

                <SummaryCard
                    title="External Gross Income"
                    value={
                        calculations.externalGrossIncome
                    }
                    type="income"
                />

                <SummaryCard
                    title="External Expenses"
                    value={
                        calculations.externalExpenses +
                        calculations.externalIncomeExpenses
                    }
                    type="expense"
                />

            </section>


            {/* ==================================================
                CLIENT TABLE
            ================================================== */}

            <section className={styles.section}>

                <SectionHeader
                    title="Clients"
                    button="Add Client"
                    onClick={openAddClient}
                />


                <div className={styles.tableWrapper}>

                    <table>

                        <thead>

                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>WhatsApp</th>
                                <th>Work Type</th>
                                <th>Start</th>
                                <th>Delivery</th>
                                <th>Project Price</th>
                                <th>Expenses</th>
                                <th>Net Profit</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {clients.length === 0 ? (

                                <EmptyRow
                                    colSpan={12}
                                    text="No clients yet."
                                />

                            ) : (

                                clients.map(client => (

                                    <tr key={client.id}>

                                        <td>
                                            <strong>
                                                {client.firstName}{" "}
                                                {client.lastName}
                                            </strong>
                                        </td>

                                        <td>
                                            {client.role}
                                        </td>

                                        <td>
                                            {client.email}
                                        </td>

                                        <td>
                                            {client.whatsapp || "—"}
                                        </td>

                                        <td>
                                            {client.type}
                                        </td>

                                        <td>
                                            {formatDate(
                                                client.start
                                            )}
                                        </td>

                                        <td>
                                            {formatDate(
                                                client.end
                                            )}
                                        </td>

                                        <td
                                            className={
                                                styles.income
                                            }
                                        >
                                            {incomeDisplay(
                                                client.amount
                                            )}
                                        </td>

                                        <td
                                            className={
                                                styles.expense
                                            }
                                        >
                                            {expenseDisplay(
                                                client.expenses
                                            )}
                                        </td>

                                        <td
                                            className={
                                                numberValue(
                                                    client.total
                                                ) >= 0
                                                    ? styles.income
                                                    : styles.expense
                                            }
                                        >
                                            {numberValue(
                                                client.total
                                            ) >= 0
                                                ? incomeDisplay(
                                                    client.total
                                                )
                                                : expenseDisplay(
                                                    Math.abs(
                                                        numberValue(
                                                            client.total
                                                        )
                                                    )
                                                )}
                                        </td>

                                        <td>

                                            <span className={`${styles.status} ${styles[client.status]}`} >
                                                {client.status}
                                            </span>

                                        </td>

                                        <td>

                                            <div
                                                className={
                                                    styles.actions
                                                }
                                            >

                                                <button
                                                    onClick={() =>
                                                        openEditClient(
                                                            client
                                                        )
                                                    }
                                                    className={
                                                        styles.editButton
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        deleteClient(
                                                            client.id
                                                        )
                                                    }
                                                    className={
                                                        styles.deleteButton
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* ==================================================
                EXTERNAL TABLES
            ================================================== */}

            <div className={styles.twoColumns}>

                {/* EXTERNAL INCOME */}

                <section className={styles.section}>

                    <SectionHeader
                        title="External Income"
                        button="Add Income"
                        onClick={openAddIncome}
                    />


                    <div className={styles.tableWrapper}>

                        <table>

                            <thead>

                                <tr>
                                    <th>Source</th>
                                    <th>Type</th>
                                    <th>Gross</th>
                                    <th>Expenses</th>
                                    <th>Net</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>


                            <tbody>

                                {externalIncome.length === 0 ? (

                                    <EmptyRow
                                        colSpan={7}
                                        text="No external income."
                                    />

                                ) : (

                                    externalIncome.map(item => (

                                        <tr key={item.id}>

                                            <td>
                                                {item.source}
                                            </td>

                                            <td>
                                                {item.type}
                                            </td>

                                            <td
                                                className={
                                                    styles.income
                                                }
                                            >
                                                {incomeDisplay(
                                                    item.amount
                                                )}
                                            </td>

                                            <td
                                                className={
                                                    styles.expense
                                                }
                                            >
                                                {expenseDisplay(
                                                    item.expenses
                                                )}
                                            </td>

                                            <td
                                                className={
                                                    numberValue(
                                                        item.total
                                                    ) >= 0
                                                        ? styles.income
                                                        : styles.expense
                                                }
                                            >
                                                {numberValue(
                                                    item.total
                                                ) >= 0
                                                    ? incomeDisplay(
                                                        item.total
                                                    )
                                                    : expenseDisplay(
                                                        Math.abs(
                                                            numberValue(
                                                                item.total
                                                            )
                                                        )
                                                    )}
                                            </td>

                                            <td>
                                                {formatDate(
                                                    item.date
                                                )}
                                            </td>

                                            <td>

                                                <div
                                                    className={
                                                        styles.actions
                                                    }
                                                >

                                                    <button
                                                        onClick={() =>
                                                            openEditIncome(
                                                                item
                                                            )
                                                        }
                                                        className={
                                                            styles.editButton
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteIncome(
                                                                item.id
                                                            )
                                                        }
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>


                {/* EXTERNAL EXPENSE */}

                <section className={styles.section}>

                    <SectionHeader
                        title="External Expenses"
                        button="Add Expense"
                        onClick={openAddExpense}
                    />


                    <div className={styles.tableWrapper}>

                        <table>

                            <thead>

                                <tr>
                                    <th>Beneficiary</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>


                            <tbody>

                                {externalExpense.length === 0 ? (

                                    <EmptyRow
                                        colSpan={5}
                                        text="No external expenses."
                                    />

                                ) : (

                                    externalExpense.map(item => (

                                        <tr key={item.id}>

                                            <td>
                                                {item.beneficiary}
                                            </td>

                                            <td>
                                                {item.type}
                                            </td>

                                            <td
                                                className={
                                                    styles.expense
                                                }
                                            >
                                                {expenseDisplay(
                                                    item.expenses
                                                )}
                                            </td>

                                            <td>
                                                {formatDate(
                                                    item.date
                                                )}
                                            </td>

                                            <td>

                                                <div
                                                    className={
                                                        styles.actions
                                                    }
                                                >

                                                    <button
                                                        onClick={() =>
                                                            openEditExpense(
                                                                item
                                                            )
                                                        }
                                                        className={
                                                            styles.editButton
                                                        }
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            deleteExpense(
                                                                item.id
                                                            )
                                                        }
                                                        className={
                                                            styles.deleteButton
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </section>

            </div>


            {/* ==================================================
                CHARTS
            ================================================== */}

            <section className={styles.chartsGrid}>

                {/* LINE */}

                <div className={styles.chartCard}>

                    <div className={styles.chartHeader}>
                        <h2>Income & Expenses</h2>
                        <span>Over Time</span>
                    </div>


                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <LineChart data={chartData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="income"
                                name="Income"
                                stroke="#22c55e"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="expenses"
                                name="Expenses"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>


                {/* BAR */}

                <div className={styles.chartCard}>

                    <div className={styles.chartHeader}>
                        <h2>Financial Overview</h2>
                        <span>Monthly</span>
                    </div>


                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <BarChart data={chartData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="label"
                            />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="#22c55e"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0
                                ]}
                            />

                            <Bar
                                dataKey="expenses"
                                name="Expenses"
                                fill="#ef4444"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </section>


            {/* ==================================================
                MODALS
            ================================================== */}

            {activeModal === "client" && (

                <Modal
                    title={
                        editingClient
                            ? "Edit Client"
                            : "Add Client"
                    }
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    <form
                        className={styles.form}
                        onSubmit={saveClient}
                    >

                        <div className={styles.formGrid}>

                            <Input
                                label="First Name"
                                value={
                                    clientForm.firstName
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        firstName:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Last Name"
                                value={
                                    clientForm.lastName
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        lastName:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Role"
                                value={
                                    clientForm.role
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        role:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={
                                    clientForm.email
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        email:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="WhatsApp"
                                value={
                                    clientForm.whatsapp
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        whatsapp:
                                            e.target.value,
                                    })
                                }
                            />

                            <Input
                                label="Work Type"
                                value={
                                    clientForm.type
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        type:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Project Start"
                                type="date"
                                value={
                                    clientForm.start
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        start:
                                            e.target.value,
                                    })
                                }
                            />

                            <Input
                                label="Delivery Date"
                                type="date"
                                value={
                                    clientForm.end
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        end:
                                            e.target.value,
                                    })
                                }
                            />

                            <Input
                                label="Project Price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    clientForm.amount
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        amount:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Expenses"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    clientForm.expenses
                                }
                                onChange={e =>
                                    setClientForm({
                                        ...clientForm,
                                        expenses:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <div
                                className={
                                    styles.inputGroup
                                }
                            >

                                <label>Status</label>

                                <select
                                    value={
                                        clientForm.status
                                    }
                                    onChange={e =>
                                        setClientForm({
                                            ...clientForm,
                                            status:
                                                e.target.value,
                                        })
                                    }
                                >

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div
                            className={
                                styles.formActions
                            }
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className={
                                    styles.cancelButton
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={
                                    styles.saveButton
                                }
                            >
                                {editingClient
                                    ? "Save Changes"
                                    : "Add Client"}
                            </button>

                        </div>

                    </form>

                </Modal>

            )}


            {activeModal === "income" && (

                <Modal
                    title={
                        editingIncome
                            ? "Edit External Income"
                            : "Add External Income"
                    }
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    <form
                        className={styles.form}
                        onSubmit={saveIncome}
                    >

                        <div className={styles.formGrid}>

                            <Input
                                label="Source"
                                value={
                                    incomeForm.source
                                }
                                onChange={e =>
                                    setIncomeForm({
                                        ...incomeForm,
                                        source:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Type"
                                value={
                                    incomeForm.type
                                }
                                onChange={e =>
                                    setIncomeForm({
                                        ...incomeForm,
                                        type:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Gross Amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    incomeForm.amount
                                }
                                onChange={e =>
                                    setIncomeForm({
                                        ...incomeForm,
                                        amount:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Expenses"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    incomeForm.expenses
                                }
                                onChange={e =>
                                    setIncomeForm({
                                        ...incomeForm,
                                        expenses:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Date"
                                type="date"
                                value={
                                    incomeForm.date
                                }
                                onChange={e =>
                                    setIncomeForm({
                                        ...incomeForm,
                                        date:
                                            e.target.value,
                                    })
                                }
                            />

                        </div>


                        <div
                            className={
                                styles.formActions
                            }
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className={
                                    styles.cancelButton
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={
                                    styles.saveButton
                                }
                            >
                                {editingIncome
                                    ? "Save Changes"
                                    : "Add Income"}
                            </button>

                        </div>

                    </form>

                </Modal>

            )}


            {activeModal === "expense" && (

                <Modal
                    title={
                        editingExpense
                            ? "Edit External Expense"
                            : "Add External Expense"
                    }
                    onClose={() =>
                        setActiveModal(null)
                    }
                >

                    <form
                        className={styles.form}
                        onSubmit={saveExpense}
                    >

                        <div className={styles.formGrid}>

                            <Input
                                label="Beneficiary"
                                value={
                                    expenseForm.beneficiary
                                }
                                onChange={e =>
                                    setExpenseForm({
                                        ...expenseForm,
                                        beneficiary:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Type"
                                value={
                                    expenseForm.type
                                }
                                onChange={e =>
                                    setExpenseForm({
                                        ...expenseForm,
                                        type:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    expenseForm.expenses
                                }
                                onChange={e =>
                                    setExpenseForm({
                                        ...expenseForm,
                                        expenses:
                                            e.target.value,
                                    })
                                }
                                required
                            />

                            <Input
                                label="Date"
                                type="date"
                                value={
                                    expenseForm.date
                                }
                                onChange={e =>
                                    setExpenseForm({
                                        ...expenseForm,
                                        date:
                                            e.target.value,
                                    })
                                }
                            />

                        </div>


                        <div
                            className={
                                styles.formActions
                            }
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    setActiveModal(null)
                                }
                                className={
                                    styles.cancelButton
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className={
                                    styles.saveButton
                                }
                            >
                                {editingExpense
                                    ? "Save Changes"
                                    : "Add Expense"}
                            </button>

                        </div>

                    </form>

                </Modal>

            )}

        </div>
    );
}


// ======================================================
// SMALL COMPONENTS
// ======================================================

function Currency({ name, value, positive }) {

    return (

        <div className={styles.currency}>

            <span>{name}</span>

            <strong
                className={
                    positive
                        ? styles.income
                        : styles.expense
                }
            >

                {value === null
                    ? "Loading..."
                    : `${positive ? "+ " : "- "}$ ${formatNumber(
                        Math.abs(value)
                    )}`}

            </strong>

        </div>

    );
}


function SummaryCard({
    title,
    value,
    type,
}) {

    return (

        <div className={styles.summaryCard}>

            <span>{title}</span>

            <strong
                className={
                    type === "income"
                        ? styles.income
                        : styles.expense
                }
            >

                {type === "income"
                    ? incomeDisplay(value)
                    : expenseDisplay(value)}

            </strong>

        </div>

    );
}


function SectionHeader({
    title,
    button,
    onClick,
}) {

    return (

        <div className={styles.sectionHeader}>

            <h2>{title}</h2>

            <button
                onClick={onClick}
                className={styles.addButton}
            >
                + {button}
            </button>

        </div>

    );
}


function EmptyRow({
    colSpan,
    text,
}) {

    return (

        <tr>

            <td
                colSpan={colSpan}
                className={styles.empty}
            >
                {text}
            </td>

        </tr>

    );
}


function Input({
    label,
    type = "text",
    value,
    onChange,
    required = false,
    min,
    step,
}) {

    return (

        <div className={styles.inputGroup}>

            <label>{label}</label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                step={step}
            />

        </div>

    );
}


function Modal({
    title,
    children,
    onClose,
}) {

    return (

        <div
            className={styles.modalOverlay}
            onMouseDown={onClose}
        >

            <div
                className={styles.modal}
                onMouseDown={e =>
                    e.stopPropagation()
                }
            >

                <div className={styles.modalHeader}>

                    <h2>{title}</h2>

                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                    >
                        ×
                    </button>

                </div>

                {children}

            </div>

        </div>

    );
}
