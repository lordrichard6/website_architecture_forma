import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.wrapper}>
                    <span className={styles.logo}>FORMA</span>
                    <span className={styles.copy}>© {new Date().getFullYear()} FORMA Architecture Studio</span>
                </div>
            </div>
        </footer>
    );
}
