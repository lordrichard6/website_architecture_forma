import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.content}>
                    <span className={styles.code}>404</span>
                    <h1>Page Not Found</h1>
                    <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                    <Link href="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
