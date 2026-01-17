import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './legal.module.css';

export const metadata = {
    title: 'Privacy Policy | FORMA Architects',
    description: 'Privacy policy for FORMA Architects website.',
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>

                    <h1>Privacy Policy</h1>
                    <p className={styles.date}>Last updated: January 2026</p>

                    <section className={styles.section}>
                        <h2>1. Data Controller</h2>
                        <p>
                            FORMA Architects AG is responsible for the processing of personal data
                            collected through this website, in accordance with Swiss data protection
                            law and the GDPR.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>2. Data We Collect</h2>
                        <p>We collect the following personal data:</p>
                        <ul>
                            <li>Name and contact details (when you contact us)</li>
                            <li>Email address (for inquiry responses)</li>
                            <li>Technical data (IP address, browser type, for analytics)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>3. How We Use Your Data</h2>
                        <p>Your data is used exclusively for:</p>
                        <ul>
                            <li>Responding to project inquiries</li>
                            <li>Sending project updates (with consent)</li>
                            <li>Improving our website experience</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul>
                            <li>Access your personal data</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to data processing</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Contact</h2>
                        <p>
                            For privacy inquiries, contact us at privacy@forma-architects.ch
                            or visit our office at Bahnhofstrasse 42, Zurich.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
