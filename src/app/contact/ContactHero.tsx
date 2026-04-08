'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import styles from './contact.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function ContactHero() {
    const reducedMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const watermarkY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -200]);
    const headingY   = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -90]);
    const contentY   = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -35]);

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
            aria-labelledby="contact-heading"
            className={`grain ${styles.hero}`}
        >
            {/* Layer 1: Watermark — fastest */}
            <motion.div
                className={styles.heroGhost}
                style={{ y: watermarkY }}
                aria-hidden="true"
            >
                Contact
            </motion.div>

            <div className={`container ${styles.heroContent}`}>

                {/* Layer 3: Eyebrow — slowest */}
                <motion.div style={{ y: contentY }}>
                    <motion.span className={styles.label} {...fadeIn(0)}>
                        New Enquiries
                    </motion.span>
                </motion.div>

                {/* Layer 2: H1 word-split — medium */}
                <motion.div style={{ y: headingY }}>
                    <h1 id="contact-heading" className={styles.heroHeading}>
                        {['Begin', 'Your', 'Project'].map((word, i) => (
                            <motion.span
                                key={word}
                                className={styles.heroWord}
                                initial={{ opacity: 0, y: reducedMotion ? 0 : 32 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={reducedMotion
                                    ? { duration: 0.3 }
                                    : { delay: 0.15 + i * 0.1, duration: 0.8, ease: EASE }
                                }
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h1>
                    <motion.span className={styles.heroRule} aria-hidden="true" {...fadeIn(0.38)} />
                </motion.div>

                {/* Layer 3: Sub-copy — slowest */}
                <motion.div style={{ y: contentY }}>
                    <motion.p className={styles.heroSub} {...fadeIn(0.45)}>
                        Every great building begins with a conversation.
                        Share your vision and we will respond within 48 hours.
                    </motion.p>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <div className={styles.scrollIndicator} aria-hidden="true">
                <span className={styles.scrollLine} />
                <span className={styles.scrollLabel}>Scroll</span>
            </div>

        </section>
    );
}
