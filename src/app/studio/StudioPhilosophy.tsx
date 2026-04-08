'use client';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Users, Layers, Leaf } from 'lucide-react';
import styles from './studio.module.css';

const principles = [
    { label: 'Human-centred',      Icon: Users  },
    { label: 'Timeless craft',     Icon: Layers },
    { label: 'Sustainable by design', Icon: Leaf },
];

export default function StudioPhilosophy() {
    const reducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    // Horizontal scroll parallax — tracks section through full viewport journey
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });
    const textX  = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [-20, 20]);
    const imageX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [20, -20]);

    // Shared tween config
    const tween = (delay = 0) => ({
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        delay,
    });

    // Text column — slides in from the left
    const slideLeft = (delay = 0) => ({
        initial: { opacity: 0, x: reducedMotion ? 0 : -40 },
        animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reducedMotion ? 0 : -40 },
        transition: reducedMotion ? { duration: 0.3 } : tween(delay),
    });

    // Image column — slides in from the right
    const slideRight = (delay = 0) => ({
        initial: { opacity: 0, x: reducedMotion ? 0 : 40 },
        animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reducedMotion ? 0 : 40 },
        transition: reducedMotion ? { duration: 0.3 } : tween(delay),
    });

    // Accent rule — simple fade
    const fadeIn = (delay = 0) => ({
        initial: { opacity: 0 },
        animate: inView ? { opacity: 1 } : { opacity: 0 },
        transition: reducedMotion ? { duration: 0.3 } : tween(delay),
    });

    // Per-tag stagger
    const tagVariant = (i: number) => ({
        initial: { opacity: 0, x: reducedMotion ? 0 : -24 },
        animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reducedMotion ? 0 : -24 },
        transition: reducedMotion ? { duration: 0.3 } : tween(0.45 + i * 0.1),
    });

    return (
        <section
            ref={sectionRef}
            id="philosophy"
            aria-labelledby="philosophy-heading"
            className={`section-padding ${styles.philosophy}`}
        >
            <div className={`container ${styles.philosophyGrid}`}>

                {/* ── Left: text column ─────────────────────────────
                     Outer: scroll parallax x (MotionValue)
                     Inner: entrance animations (one-time x slide)
                     Kept on separate elements — no x-axis conflict  ── */}
                <motion.div style={{ x: textX, willChange: 'transform' }}>
                    <div className={styles.philosophyText}>

                        <motion.span className={styles.philosophyLabel} {...slideLeft(0)}>
                            Our Philosophy
                        </motion.span>

                        <motion.h2 id="philosophy-heading" {...slideLeft(0.1)}>
                            Architecture is about people
                        </motion.h2>

                        {/* Sage accent rule beneath heading */}
                        <motion.span className={styles.philosophyRule} aria-hidden="true" {...fadeIn(0.2)} />

                        <motion.p {...slideLeft(0.25)}>
                            At FORMA, we believe architecture is more than buildings — it&apos;s about creating
                            experiences that enhance human life. Founded in 2005, our Zurich-based studio
                            has grown into a team of 50+ professionals united by a passion for design excellence.
                        </motion.p>

                        <motion.p {...slideLeft(0.35)}>
                            We approach each project as a unique opportunity to balance innovation with
                            timelessness, sustainability with beauty, and client vision with expert craft.
                        </motion.p>

                        {/* Principle tags — individually staggered */}
                        <ul className={styles.principleList} aria-label="Core principles">
                            {principles.map(({ label, Icon }, i) => (
                                <motion.li key={label} className={styles.principleTag} {...tagVariant(i)}>
                                    <Icon size={14} strokeWidth={1.5} className={styles.principleIcon} aria-hidden="true" />
                                    {label}
                                </motion.li>
                            ))}
                        </ul>

                    </div>
                </motion.div>

                {/* ── Right: image column ───────────────────────────
                     Outer: scroll parallax x (MotionValue)
                     Inner: entrance animation (one-time x slide)     ── */}
                <motion.div style={{ x: imageX, willChange: 'transform' }}>
                    <motion.div className={styles.philosophyImageWrap} {...slideRight(0.2)}>
                        <Image
                            src="/project1.webp"
                            alt="FORMA architects at work in the Zurich studio"
                            fill
                            sizes="(max-width: 900px) 100vw, 45vw"
                            className={styles.philosophyImage}
                        />
                        {/* Sage accent bar — top edge of image */}
                        <span className={styles.philosophyImageBar} aria-hidden="true" />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
