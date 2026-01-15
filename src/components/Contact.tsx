import styles from './Contact.module.css';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className={`section-padding ${styles.contact}`}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.left}>
                        <h2>Let's Build<br />Something Great</h2>

                        <div className={styles.info}>
                            <div className={styles.item}>
                                <MapPin size={20} />
                                <div>
                                    <strong>Studio</strong>
                                    <p>Industriestrasse 25<br />8005 Zürich</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <Mail size={20} />
                                <div>
                                    <strong>Email</strong>
                                    <p>hello@forma-arch.ch</p>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <Phone size={20} />
                                <div>
                                    <strong>Phone</strong>
                                    <p>+41 44 000 00 00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className={styles.form}>
                        <div className={styles.row}>
                            <input type="text" placeholder="Name" className={styles.input} />
                            <input type="email" placeholder="Email" className={styles.input} />
                        </div>
                        <input type="text" placeholder="Subject" className={styles.input} />
                        <textarea placeholder="Tell us about your project..." rows={5} className={styles.textarea}></textarea>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
