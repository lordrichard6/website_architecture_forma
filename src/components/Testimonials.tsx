'use client';
import { useState } from 'react';
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
    const [active, setActive] = useState(0);

    return (
        <section className={`section-padding ${styles.testimonials}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.label}>Testimonials</span>
                    <h2>Client Stories</h2>
                </div>

                <div className={styles.content}>
                    <div className={styles.quoteWrapper}>
                        <blockquote className={styles.quote}>
                            &ldquo;{testimonials[active].quote}&rdquo;
                        </blockquote>
                        <div className={styles.author}>
                            <strong>{testimonials[active].author}</strong>
                            <span>{testimonials[active].role}</span>
                            <span className={styles.project}>{testimonials[active].project}</span>
                        </div>
                    </div>

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
                </div>
            </div>
        </section>
    );
}
