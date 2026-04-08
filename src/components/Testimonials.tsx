'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        quote: "FORMA transformed our vision into a masterpiece. Their attention to detail and innovative approach exceeded all expectations.",
        author: "Dr. Hans Müller",
        role: "CEO, Swiss Medical Group",
        project: "Alpine Medical Center",
    },
    {
        quote: "Working with FORMA was an extraordinary experience. They understood our brand identity and created spaces that truly inspire.",
        author: "Laura Schneider",
        role: "Founder, LS Ventures",
        project: "Corporate Headquarters",
    },
    {
        quote: "The team's expertise in sustainable design helped us achieve LEED Platinum certification while maintaining stunning aesthetics.",
        author: "Marco Bernasconi",
        role: "Director, Green Living Foundation",
        project: "Eco Residence Complex",
    },
];

const AUTOPLAY_DELAY = 5000;

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();
    const [active, setActive] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef<number | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const next = useCallback(() => setActive((prev) => (prev + 1) % testimonials.length), []);
    const prev = useCallback(() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

    // Autoplay — restarts on manual nav, pauses on hover/focus
    const startInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(next, AUTOPLAY_DELAY);
    }, [next]);

    useEffect(() => {
        if (isPaused || reducedMotion) return;
        startInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isPaused, reducedMotion, startInterval]);

    const handleManualNav = useCallback((fn: () => void) => {
        fn();
        if (!reducedMotion) startInterval(); // reset timer on manual nav
    }, [reducedMotion, startInterval]);

    // Keyboard — scoped away from inputs
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const tag = (document.activeElement?.tagName ?? '').toLowerCase();
            if (['input', 'textarea', 'select'].includes(tag)) return;
            if (e.key === 'ArrowRight') handleManualNav(next);
            if (e.key === 'ArrowLeft') handleManualNav(prev);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleManualNav, next, prev]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) handleManualNav(diff > 0 ? next : prev);
        touchStartX.current = null;
    };

    const fadeUp = (delay = 0) => ({
        initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0 }
            : { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    const slideProps = {
        initial:    reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 },
        animate:    reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
        exit:       reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 },
        transition: { duration: reducedMotion ? 0.15 : 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    };

    return (
        <section className={`section-padding ${styles.testimonials}`} aria-label="Client testimonials">
            <div className="container" ref={ref}>
                <motion.div className={styles.header} {...fadeUp(0)}>
                    <span className={styles.label}>Testimonials</span>
                    <h2>Client Stories</h2>
                </motion.div>

                <motion.div
                    className={styles.twoCol}
                    {...fadeUp(0.2)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* ── Left column: decorative mark + author ── */}
                    <div className={styles.leftCol}>
                        <div className={styles.quoteIcon} aria-hidden="true">&ldquo;</div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`author-${active}`}
                                className={styles.author}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                            >
                                <strong>{testimonials[active].author}</strong>
                                <span>{testimonials[active].role}</span>
                                <span className={styles.authorProject}>{testimonials[active].project}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Right column: quote + controls ── */}
                    <div className={styles.rightCol}>
                        <div
                            className={styles.quoteWrapper}
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={active}
                                    className={styles.quote}
                                    {...slideProps}
                                >
                                    {testimonials[active].quote}
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        <div className={styles.controls}>
                            <button
                                className={styles.arrow}
                                onClick={() => handleManualNav(prev)}
                                aria-label="Previous testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            <div className={styles.dots} role="group" aria-label="Testimonial navigation">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.dot} ${index === active ? styles.dotActive : ''}`}
                                        onClick={() => handleManualNav(() => setActive(index))}
                                        aria-label={`Go to testimonial ${index + 1}`}
                                        aria-current={index === active ? true : undefined}
                                    />
                                ))}
                            </div>

                            <button
                                className={styles.arrow}
                                onClick={() => handleManualNav(next)}
                                aria-label="Next testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                    <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* CTA — directly after social proof */}
                <motion.div className={styles.cta} {...fadeUp(0.4)}>
                    <a href="#contact" className={styles.ctaBtn}>
                        Start Your Project
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
