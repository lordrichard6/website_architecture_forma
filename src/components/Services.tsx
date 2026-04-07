'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Home, Building, Sparkles } from 'lucide-react';
import styles from './Services.module.css';

const services = [
    {
        icon: Building2,
        title: 'Master Planning',
        desc: 'Comprehensive urban design and master planning for sustainable communities.',
    },
    {
        icon: Home,
        title: 'Residential',
        desc: 'Bespoke homes and luxury residences crafted with precision.',
    },
    {
        icon: Building,
        title: 'Commercial',
        desc: 'Dynamic office spaces and commercial developments that inspire.',
    },
    {
        icon: Sparkles,
        title: 'Interior Design',
        desc: 'Transformative interiors that blend form and function seamlessly.',
    },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

    return (
        <section id="services" className={`section-padding ${styles.services}`}>
            <div className="container" ref={ref}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 32 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <span className={styles.label}>Our Expertise</span>
                    <h2>Services</h2>
                    <p className={styles.intro}>
                        From concept to completion, we deliver architectural excellence across every discipline.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.15 + index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div className={styles.iconWrapper}>
                                <service.icon className={styles.icon} size={32} strokeWidth={1.5} />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                            <div className={styles.hoverLine} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <a href="/services" className="btn btn-outline">Explore All Services</a>
                </motion.div>
            </div>
        </section>
    );
}
