import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <Image
                src="/hero.png"
                alt="FORMA Architecture"
                fill
                className={styles.bgImage}
                priority
            />
            <div className={styles.overlay}></div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        WE DESIGN<br />
                        THE FUTURE
                    </h1>
                    <p className={styles.desc}>
                        Bold ideas. Timeless spaces. Award-winning architecture studio based in Zurich.
                    </p>
                    <div className={styles.actions}>
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                    </div>
                </div>

                <div className={styles.scroll}>
                    <span>Scroll</span>
                    <div className={styles.line}></div>
                </div>
            </div>
        </section>
    );
}
