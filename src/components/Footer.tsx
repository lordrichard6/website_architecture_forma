import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <span className={styles.logo}>FORMA</span>
                        <p className={styles.tagline}>Bold ideas. Timeless spaces.</p>
                    </div>

                    <div className={styles.links}>
                        <h4>Navigation</h4>
                        <Link href="/#projects">Projects</Link>
                        <Link href="/studio">Studio</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/#contact">Contact</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>Legal</h4>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>

                    <div className={styles.links}>
                        <h4>Connect</h4>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span className={styles.copy}>© {new Date().getFullYear()} FORMA Architecture Studio. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
