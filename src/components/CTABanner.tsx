'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './CTABanner.module.css';

export default function CTABanner() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();

    const fadeUp = (delay = 0) => ({
        initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    return (
        <section className={`section-padding ${styles.cta}`} aria-label="Start a project">
            {/* Ghosted watermark behind content */}
            <span className={styles.watermark} aria-hidden="true">FORMA</span>

            <div className="container" ref={ref}>
                <div className={styles.inner}>
                    <motion.span className={styles.eyebrow} {...fadeUp(0)}>
                        Work With Us
                    </motion.span>

                    <motion.h2 className={styles.heading} {...fadeUp(0.1)}>
                        Let&apos;s Build Something Extraordinary Together
                    </motion.h2>

                    <motion.p className={styles.sub} {...fadeUp(0.2)}>
                        Whether it&apos;s a private residence, a cultural institution, or a city block —
                        every great project begins with a conversation.
                    </motion.p>

                    <motion.div className={styles.actions} {...fadeUp(0.3)}>
                        {/* whileTap needs motion wrapper — Link alone doesn't support it */}
                        <motion.div
                            whileTap={reducedMotion ? {} : { scale: 0.97 }}
                            transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
                        >
                            <Link href="/contact" className={styles.primaryBtn}>
                                Start a Conversation
                            </Link>
                        </motion.div>

                        <span className={styles.divider} aria-hidden="true">·</span>

                        <a href="mailto:hello@forma-architects.ch" className={styles.secondaryBtn}>
                            hello@forma-architects.ch
                        </a>
                    </motion.div>

                    {/* Social proof micro-line */}
                    <motion.p className={styles.proof} {...fadeUp(0.4)}>
                        120+ projects delivered across Europe since 2005
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
