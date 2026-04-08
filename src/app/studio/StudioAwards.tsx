'use client';
import { motion, useInView, useReducedMotion, useMotionValue, useTransform, animate as motionAnimate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import styles from './studio.module.css';

const awards = [
    { year: '2024', title: 'Swiss Design Award',              project: 'Alpine Residence',   category: 'Residential'    },
    { year: '2023', title: 'European Architecture Prize',     project: 'Cultural Center',    category: 'Cultural'       },
    { year: '2023', title: 'Best Commercial Building',        project: 'Urban Office Tower', category: 'Commercial'     },
    { year: '2022', title: 'Sustainability Excellence Award', project: 'Eco Campus',         category: 'Urban Planning' },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function StudioAwards() {
    const reducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    // #1 — two count-ups: awards (20) + years (19)
    const awardsCount = useMotionValue(0);
    const yearsCount  = useMotionValue(0);
    const roundedAwards = useTransform(awardsCount, (v) => Math.round(v).toString());
    const roundedYears  = useTransform(yearsCount,  (v) => Math.round(v).toString());

    useEffect(() => {
        if (!inView) return;
        if (reducedMotion) {
            awardsCount.set(20);
            yearsCount.set(19);
            return;
        }
        // #3 — delay aligned to fadeUp(0.2) so "0" is never visible while opaque
        const c1 = motionAnimate(awardsCount, 20, { duration: 1.5, ease: 'easeOut', delay: 0.2 });
        const c2 = motionAnimate(yearsCount,  19, { duration: 1.5, ease: 'easeOut', delay: 0.2 });
        return () => { c1.stop(); c2.stop(); };
    }, [inView, reducedMotion, awardsCount, yearsCount]);

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 24 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 24 },
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.7, ease: EASE },
    });

    const slideIn = (delay = 0) => ({
        initial: { opacity: 0, x: reducedMotion ? 0 : -32 },
        animate: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reducedMotion ? 0 : -32 },
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.6, ease: EASE },
    });

    return (
        <section
            ref={sectionRef}
            aria-labelledby="awards-heading"
            className={`section-padding ${styles.awardsSection}`}
        >
            <div className="container">
                <div className={styles.awardsInner}>

                    <motion.span className={styles.awardsEyebrow} {...fadeUp(0)}>
                        Industry Recognition · 2020–2024
                    </motion.span>

                    <motion.h2 id="awards-heading" className={styles.awardsHeading} {...fadeUp(0.1)}>
                        Recognition
                    </motion.h2>

                    {/* #1 — two-stat row; #3 — fade and count aligned at 0.2s */}
                    <motion.div className={styles.awardsStats} {...fadeUp(0.2)}>
                        <div className={styles.statRow}>

                            <div className={styles.statBlock}>
                                <span className={styles.statNumber}>
                                    <motion.span>{roundedAwards}</motion.span>+
                                </span>
                                <span className={styles.statLabel}>Industry Awards</span>
                            </div>

                            {/* vertical rule between stats */}
                            <span className={styles.statDivider} aria-hidden="true" />

                            <div className={styles.statBlock}>
                                <span className={styles.statNumber}>
                                    <motion.span>{roundedYears}</motion.span>
                                </span>
                                <span className={styles.statLabel}>Years · Est. 2005</span>
                            </div>

                        </div>
                    </motion.div>

                    <ul className={styles.awardsList}>
                        {awards.map((award, i) => (
                            <motion.li
                                key={`${award.year}-${award.title}`}
                                className={styles.awardItem}
                                {...slideIn(0.25 + i * 0.1)}
                            >
                                <motion.div
                                    className={styles.awardRow}
                                    whileHover={reducedMotion ? {} : { x: 6 }}
                                    transition={{ type: 'spring' as const, stiffness: 400, damping: 25 }}
                                >
                                    {/* #5 — year column with right-side divider */}
                                    <span className={styles.awardYear}>{award.year}</span>

                                    <div className={styles.awardInfo}>
                                        <strong className={styles.awardTitle}>{award.title}</strong>
                                        <div className={styles.awardMeta}>
                                            <span className={styles.awardProject}>{award.project}</span>
                                            <span className={styles.awardCategory}>{award.category}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.li>
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    );
}
