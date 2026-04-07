'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
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

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const [active, setActive] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const next = useCallback(() => setActive((prev) => (prev + 1) % testimonials.length), []);
    const prev = useCallback(() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length), []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [next, prev]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
        touchStartX.current = null;
    };

    return (
        <section className={`section-padding ${styles.testimonials}`}>
            <div className="container" ref={ref}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className={styles.label}>Testimonials</span>
                    <h2>Client Stories</h2>
                </motion.div>

                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className={styles.quoteIcon}>
                        <Quote size={48} strokeWidth={1} />
                    </div>

                    <div className={styles.quoteWrapper}>
                        <AnimatePresence mode="wait">
                            <motion.blockquote
                                key={active}
                                className={styles.quote}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                {testimonials[active].quote}
                            </motion.blockquote>
                        </AnimatePresence>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`author-${active}`}
                                className={styles.author}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <strong>{testimonials[active].author}</strong>
                                <span>{testimonials[active].role}</span>
                                <span className={styles.project}>{testimonials[active].project}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.arrow} onClick={prev} aria-label="Previous testimonial">
                            <ChevronLeft size={24} />
                        </button>
                        <div className={styles.dots}>
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles.dot} ${index === active ? styles.active : ''}`}
                                    onClick={() => setActive(index)}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button className={styles.arrow} onClick={next} aria-label="Next testimonial">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
