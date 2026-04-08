import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={`grain ${styles.footer}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.grid}>

                    {/* ── Brand column ── */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logoLink} aria-label="FORMA — back to home">
                            {/* alt="" — link already has aria-label; avoid double screen reader announcement */}
                            <Image
                                src="/forma_logo_white_full.svg"
                                alt=""
                                width={140}
                                height={32}
                                className={styles.logoImg}
                            />
                        </Link>
                        <p className={styles.tagline}>Bold ideas. Timeless spaces.</p>
                        <address className={styles.address}>
                            Bahnhofstrasse 42<br />
                            8001 Zürich, Switzerland
                        </address>
                        <a href="mailto:hello@forma-architects.ch" className={styles.email}>
                            hello@forma-architects.ch
                        </a>
                    </div>

                    {/* ── Navigation column ── */}
                    <nav className={styles.links} aria-label="Footer navigation">
                        <p className={styles.colHead} role="presentation">Navigation</p>
                        <Link href="/#projects">Projects</Link>
                        <Link href="/studio">Studio</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>

                    {/* ── Legal column ── */}
                    <nav className={styles.links} aria-label="Legal">
                        <p className={styles.colHead} role="presentation">Legal</p>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </nav>

                    {/* ── Connect column ── */}
                    <nav className={styles.links} aria-label="Social media links">
                        <p className={styles.colHead} role="presentation">Connect</p>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn — opens in new tab"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram — opens in new tab"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://pinterest.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Pinterest — opens in new tab"
                        >
                            Pinterest
                        </a>
                    </nav>

                </div>

                {/* ── Bottom bar ── */}
                <div className={styles.bottom}>
                    <span className={styles.copy}>
                        © {new Date().getFullYear()} FORMA Architecture Studio. All rights reserved.
                    </span>
                    <span className={styles.madeBy}>
                        Designed &amp; built by{' '}
                        <a
                            href="https://lopes2tech.ch"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.madeByLink}
                        >
                            Lopes2Tech
                        </a>
                    </span>
                    <a href="#top" className={styles.backToTop} aria-label="Back to top">
                        Back to top
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
}
