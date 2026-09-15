import { useEffect, useState } from "react";
import styles from "../dashboardStyles/message.module.css";
import API_URL from "/src/api.js";

export default function Messages() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_URL}/api/contact/contactmessages`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                return response.json();
            })
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });
    }, []);

    const filteredMessages = messages.filter((message) => {
        if (filter === "unread") return !message.is_read;
        if (filter === "read") return message.is_read;
        return true;
    });

    const unreadCount = messages.filter((message) => !message.is_read).length;

    const markAsRead = async (message) => {
        if (message.is_read) return;
        try {
            const response = await fetch(
                `${API_URL}/api/contact/contactmessages/${message.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        is_read: true,
                    }),
                },
            );
            if (!response.ok) {
                throw new Error("Faild to mark message as read");
            }
            setMessages((prevMessage) =>
                prevMessage.map((item) =>
                    item.id === message.id ? { ...item, is_read: true } : item,
                ),
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteMessage = async (id) => {
        const confirmed = window.confirm(
            "Are you want to delete this message?",
        );
        if (!confirmed) return;
        try {
            const response = await fetch(
                `${API_URL}/api/contact/contactmessages/${id}/`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                },
            );
            if (!response.ok) {
                throw new Error("Faild to delete message");
            }
            setMessages((prevMessages) =>
                prevMessages.filter((message) => message.id !== id),
            );
            setSelectedMessage(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.page}>
            {/* Header */}

            <div className={styles.header}>
                <div>
                    <h1>Messages</h1>
                    <p>
                        Manage messages received from your portfolio visitors.
                    </p>
                </div>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <span>Total</span>
                        <strong>{messages.length}</strong>
                    </div>

                    <div className={`${styles.statCard} ${styles.unread}`}>
                        <span>Unread</span>
                        <strong>{unreadCount}</strong>
                    </div>
                </div>
            </div>

            {/* Toolbar */}

            <div className={styles.toolbar}>
                <div className={styles.filters}>
                    <button
                        className={filter === "all" ? styles.active : ""}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>

                    <button
                        className={filter === "unread" ? styles.active : ""}
                        onClick={() => setFilter("unread")}
                    >
                        Unread
                    </button>

                    <button
                        className={filter === "read" ? styles.active : ""}
                        onClick={() => setFilter("read")}
                    >
                        Read
                    </button>
                </div>

                <span className={styles.resultCount}>
                    {filteredMessages.length} messages
                </span>
            </div>

            {/* Messages */}

            <div className={styles.messageList}>
                {filteredMessages.length === 0 ? (
                    <div className={styles.empty}>
                        <i className="fa-regular fa-envelope"></i>
                        <h3>No messages</h3>
                        <p>There are no messages in this category.</p>
                    </div>
                ) : (
                    filteredMessages.map((message) => (
                        <div
                            key={message.id}
                            className={`${styles.messageCard} ${
                                !message.is_read ? styles.unreadCard : ""
                            }`}
                            onClick={() => {
                                setSelectedMessage(message);
                                markAsRead(message);
                            }}
                        >
                            <div className={styles.avatar}>
                                {message.firstName?.charAt(0).toUpperCase()}
                            </div>

                            <div className={styles.messageContent}>
                                <div className={styles.messageTop}>
                                    <h3>
                                        {message.firstName} {message.lastName}
                                    </h3>

                                    <span className={styles.date}>
                                        {new Date(
                                            message.created_at,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className={styles.email}>{message.email}</p>

                                <h4>{message.subject}</h4>

                                <p className={styles.preview}>
                                    {message.message}
                                </p>
                            </div>

                            {!message.is_read && (
                                <span className={styles.unreadDot}></span>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Details Modal */}

            {selectedMessage && (
                <div
                    className={styles.overlay}
                    onClick={() => setSelectedMessage(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.close}
                            onClick={() => setSelectedMessage(null)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className={styles.modalHeader}>
                            <div className={styles.largeAvatar}>
                                {selectedMessage.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </div>

                            <div>
                                <h2>
                                    {selectedMessage.firstName}{" "}
                                    {selectedMessage.lastName}
                                </h2>

                                <p>{selectedMessage.email}</p>
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div>
                                <span>WhatsApp</span>
                                <p>{selectedMessage.whatsapp}</p>
                            </div>

                            <div>
                                <span>Subject</span>
                                <p>{selectedMessage.subject}</p>
                            </div>

                            <div>
                                <span>Received</span>
                                <p>
                                    {new Date(
                                        selectedMessage.created_at,
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div className={styles.fullMessage}>
                                <span>Message</span>
                                <p>{selectedMessage.message}</p>
                            </div>
                        </div>

                        <div className="styles.modalActions">
                            <button
                                className="styles.deleteButton"
                                onClick={() => {
                                    deleteMessage(selectedMessage.id);
                                }}
                            >
                                <i className="fa-solid fa-trash"></i>
                                Delete Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
