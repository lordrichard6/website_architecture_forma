import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    FORMA
                </Link>

                <nav className={styles.nav}>
                    <Link href="/#projects" className={styles.link}>Projects</Link>
                    <Link href="/studio" className={styles.link}>Studio</Link>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/#contact" className={styles.link}>Contact</Link>
                </nav>

                <Link href="/#contact" className={styles.cta}>
                    Start a Project
                </Link>
            </div>
        </header>
    );
}
