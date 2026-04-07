'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    useEffect(() => {
        const scrollEl = document.getElementById('hero-scroll');
        if (!scrollEl) return;
        const handler = () => {
            const target = document.getElementById('projects');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        };
        scrollEl.addEventListener('click', handler);
        return () => scrollEl.removeEventListener('click', handler);
    }, []);

    return (
        <section className={styles.hero}>
            <Image
                src="/hero.webp"
                alt="FORMA Architecture"
                fill
                className={styles.bgImage}
                priority
            />
            <div className={styles.overlay}></div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 48 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        WE DESIGN<br />
                        THE FUTURE
                    </motion.h1>
                    <motion.p
                        className={styles.desc}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Bold ideas. Timeless spaces. Award-winning architecture studio based in Zurich.
                    </motion.p>
                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <a href="#projects" className="btn btn-primary">View Projects</a>
                    </motion.div>
                </div>

                <motion.div
                    id="hero-scroll"
                    className={styles.scroll}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <span>Scroll</span>
                    <div className={styles.line}></div>
                </motion.div>
            </div>
        </section>
    );
}
