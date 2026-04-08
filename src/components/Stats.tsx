'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './Stats.module.css';

const stats = [
    { value: 120, suffix: '+', label: 'Projects Completed' },
    { value: 24, suffix: '', label: 'Design Awards' },
    { value: 50, suffix: '+', label: 'Team Members' },
    { value: 20, suffix: '', label: 'Years Experience' },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
    const [count, setCount] = useState(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (!active) return;

        // Respect reduced motion — snap to final value immediately
        if (reducedMotion) {
            setCount(target);
            return;
        }

        const duration = 1800;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [active, target, reducedMotion]);

    return <>{count}{suffix}</>;
}

export default function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });
    const reducedMotion = useReducedMotion();

    const fadeUp = (delay = 0) => ({
        initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0 }
            : { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    return (
        <section className={styles.stats} ref={ref} aria-label="Company statistics">
            <div className="container">
                <motion.div className={styles.header} {...fadeUp(0)}>
                    <span className={styles.eyebrow}>By the Numbers</span>
                    <p className={styles.tagline}>
                        Twenty years of bold ideas, timeless spaces, and award-winning design.
                    </p>
                </motion.div>
                <div className={styles.grid}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            {...fadeUp(0.1 + index * 0.1)}
                        >
                            <motion.div
                                className={styles.accentLine}
                                aria-hidden="true"
                                initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={reducedMotion ? { duration: 0 } : { delay: 0.2 + index * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                            />
                            <span className={styles.value}>
                                <CountUp target={stat.value} suffix={stat.suffix} active={isInView} />
                            </span>
                            <span className={styles.label}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
                <motion.div className={styles.ctaRow} {...fadeUp(0.6)}>
                    <a href="#projects" className={styles.ctaLink}>
                        See Our Work
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 2l5 5-5 5M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
