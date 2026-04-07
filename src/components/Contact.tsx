'use client';
import { useState, useRef, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Contact.module.css';
import { MapPin, Mail, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

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

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className={`section-padding ${styles.contact}`}>
            <div className="container" ref={ref}>
                <div className={styles.wrapper}>
                    <motion.div
                        className={styles.left}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
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
                    </motion.div>

                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
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
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
