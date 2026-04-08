'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Projects.module.css';

const projects = [
    { slug: 'alpine-residence', title: 'Alpine Residence', category: 'Residential', year: '2024', image: '/project1.webp' },
    { slug: 'cultural-center', title: 'Cultural Center', category: 'Public', year: '2023', image: '/project2.webp' },
    { slug: 'urban-office-tower', title: 'Urban Office Tower', category: 'Commercial', year: '2023', image: '/hero.webp' },
    { slug: 'lakeside-villa', title: 'Lakeside Villa', category: 'Residential', year: '2024', image: '/project1.webp' },
    { slug: 'tech-campus', title: 'Innovation Campus', category: 'Commercial', year: '2023', image: '/project2.webp' },
    { slug: 'museum-of-art', title: 'Museum of Modern Art', category: 'Public', year: '2022', image: '/hero.webp' },
];

const filters = ['All', 'Residential', 'Commercial', 'Public'] as const;
type Filter = typeof filters[number];

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();
    const [activeFilter, setActiveFilter] = useState<Filter>('All');

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const fadeUp = (delay = 0) => ({
        initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0 }
            : { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    });

    return (
        <section id="projects" className={`section-padding grain ${styles.projects}`}>
            <div className="container" ref={ref}>
                <motion.div className={styles.header} {...fadeUp(0)}>
                    <span className={styles.label}>Portfolio</span>
                    <h2>Selected Works</h2>
                    <p>A curated collection of our most impactful projects.</p>
                </motion.div>

                <motion.div
                    className={styles.filters}
                    {...fadeUp(0.15)}
                    role="group"
                    aria-label="Filter projects by category"
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterActive : ''}`}
                            onClick={() => setActiveFilter(filter)}
                            aria-pressed={activeFilter === filter}
                        >
                            {filter}
                        </button>
                    ))}
                </motion.div>

                {/* gridFeatured only when showing all — enables the featured first card */}
                <div className={`${styles.grid} ${activeFilter === 'All' ? styles.gridFeatured : ''}`}>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, index) => {
                            const isFeatured = activeFilter === 'All' && index === 0;

                            return (
                                <motion.div
                                    key={project.slug}
                                    layout
                                    className={isFeatured ? styles.featuredItem : ''}
                                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
                                    animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                                    transition={reducedMotion
                                        ? { duration: 0.2 }
                                        : { delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }
                                    }
                                >
                                    <Link href={`/projects/${project.slug}`} className={styles.card}>
                                        <div className={`${styles.imageWrapper} ${isFeatured ? styles.imageWrapperFeatured : ''}`}>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes={isFeatured
                                                    ? '(max-width: 900px) 100vw, 66vw'
                                                    : '(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw'
                                                }
                                                className={styles.image}
                                            />
                                            <div className={styles.overlay}>
                                                <span className={styles.category}>{project.category}</span>
                                            </div>
                                        </div>
                                        <div className={styles.info}>
                                            <h3>{project.title}</h3>
                                            <span className={styles.year}>{project.year}</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <motion.div className={styles.cta} {...fadeUp(0.6)}>
                    <Link href="/projects" className={styles.ctaBtn}>
                        <span>View All Projects</span>
                        <svg className={styles.ctaArrow} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M7 2l5 5-5 5M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
