'use client';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import styles from './studio.module.css';

const team = [
    { name: 'Paulo Lopes',      role: 'Founding Partner',        origin: 'Portugal',    image: '/team/paulo-lopes.webp'     },
    { name: 'Astrid Berg',      role: 'Design Director',          origin: 'Norway',      image: '/team/astrid-berg.webp'     },
    { name: 'Christoph Keller', role: 'Technical Director',       origin: 'Switzerland', image: '/team/christoph-keller.webp'},
    { name: 'Emeka Okonkwo',    role: 'Senior Architect',         origin: 'Nigeria',     image: '/team/emeka-okonkwo.webp'   },
    { name: 'Lena Braun',       role: 'Project Lead',             origin: 'Germany',     image: '/team/lena-braun.webp'      },
    { name: 'Hannah Richter',   role: 'Sustainability Director',   origin: 'Germany',     image: '/team/hannah-richter.webp'  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export default function StudioTeam() {
    const reducedMotion = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: '-80px' });

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 28 },
        animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reducedMotion ? 0 : 28 },
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.7, ease: EASE },
    });

    return (
        <section
            ref={sectionRef}
            id="team"
            aria-labelledby="team-heading"
            className={`section-padding grain ${styles.teamSection}`}
        >
            <div className="container">

                {/* ── Section header — #6 left-aligned ── */}
                <div className={styles.teamHeader}>
                    <motion.span className={styles.teamEyebrow} {...fadeUp(0)}>
                        50+ Professionals · 12 Countries
                    </motion.span>
                    <motion.h2 id="team-heading" className={styles.teamHeading} {...fadeUp(0.1)}>
                        The Team
                    </motion.h2>
                </div>

                {/* ── Card grid ── */}
                <div className={styles.teamGrid}>
                    {team.map((member, i) => (
                        /*  Card wrapper: hover lift only (spring)
                            Image:        clip-path wipe entrance  ← #5
                            Info:         fadeUp entrance
                            Separate elements = no animation conflict            */
                        <motion.div
                            key={member.name}
                            className={styles.teamCard}
                            whileHover={reducedMotion ? {} : { y: -6 }}
                            transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                        >
                            {/* #5 — clip-path wipe: image reveals bottom → top */}
                            <motion.div
                                className={styles.teamImage}
                                initial={{ clipPath: reducedMotion ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)' }}
                                animate={inView
                                    ? { clipPath: 'inset(0% 0 0% 0)' }
                                    : { clipPath: reducedMotion ? 'inset(0% 0 0% 0)' : 'inset(100% 0 0% 0)' }
                                }
                                transition={reducedMotion
                                    ? { duration: 0.3 }
                                    : { delay: 0.1 + i * 0.08, duration: 0.8, ease: EASE }
                                }
                            >
                                <Image
                                    src={member.image}
                                    alt={`${member.name}, ${member.role}`}
                                    fill
                                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                                />
                            </motion.div>

                            {/* Info fades up slightly after image wipe */}
                            <motion.div
                                className={styles.teamInfo}
                                initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={reducedMotion
                                    ? { duration: 0.3 }
                                    : { delay: 0.25 + i * 0.08, duration: 0.6, ease: EASE }
                                }
                            >
                                <h3>{member.name}</h3>
                                <span className={styles.teamRole}>{member.role}</span>
                                <span className={styles.teamOrigin}>{member.origin}</span>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
