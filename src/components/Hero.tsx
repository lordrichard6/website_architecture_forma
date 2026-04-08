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
            {/* Video background */}
            <video
                className={styles.bgVideo}
                src="/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
            />

            {/* Slate-tinted overlay */}
            <div className={styles.overlay} />

            {/* Decorative logo mark — top right */}
            <motion.div
                className={styles.logoMarkWrap}
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ delay: 0.5, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden="true"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
                >
                    <Image
                        src="/forma_logo_white.svg"
                        alt=""
                        width={220}
                        height={220}
                        className={styles.logoMarkImg}
                    />
                </motion.div>
            </motion.div>

            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    {/* Eyebrow */}
                    <motion.span
                        className={styles.eyebrow}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Est. 2005 · Zurich, Switzerland
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 48 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        WE DESIGN<br />
                        THE FUTURE
                    </motion.h1>

                    <motion.p
                        className={styles.desc}
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Bold ideas. Timeless spaces. Award-winning architecture studio based in Zurich.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <a href="#projects" className={styles.heroBtn}>View Projects</a>
                    </motion.div>
                </div>

                <motion.div
                    id="hero-scroll"
                    className={styles.scroll}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                >
                    <span>Scroll</span>
                    <div className={styles.line} />
                </motion.div>
            </div>
        </section>
    );
}
