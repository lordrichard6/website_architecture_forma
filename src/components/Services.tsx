'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
    {
        num: '01',
        title: 'Master Planning',
        desc: 'Comprehensive urban design and master planning for sustainable communities.',
        href: '/services#master-planning',
        img: '/service-planning.webp',
    },
    {
        num: '02',
        title: 'Residential',
        desc: 'Bespoke homes and luxury residences crafted with precision.',
        href: '/services#residential',
        img: '/service-residential.webp',
    },
    {
        num: '03',
        title: 'Commercial',
        desc: 'Dynamic office spaces and commercial developments that inspire.',
        href: '/services#commercial',
        img: '/service-commercial.webp',
    },
    {
        num: '04',
        title: 'Interior Design',
        desc: 'Transformative interiors that blend form and function seamlessly.',
        href: '/services#interior-design',
        img: '/service-interior.webp',
    },
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();

    const fadeUp = (delay = 0) => ({
        initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0 }
            : { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    const springHover = reducedMotion
        ? {}
        : { whileHover: { y: -6 }, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } };

    return (
        <section id="services" className={`section-padding grain ${styles.services}`}>
            <div className="container" ref={ref}>
                <motion.div className={styles.header} {...fadeUp(0)}>
                    <span className={styles.label}>Our Expertise</span>
                    <h2>Services</h2>
                    <p className={styles.intro}>
                        From concept to completion, we deliver architectural excellence across every discipline.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        // Outer div: entrance animation
                        <motion.div key={index} {...fadeUp(0.15 + index * 0.1)}>
                            {/* Inner div: spring hover lift */}
                            <motion.div {...springHover} className={styles.cardHover}>
                                <Link href={service.href} className={styles.card}>
                                    <div className={styles.cardImgWrap}>
                                        <Image
                                            src={service.img}
                                            alt={service.title}
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className={styles.cardImg}
                                        />
                                        <span className={styles.cardNum}>{service.num}</span>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <h3>{service.title}</h3>
                                        <p>{service.desc}</p>
                                    </div>
                                    <div className={styles.topBar} />
                                </Link>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div className={styles.cta} {...fadeUp(0.6)}>
                    <Link href="/services" className={styles.ctaBtn}>Explore All Services</Link>
                </motion.div>
            </div>
        </section>
    );
}
