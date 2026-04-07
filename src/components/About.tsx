'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './About.module.css';

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

    return (
        <section id="about" className={`section-padding ${styles.about}`}>
            <div className="container" ref={ref}>
                <div className={styles.wrapper}>
                    <motion.div
                        className={styles.left}
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <h2>About<br />The Studio</h2>
                    </motion.div>

                    <motion.div
                        className={styles.right}
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <p className={styles.lead}>
                            FORMA is an award-winning architecture studio based in Zurich, Switzerland. We believe in the power of design to transform lives and communities.
                        </p>
                        <p className={styles.body}>
                            Founded in 2005, our multidisciplinary team brings together architects, urban planners, and designers who share a passion for creating meaningful spaces. From private residences to large-scale public buildings, we approach every project with the same dedication to craft, sustainability, and innovation.
                        </p>

                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.num}>120+</span>
                                <span className={styles.label}>Projects</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.num}>20</span>
                                <span className={styles.label}>Years</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.num}>24</span>
                                <span className={styles.label}>Awards</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
