import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from './legal.module.css';

export const metadata = {
    title: 'Terms of Service | FORMA Architects',
    description: 'Terms of service for FORMA Architects website.',
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className="container">
                    <Link href="/" className={styles.backLink}>← Back to Home</Link>

                    <h1>Terms of Service</h1>
                    <p className={styles.date}>Last updated: January 2026</p>

                    <section className={styles.section}>
                        <h2>1. General Information</h2>
                        <p>
                            This website is owned and operated by FORMA Architects AG,
                            Bahnhofstrasse 42, 8001 Zurich, Switzerland.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>2. Acceptance of Terms</h2>
                        <p>
                            By accessing and using this website, you agree to be bound by
                            these Terms of Service and all applicable laws and regulations.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>3. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, images, designs, and
                            project renderings, is the exclusive property of FORMA Architects
                            and is protected by copyright law.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Limitation of Liability</h2>
                        <p>
                            FORMA Architects shall not be liable for any direct or indirect
                            damages resulting from the use or inability to use this website.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Governing Law</h2>
                        <p>
                            These terms are governed by Swiss law. Any disputes shall be
                            subject to the exclusive jurisdiction of the courts of Zurich.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Contact</h2>
                        <p>
                            For questions about these terms, contact us at legal@forma-architects.ch
                            or visit our office at Bahnhofstrasse 42, Zurich.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
