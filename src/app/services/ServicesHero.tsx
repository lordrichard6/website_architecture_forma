'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import styles from './services.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function ServicesHero() {
    const reducedMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    // Scroll progress: 0 = hero top at viewport top, 1 = hero bottom at viewport top
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // ── Three parallax layers ────────────────────────────────
    const watermarkY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -200]);
    const headingY   = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -90]);
    const contentY   = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -35]);

    // Mount fade-in — opacity only; outer divs own the y axis for parallax
    const fadeIn = (delay = 0) => ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.8, ease: EASE },
    });

    return (
        <section
            ref={heroRef}
            aria-labelledby="services-heading"
            className={`grain ${styles.hero}`}
        >

            {/* ── Layer 1: Watermark — fastest ── */}
            <motion.div
                className={styles.heroGhost}
                style={{ y: watermarkY }}
                aria-hidden="true"
            >
                Services
            </motion.div>

            <div className={`container ${styles.heroContent}`}>

                {/* ── Layer 3: Eyebrow — slowest ── */}
                <motion.div style={{ y: contentY }}>
                    <motion.span className={styles.label} {...fadeIn(0)}>
                        What We Do
                    </motion.span>
                </motion.div>

                {/* ── Layer 2: H1 word-split + accent rule — medium ── */}
                <motion.div style={{ y: headingY }}>
                    {/* #3 — word-split stagger; #7 — aria id */}
                    <h1 id="services-heading" className={styles.heroHeading}>
                        {['Our', 'Services'].map((word, i) => (
                            <motion.span
                                key={word}
                                className={styles.heroWord}
                                initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={reducedMotion
                                    ? { duration: 0.3 }
                                    : { delay: 0.15 + i * 0.12, duration: 0.8, ease: EASE }
                                }
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    {/* #8 — sage accent rule beneath heading */}
                    <motion.span
                        className={styles.heroRule}
                        aria-hidden="true"
                        {...fadeIn(0.32)}
                    />
                </motion.div>

                {/* ── Layer 3: Sub-copy + CTA — slowest ── */}
                <motion.div style={{ y: contentY }}>
                    <motion.p className={styles.heroSub} {...fadeIn(0.4)}>
                        Comprehensive architectural solutions from concept to completion.
                    </motion.p>

                    {/* #1 — CTA anchors to services list section */}
                    <motion.a href="#services-list" className={styles.heroCta} {...fadeIn(0.5)}>
                        Explore Services
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.a>
                </motion.div>

            </div>

            {/* #2 — Scroll indicator */}
            <div className={styles.scrollIndicator} aria-hidden="true">
                <span className={styles.scrollLine} />
                <span className={styles.scrollLabel}>Scroll</span>
            </div>

        </section>
    );
}
