import { useRef, useState } from "react";
import "../styles/main/contact.css";
import API_URL from "../api";

const MAX_WORDS = 250;

function countWords(text) {
    const trimmed = text.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

export default function Contact() {
    const contactFormRef = useRef(null);
    const emailRef = useRef(null);
    const whatsappRef = useRef(null);
    const messageRef = useRef(null);

    const [wordCount, setWordCount] = useState(0);
    const [formStatus, setFormStatus] = useState({ text: "", type: "" });

    function handleMessageChange() {
        setWordCount(countWords(messageRef.current.value));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setFormStatus({ text: "", type: "" });

        const form = contactFormRef.current;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const count = countWords(messageRef.current.value);

        if (count > MAX_WORDS) {
            setFormStatus({
                text: `Your message is ${count - MAX_WORDS} words over the ${MAX_WORDS}-word limit.`,
                type: "error",
            });
            return;
        }

        const formData = new FormData(form);

        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            whatsapp: formData.get("whatsapp"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch(
                `${API_URL}/api/contact/contactmessages/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                },
            );
            if (!response.ok) {
                throw new Error("Failed to send message");
            }
            setFormStatus({
                text: "Message sent successfully! I'll be in touch soon.",
                type: "success",
            });
            form.reset();
            setWordCount(0);
        } catch (error) {
            console.error(error);
            setFormStatus({
                text: "Something went wrong. Please try again.",
                type: "error",
            });
        }
    }

    return (
        <>
            <section id="contact">
                <h2 className="section-title gradient-text">Contact Me</h2>
                <div className="glow-card contact-container">
                    <form
                        className="contact-form"
                        id="contactForm"
                        noValidate
                        ref={contactFormRef}
                        onSubmit={handleSubmit}
                    >
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name *</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="given-name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name *</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="family-name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    ref={emailRef}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="whatsapp">WhatsApp Number *</label>
                            <input
                                type="tel"
                                id="whatsapp"
                                name="whatsapp"
                                autoComplete="tel"
                                placeholder="+1234567890"
                                pattern="^\+?[0-9\s\-]{7,15}$"
                                ref={whatsappRef}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject *</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                autoComplete="subject of message"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="label-row">
                                <label htmlFor="message">
                                    Message * (Max 250 words)
                                </label>
                                <span
                                    className={`word-count${wordCount > MAX_WORDS ? " over-limit" : ""}`}
                                    id="wordCount"
                                >
                                    {wordCount} / {MAX_WORDS}
                                </span>
                            </div>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                ref={messageRef}
                                onChange={handleMessageChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-gradient">
                            Send Message
                        </button>
                        <p
                            className={`form-status${formStatus.type ? " " + formStatus.type : ""}`}
                            id="formStatus"
                            role="status"
                            aria-live="polite"
                        >
                            {formStatus.text}
                        </p>
                    </form>

                    <div className="contact-info">
                        <div className="info-item">
                            <i className="fa-solid fa-envelope"></i>
                            <span>anishidracontact@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <i className="fa-brands fa-whatsapp"></i>
                            <span>+213 541 174 042</span>
                        </div>
                        <div className="info-item">
                            <i className="fa-brands fa-telegram"></i>
                            <span>@anishidra76</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
