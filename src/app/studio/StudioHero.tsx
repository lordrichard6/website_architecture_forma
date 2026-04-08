'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import styles from './studio.module.css';

export default function StudioHero() {
    const reducedMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    // Scroll progress: 0 = hero top at viewport top, 1 = hero bottom at viewport top
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // ── Three parallax layers ────────────────────────────────
    // Watermark moves fastest — strongest depth illusion
    const watermarkY = useTransform(
        scrollYProgress, [0, 1],
        [0, reducedMotion ? 0 : -220]
    );
    // H1 moves at medium speed — title "floats" between layers
    const headingY = useTransform(
        scrollYProgress, [0, 1],
        [0, reducedMotion ? 0 : -100]
    );
    // Eyebrow + body + CTA move slowest — feels closest to viewer
    const contentY = useTransform(
        scrollYProgress, [0, 1],
        [0, reducedMotion ? 0 : -40]
    );

    // Mount fade-in — opacity only (outer divs own the y axis for parallax)
    const fadeIn = (delay = 0) => ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    return (
        <section ref={heroRef} className={`grain ${styles.hero}`}>

            {/* ── Video background ── */}
            <video
                className={styles.heroVideo}
                src="/hero-studio.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
            />
            {/* ── Dark overlay — brand slate, not pure black ── */}
            <div className={styles.heroOverlay} aria-hidden="true" />

            {/* ── Layer 1: Watermark — fastest ── */}
            <motion.div
                className={styles.heroGhost}
                style={{ y: watermarkY }}
                aria-hidden="true"
            >
                Studio
            </motion.div>

            <div className={`container ${styles.heroContent}`}>

                {/* ── Layer 3: Eyebrow — slowest ── */}
                <motion.div style={{ y: contentY }}>
                    <motion.span className={styles.label} {...fadeIn(0)}>
                        Who We Are
                    </motion.span>
                </motion.div>

                {/* ── Layer 2: H1 — medium ── */}
                <motion.div style={{ y: headingY }}>
                    <motion.h1 {...fadeIn(0.15)}>Our Studio</motion.h1>
                </motion.div>

                {/* ── Layer 3: Sub-copy + CTA — slowest ── */}
                <motion.div style={{ y: contentY }}>
                    <motion.p className={styles.heroSub} {...fadeIn(0.3)}>
                        Founded in Zurich in 2005, we are a collective of architects,
                        urban planners, and designers united by a belief that
                        great spaces have the power to transform lives.
                    </motion.p>

                    <motion.a href="#team" className={styles.heroCta} {...fadeIn(0.45)}>
                        Meet the Team
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 2v10M2 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.a>
                </motion.div>

            </div>

            {/* Scroll indicator — decorative */}
            <div className={styles.scrollIndicator} aria-hidden="true">
                <span className={styles.scrollLine} />
                <span className={styles.scrollLabel}>Scroll</span>
            </div>

        </section>
    );
}
