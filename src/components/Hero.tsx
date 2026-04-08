'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Transition, type TargetAndTransition } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    const reducedMotion = useReducedMotion();

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

    const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

    // When reduced motion is preferred, skip entrance animations
    const entranceProps = (delay = 0, y = 24): {
        initial: TargetAndTransition;
        animate: TargetAndTransition;
        transition?: Transition;
    } =>
        reducedMotion
            ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
            : {
                  initial: { opacity: 0, y },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay, duration: 0.7, ease },
              };

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

            {/* Film grain texture */}
            <div className={styles.grain} aria-hidden="true" />

            {/* Decorative logo mark — top right */}
            <motion.div
                className={styles.logoMarkWrap}
                initial={reducedMotion ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={reducedMotion ? { duration: 0 } : { delay: 0.5, duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden="true"
            >
                <motion.div
                    animate={reducedMotion ? {} : { y: [0, -10, 0] }}
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
                        {...entranceProps(0, 16)}
                    >
                        Est. 2005 · Zurich, Switzerland
                    </motion.span>

                    <motion.h1
                        className={styles.title}
                        {...entranceProps(0.15, 48)}
                    >
                        WE DESIGN<br />
                        THE FUTURE
                    </motion.h1>

                    <motion.p
                        className={styles.desc}
                        {...entranceProps(0.3, 32)}
                    >
                        Bold ideas. Timeless spaces. Award-winning architecture studio based in Zurich.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        {...entranceProps(0.5, 24)}
                    >
                        <a href="#projects" className={styles.heroBtn}>
                            <span>View Projects</span>
                            <svg className={styles.heroBtnArrow} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                        <Link href="/studio" className={styles.heroBtnSecondary}>
                            Our Studio
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    id="hero-scroll"
                    className={styles.scroll}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={reducedMotion ? { duration: 0 } : { delay: 1.1, duration: 0.6 }}
                >
                    <span>Scroll</span>
                    <div className={styles.line} />
                </motion.div>
            </div>
        </section>
    );
}
