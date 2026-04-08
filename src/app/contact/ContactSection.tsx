'use client';
import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, AlertCircle } from 'lucide-react';
import styles from './contact.module.css';

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

type FormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    projectType: string;
    location: string;
    budget: string;
    timeline: string;
    message: string;
};

// Partial record — only fields that have an error are populated
type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
    name: '', email: '', phone: '', company: '',
    projectType: '', location: '', budget: '', timeline: '', message: '',
};

// Maps each field key to its DOM input id — used to focus the first error (#1 + #2)
const FIELD_IDS: Record<keyof FormData, string> = {
    name: 'f-name', email: 'f-email', phone: 'f-phone', company: 'f-company',
    projectType: 'f-type', location: 'f-location',
    budget: 'f-budget', timeline: 'f-timeline', message: 'f-message',
};

// ── Client-side validation (#1 + #2) ─────────────────────
function validate(data: FormData): Errors {
    const errs: Errors = {};
    if (!data.name.trim())
        errs.name = 'Full name is required.';
    if (!data.email.trim())
        errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = 'Please enter a valid email address.';
    if (!data.projectType)
        errs.projectType = 'Please select a project type.';
    if (!data.location.trim())
        errs.location = 'Project location is required.';
    if (!data.message.trim())
        errs.message = 'Please describe your project.';
    return errs;
}

const PROJECT_TYPES = [
    { value: '',                               label: 'Select a service…'            },
    { value: 'Master Planning & Urban Design', label: 'Master Planning & Urban Design'},
    { value: 'Cultural & Civic Architecture',  label: 'Cultural & Civic Architecture' },
    { value: 'Residential Architecture',       label: 'Residential Architecture'      },
    { value: 'Commercial & Office Spaces',     label: 'Commercial & Office Spaces'    },
    { value: 'Sustainable Design',             label: 'Sustainable Design'            },
    { value: 'Heritage & Adaptive Reuse',      label: 'Heritage & Adaptive Reuse'     },
    { value: 'Interior Architecture',          label: 'Interior Architecture'         },
    { value: 'Other',                          label: 'Other / Not Sure'              },
];

const BUDGETS = [
    { value: '',             label: 'Select a range…'          },
    { value: 'Exploring',    label: 'Exploring (TBD)'          },
    { value: 'Under €500K',  label: 'Under €500,000'           },
    { value: '€500K – €2M',  label: '€500,000 – €2,000,000'   },
    { value: '€2M – €10M',   label: '€2,000,000 – €10,000,000'},
    { value: '€10M – €50M',  label: '€10,000,000 – €50,000,000'},
    { value: 'Over €50M',    label: 'Over €50,000,000'         },
    { value: 'Confidential', label: 'Prefer Not to Say'        },
];

const TIMELINES = [
    { value: '',           label: 'Select a timeline…'          },
    { value: 'Immediate',  label: 'Immediate (within 3 months)' },
    { value: 'Short-term', label: 'Short-term (3–12 months)'    },
    { value: 'Medium-term',label: 'Medium-term (1–2 years)'     },
    { value: 'Long-term',  label: 'Long-term (2+ years)'        },
    { value: 'Exploring',  label: 'Exploring Options'           },
];

// ── Info column ───────────────────────────────────────────
function InfoColumn({ isInView, reducedMotion }: { isInView: boolean; reducedMotion: boolean | null }) {
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.7, ease: EASE },
    });

    const slideIn = (delay = 0) => ({
        initial: { opacity: 0, x: reducedMotion ? 0 : -20 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.6, ease: EASE },
    });

    return (
        <div className={styles.infoCol}>
            {/* #6 — ghost number now has entrance animation */}
            <motion.span
                className={styles.ghostNum}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={reducedMotion ? { duration: 0.3 } : { delay: 0, duration: 1.1, ease: EASE }}
            >
                001
            </motion.span>

            <motion.span className={styles.eyebrow} {...fadeUp(0)}>
                Studio Information
            </motion.span>

            {/* #9 — removed hard <br />, natural wrap via max-width in CSS */}
            <motion.h2 className={styles.infoHeading} {...fadeUp(0.08)}>
                Let&apos;s Start Something Great
            </motion.h2>

            <motion.p className={styles.infoDesc} {...fadeUp(0.16)}>
                We welcome enquiries from private clients, developers, cultural institutions,
                and public bodies. Every project — regardless of scale — receives our full attention.
            </motion.p>

            <div className={styles.infoList}>
                {[
                    {
                        icon: <MapPin size={18} aria-hidden="true" />,
                        label: 'Studio',
                        lines: ['Bahnhofstrasse 42', '8001 Zürich, Switzerland'],
                        delay: 0.24,
                    },
                    {
                        icon: <Mail size={18} aria-hidden="true" />,
                        label: 'Email',
                        lines: ['hello@forma-architects.ch'],
                        href: 'mailto:hello@forma-architects.ch',
                        delay: 0.32,
                    },
                    {
                        icon: <Phone size={18} aria-hidden="true" />,
                        label: 'Phone',
                        lines: ['+41 44 123 45 67'],
                        href: 'tel:+41441234567',
                        delay: 0.40,
                    },
                    {
                        icon: <Clock size={18} aria-hidden="true" />,
                        label: 'Studio Hours',
                        lines: ['Monday – Friday, 09:00 – 18:00', 'Saturday by appointment'],
                        delay: 0.48,
                    },
                ].map(({ icon, label, lines, href, delay }) => (
                    <motion.div key={label} className={styles.infoItem} {...slideIn(delay)}>
                        <span className={styles.infoIcon}>{icon}</span>
                        <div>
                            <strong className={styles.infoLabel}>{label}</strong>
                            {lines.map((line, i) =>
                                href && i === 0 ? (
                                    <a key={i} href={href} className={styles.infoLink}>{line}</a>
                                ) : (
                                    <span key={i} className={styles.infoText}>{line}</span>
                                )
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.p className={styles.responseNote} {...fadeUp(0.56)}>
                We respond to all enquiries within 48 hours.
            </motion.p>
        </div>
    );
}

// ── Success card ──────────────────────────────────────────
function SuccessCard({ name, reducedMotion }: { name: string; reducedMotion: boolean | null }) {
    const firstName = name.split(' ')[0] || name;

    const fadeUp = (delay: number) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 18 },
        animate: { opacity: 1, y: 0 },
        transition: reducedMotion ? { duration: 0.3 } : { delay, duration: 0.65, ease: EASE },
    });

    return (
        <motion.div
            key="success"
            className={styles.successCard}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.3 } : { duration: 0.55, ease: EASE }}
        >
            {/* Animated check circle */}
            <motion.div
                className={styles.checkCircle}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={reducedMotion
                    ? { duration: 0.3 }
                    : { type: 'spring', stiffness: 240, damping: 18, delay: 0.15 }
                }
            >
                <svg
                    width="28" height="28" viewBox="0 0 28 28"
                    fill="none" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <motion.path
                        d="M7 14l5 5 9-9"
                        stroke="var(--accent)"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={reducedMotion
                            ? { duration: 0.3 }
                            : { delay: 0.5, duration: 0.45, ease: [0.65, 0, 0.35, 1] }
                        }
                    />
                </svg>
            </motion.div>

            <motion.h2 className={styles.successTitle} {...fadeUp(0.35)}>
                Thank you, <span className={styles.successName}>{firstName}</span>.
            </motion.h2>

            <motion.span
                className={styles.successRule}
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={reducedMotion ? { duration: 0.3 } : { delay: 0.5, duration: 0.5, ease: EASE }}
                style={{ transformOrigin: 'center' }}
            />

            <motion.p className={styles.successBody} {...fadeUp(0.55)}>
                Your enquiry has been received. A member of the FORMA team
                will be in touch within <strong>48 hours</strong>.
            </motion.p>

            <motion.p className={styles.successMeta} {...fadeUp(0.65)}>
                Zürich Studio — Monday to Friday, 09:00–18:00
            </motion.p>
        </motion.div>
    );
}

// ── Form column ───────────────────────────────────────────
function FormColumn({ isInView, reducedMotion }: { isInView: boolean; reducedMotion: boolean | null }) {
    const [formData, setFormData]       = useState<FormData>(EMPTY);
    const [errors, setErrors]           = useState<Errors>({});
    const [status, setStatus]           = useState<FormStatus>('idle');
    const [submittedName, setSubmittedName] = useState('');

    // Clear the field-level error as soon as the user starts correcting it (#2)
    const set = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // #1 — validate before hitting the network
        const errs = validate(formData);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            // Focus the first invalid field so keyboard / SR users land on it
            const firstKey = Object.keys(errs)[0] as keyof FormData;
            document.getElementById(FIELD_IDS[firstKey])?.focus();
            return;
        }

        setErrors({});
        setStatus('loading');
        const senderName = formData.name;

        // Simulate network delay, then always succeed
        await new Promise(res => setTimeout(res, 1200));
        setSubmittedName(senderName);
        setFormData(EMPTY);
        setStatus('success');
    };

    const disabled = status === 'loading';

    // #8 — card slides in from right; rows cascade up independently
    const cardAnim = {
        initial: { opacity: 0, x: reducedMotion ? 0 : 40 },
        animate: isInView ? { opacity: 1, x: 0 } : {},
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay: 0.15, duration: 0.75, ease: EASE },
    };

    const rowAnim = (delay: number) => ({
        initial: { opacity: 0, y: reducedMotion ? 0 : 16 },
        animate: isInView ? { opacity: 1, y: 0 } : {},
        transition: reducedMotion
            ? { duration: 0.3 }
            : { delay, duration: 0.55, ease: EASE },
    });

    // Shorthand for building aria + class props on an input/select/textarea
    const fieldProps = (key: keyof FormData) => ({
        'aria-invalid': (!!errors[key]) as boolean,
        'aria-describedby': errors[key] ? `${FIELD_IDS[key]}-error` : undefined,
        className: `${styles.input} ${errors[key] ? styles.inputError : ''}`,
    });

    const selectProps = (key: keyof FormData) => ({
        'aria-invalid': (!!errors[key]) as boolean,
        'aria-describedby': errors[key] ? `${FIELD_IDS[key]}-error` : undefined,
        className: `${styles.select} ${errors[key] ? styles.inputError : ''}`,
    });

    return (
        <motion.div className={styles.formCol} {...cardAnim}>
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <SuccessCard key="success" name={submittedName} reducedMotion={reducedMotion} />
                ) : (
            <form
                key="form"
                className={styles.form}
                onSubmit={handleSubmit}
                aria-label="Project enquiry form"
                noValidate
            >
                {status === 'error' && (
                    <motion.div
                        className={styles.errorMsg}
                        role="alert"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AlertCircle size={20} aria-hidden="true" />
                        <span>Something went wrong. Please try again or email us directly.</span>
                    </motion.div>
                )}

                {/* Row 1: Name + Email */}
                <motion.div className={styles.row} {...rowAnim(0.28)}>
                    <div className={styles.field}>
                        <label htmlFor="f-name" className={styles.fieldLabel}>
                            Full Name <span className={styles.required} aria-hidden="true">*</span>
                        </label>
                        <input
                            id="f-name" type="text" autoComplete="name"
                            value={formData.name} onChange={set('name')}
                            required disabled={disabled} placeholder="Jane Smith"
                            {...fieldProps('name')}
                        />
                        {errors.name && (
                            <span id="f-name-error" className={styles.fieldError} role="alert">
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="f-email" className={styles.fieldLabel}>
                            Email Address <span className={styles.required} aria-hidden="true">*</span>
                        </label>
                        <input
                            id="f-email" type="email" autoComplete="email"
                            value={formData.email} onChange={set('email')}
                            required disabled={disabled} placeholder="jane@example.com"
                            {...fieldProps('email')}
                        />
                        {errors.email && (
                            <span id="f-email-error" className={styles.fieldError} role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Row 2: Phone + Company */}
                <motion.div className={styles.row} {...rowAnim(0.36)}>
                    <div className={styles.field}>
                        <label htmlFor="f-phone" className={styles.fieldLabel}>
                            Phone <span className={styles.optional}>(optional)</span>
                        </label>
                        <input
                            id="f-phone" type="tel" autoComplete="tel"
                            className={styles.input}
                            value={formData.phone} onChange={set('phone')}
                            disabled={disabled} placeholder="+41 44 000 00 00"
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="f-company" className={styles.fieldLabel}>
                            Company / Organisation <span className={styles.optional}>(optional)</span>
                        </label>
                        <input
                            id="f-company" type="text" autoComplete="organization"
                            className={styles.input}
                            value={formData.company} onChange={set('company')}
                            disabled={disabled} placeholder="Developer, institution…"
                        />
                    </div>
                </motion.div>

                {/* Row 3: Project Type + Location */}
                <motion.div className={styles.row} {...rowAnim(0.44)}>
                    <div className={styles.field}>
                        <label htmlFor="f-type" className={styles.fieldLabel}>
                            Project Type <span className={styles.required} aria-hidden="true">*</span>
                        </label>
                        <select
                            id="f-type"
                            value={formData.projectType} onChange={set('projectType')}
                            required disabled={disabled}
                            {...selectProps('projectType')}
                        >
                            {PROJECT_TYPES.map(o => (
                                <option key={o.value} value={o.value} disabled={o.value === ''}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        {errors.projectType && (
                            <span id="f-type-error" className={styles.fieldError} role="alert">
                                {errors.projectType}
                            </span>
                        )}
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="f-location" className={styles.fieldLabel}>
                            Project Location <span className={styles.required} aria-hidden="true">*</span>
                        </label>
                        <input
                            id="f-location" type="text"
                            value={formData.location} onChange={set('location')}
                            required disabled={disabled} placeholder="City, Country"
                            {...fieldProps('location')}
                        />
                        {errors.location && (
                            <span id="f-location-error" className={styles.fieldError} role="alert">
                                {errors.location}
                            </span>
                        )}
                    </div>
                </motion.div>

                {/* Row 4: Budget + Timeline — both optional, placeholder NOT disabled (#3) */}
                <motion.div className={styles.row} {...rowAnim(0.50)}>
                    <div className={styles.field}>
                        <label htmlFor="f-budget" className={styles.fieldLabel}>
                            Estimated Budget
                        </label>
                        <select
                            id="f-budget" className={styles.select}
                            value={formData.budget} onChange={set('budget')}
                            disabled={disabled}
                        >
                            {/* #3 — no disabled on placeholder for optional selects */}
                            {BUDGETS.map(o => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="f-timeline" className={styles.fieldLabel}>
                            Project Timeline
                        </label>
                        <select
                            id="f-timeline" className={styles.select}
                            value={formData.timeline} onChange={set('timeline')}
                            disabled={disabled}
                        >
                            {/* #3 — no disabled on placeholder for optional selects */}
                            {TIMELINES.map(o => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Message */}
                <motion.div className={styles.field} {...rowAnim(0.55)}>
                    <label htmlFor="f-message" className={styles.fieldLabel}>
                        Project Brief <span className={styles.required} aria-hidden="true">*</span>
                    </label>
                    <textarea
                        id="f-message" rows={6}
                        value={formData.message} onChange={set('message')}
                        required disabled={disabled}
                        placeholder="Describe your project — site, programme, ambitions, and any specific challenges or constraints we should know about."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'f-message-error' : undefined}
                        className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    />
                    {errors.message && (
                        <span id="f-message-error" className={styles.fieldError} role="alert">
                            {errors.message}
                        </span>
                    )}
                </motion.div>

                {/* Submit */}
                <motion.div {...rowAnim(0.58)}>
                    <button
                        type="submit"
                        className={`${styles.submitBtn} ${disabled ? styles.submitLoading : ''}`}
                        disabled={disabled}
                    >
                        {disabled ? (
                            <>
                                {/* #4 — spinner uses aria-hidden + sr-only text */}
                                <span className={styles.spinner} aria-hidden="true" />
                                <span className={styles.srOnly}>Sending…</span>
                            </>
                        ) : (
                            <>
                                <Send size={16} aria-hidden="true" />
                                <span>Send Enquiry</span>
                            </>
                        )}
                    </button>
                </motion.div>

                <p className={styles.formNote}>
                    Required fields marked <span aria-hidden="true">*</span>. We never share your information.
                </p>
            </form>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ── Section wrapper ───────────────────────────────────────
export default function ContactSection() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
    const reducedMotion = useReducedMotion();

    return (
        <section ref={ref} id="contact" className={`section-padding ${styles.contactSection}`}>
            <div className={`container ${styles.contactGrid}`}>
                <InfoColumn isInView={isInView} reducedMotion={reducedMotion} />
                <FormColumn isInView={isInView} reducedMotion={reducedMotion} />
            </div>
        </section>
    );
}
