'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './About.module.css';

const values = [
    {
        title: 'Sustainable Design',
        desc: 'LEED Platinum expertise across residential, commercial, and public commissions.',
    },
    {
        title: 'Award-Winning',
        desc: '24 international architecture and design awards recognised across Europe and beyond.',
    },
    {
        title: 'Swiss Precision',
        desc: 'Every detail — from master plan to door handle — is fully resolved before ground breaks.',
    },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();

    const slideIn = (direction: 'left' | 'right', delay = 0) => ({
        initial: reducedMotion
            ? { opacity: 0 }
            : { opacity: 0, x: direction === 'left' ? -40 : 40 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    return (
        <section id="about" className={`section-padding grain ${styles.about}`} aria-label="About the studio">
            <div className="container" ref={ref}>
                <div className={styles.wrapper}>

                    {/* ── Left: content ── */}
                    <motion.div className={styles.left} {...slideIn('left', 0)}>

                        {/* Only eyebrow + H2 are sticky — shallow enough to actually travel */}
                        <div className={styles.stickyHead}>
                            <span className={styles.eyebrow}>Our Story</span>
                            <h2>About<br />The Studio</h2>
                        </div>

                        <p className={styles.lead}>
                            FORMA is an award-winning architecture studio based in Zurich, Switzerland. We believe in the power of design to transform lives and communities.
                        </p>
                        <p className={styles.body}>
                            Founded in 2005, our multidisciplinary team brings together architects, urban planners, and designers who share a passion for creating meaningful spaces. From private residences to large-scale public buildings, we approach every project with the same dedication to craft, sustainability, and innovation.
                        </p>

                        <ul className={styles.values} aria-label="Our values">
                            {values.map((v, i) => (
                                <motion.li
                                    key={v.title}
                                    className={styles.valueItem}
                                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={reducedMotion
                                        ? { duration: 0.2 }
                                        : { delay: 0.4 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
                                    }
                                >
                                    <strong>{v.title}</strong>
                                    <span>{v.desc}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <Link href="/studio" className={styles.cta}>
                            Meet the Team
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M7 2l5 5-5 5M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                    </motion.div>

                    {/* ── Right: image ── */}
                    <motion.div className={styles.imageWrap} {...slideIn('right', 0.2)}>
                        <Image
                            src="/project2.webp"
                            alt="FORMA studio — interior detail"
                            fill
                            sizes="(max-width: 900px) 100vw, 42vw"
                            className={styles.image}
                        />
                        {/* Editorial caption overlay */}
                        <span className={styles.imageCaption} aria-hidden="true">
                            Zurich · Est. 2005
                        </span>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
