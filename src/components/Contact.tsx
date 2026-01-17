'use client';
import { useState, FormEvent } from 'react';
import styles from './Contact.module.css';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<FormStatus>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate form submission (replace with actual EmailJS or backend integration)
        try {
            // For demo purposes, just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In production, you would use EmailJS or a backend:
            // await emailjs.send('service_id', 'template_id', formData, 'public_key');

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className={`section-padding ${styles.contact}`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <span className={styles.label}>Get in Touch</span>
                        <h2>Let&apos;s Build<br />Something Great</h2>

                        <div className={styles.info}>
                            <div className={styles.item}>
                                <div className={styles.iconWrapper}>
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <strong>Studio</strong>
                                    <p>Bahnhofstrasse 42<br />8001 Zürich</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.iconWrapper}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <strong>Email</strong>
                                    <p>hello@forma-architects.ch</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.iconWrapper}>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <strong>Phone</strong>
                                    <p>+41 44 123 45 67</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {status === 'success' && (
                            <div className={styles.successMessage}>
                                <CheckCircle size={24} />
                                <span>Message sent successfully! We&apos;ll be in touch soon.</span>
                            </div>
                        )}
                        {status === 'error' && (
                            <div className={styles.errorMessage}>
                                <AlertCircle size={24} />
                                <span>Something went wrong. Please try again.</span>
                            </div>
                        )}

                        <div className={styles.row}>
                            <input
                                type="text"
                                placeholder="Name"
                                className={styles.input}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                disabled={status === 'loading'}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.input}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                disabled={status === 'loading'}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Subject"
                            className={styles.input}
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                            disabled={status === 'loading'}
                        />
                        <textarea
                            placeholder="Tell us about your project..."
                            rows={5}
                            className={styles.textarea}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            disabled={status === 'loading'}
                        />
                        <button
                            type="submit"
                            className={`${styles.submitBtn} ${status === 'loading' ? styles.loading : ''}`}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className={styles.spinner} />
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
