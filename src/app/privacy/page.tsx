import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './legal.module.css';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'How FORMA Architects collects, uses, and protects your personal data in accordance with the Swiss nDSG and EU GDPR.',
    openGraph: {
        title: 'Privacy Policy | FORMA Architects',
        description: 'How FORMA Architects collects, uses, and protects your personal data.',
    },
};

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main>

                {/* ── Dark hero ── */}
                <div className={`grain ${styles.hero}`}>
                    <div className={`container ${styles.heroContent}`}>
                        <span className={styles.heroEyebrow}>Legal</span>
                        <h1 className={styles.heroHeading}>Privacy Policy</h1>
                        <span className={styles.heroRule} aria-hidden="true" />
                        <p className={styles.heroMeta}>Last updated: January 2026</p>
                    </div>
                </div>

                {/* ── Content ── */}
                <div className={`section-padding ${styles.contentSection}`}>
                    <div className={`container ${styles.contentWrap}`}>

                        <Link href="/" className={styles.backLink}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Back to Home
                        </Link>

                        {/* ── Table of contents ── */}
                        <nav className={styles.toc} aria-label="Contents">
                            <p className={styles.tocTitle}>Contents</p>
                            <ol className={styles.tocList}>
                                <li><a href="#s01" className={styles.tocLink}>Data Controller</a></li>
                                <li><a href="#s02" className={styles.tocLink}>Data We Collect</a></li>
                                <li><a href="#s03" className={styles.tocLink}>Legal Basis for Processing</a></li>
                                <li><a href="#s04" className={styles.tocLink}>How We Use Your Data</a></li>
                                <li><a href="#s05" className={styles.tocLink}>Data Retention</a></li>
                                <li><a href="#s06" className={styles.tocLink}>Third-Party Processors</a></li>
                                <li><a href="#s07" className={styles.tocLink}>Cookies</a></li>
                                <li><a href="#s08" className={styles.tocLink}>International Data Transfers</a></li>
                                <li><a href="#s09" className={styles.tocLink}>Your Rights</a></li>
                                <li><a href="#s10" className={styles.tocLink}>Supervisory Authority</a></li>
                                <li><a href="#s11" className={styles.tocLink}>Changes to This Policy</a></li>
                            </ol>
                        </nav>

                        <section id="s01" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>01</span>
                                Data Controller
                            </h2>
                            <p>
                                FORMA Architects AG, Bahnhofstrasse 42, 8001 Zürich, Switzerland
                                (<strong>«FORMA»</strong>, <strong>«we»</strong>, <strong>«us»</strong>) is the data
                                controller responsible for the processing of personal data collected through this website,
                                in accordance with the Swiss Federal Act on Data Protection (nDSG, in force
                                1 September 2023) and, where applicable to persons in the EU, the EU General Data
                                Protection Regulation (GDPR).
                            </p>
                            <p>
                                Questions regarding data protection may be directed to:{' '}
                                <a href="mailto:privacy@forma-architects.ch" className={styles.inlineLink}>
                                    privacy@forma-architects.ch
                                </a>
                            </p>
                        </section>

                        <section id="s02" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>02</span>
                                Data We Collect
                            </h2>
                            <p>We collect personal data only to the extent necessary for the purposes described below. This includes:</p>
                            <ul>
                                <li><strong>Contact data</strong> — name, email address, phone number, and company or organisation name, provided when you submit an enquiry via our contact form.</li>
                                <li><strong>Project and engagement data</strong> — project type, location, budget range, timeline, and any site or programme details voluntarily shared during an enquiry or commission. This may include site addresses, planning documentation, and project correspondence.</li>
                                <li><strong>Technical data</strong> — IP address, browser type and version, operating system, referral URL, and pages visited, collected automatically when you browse this website.</li>
                                <li><strong>Cookie data</strong> — session identifiers and analytics preferences (see Section 7).</li>
                            </ul>
                        </section>

                        <section id="s03" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>03</span>
                                Legal Basis for Processing
                            </h2>
                            <p>We process your personal data on the following legal bases under Swiss and EU law:</p>
                            <ul>
                                <li>
                                    <strong>Performance of a pre-contractual or contractual relationship</strong> — responding to your project enquiry and assessing or fulfilling a potential engagement
                                    (nDSG Art. 6(2)(b); GDPR Art. 6(1)(b)).
                                </li>
                                <li>
                                    <strong>Legitimate interests</strong> — operating and improving our website, preventing fraud, and ensuring IT security, where our interests are not overridden by your rights
                                    (nDSG Art. 31; GDPR Art. 6(1)(f)).
                                </li>
                                <li>
                                    <strong>Consent</strong> — sending project updates or marketing communications where you have given explicit consent. You may withdraw consent at any time without affecting the lawfulness of prior processing
                                    (nDSG Art. 6(6); GDPR Art. 6(1)(a)).
                                </li>
                                <li>
                                    <strong>Legal obligation</strong> — retaining records as required by Swiss commercial, tax, and construction law
                                    (nDSG Art. 6(2)(a); GDPR Art. 6(1)(c)).
                                </li>
                            </ul>
                        </section>

                        <section id="s04" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>04</span>
                                How We Use Your Data
                            </h2>
                            <p>Your data is used exclusively for:</p>
                            <ul>
                                <li>Responding to project enquiries and evaluating potential commissions.</li>
                                <li>Communicating project updates and correspondence during an active engagement.</li>
                                <li>Sending newsletters or studio updates where you have provided consent.</li>
                                <li>Administering our client relationships and fulfilling contractual obligations.</li>
                                <li>Analysing website usage in aggregate to improve user experience.</li>
                                <li>Complying with Swiss legal and regulatory obligations, including tax and audit requirements.</li>
                            </ul>
                            <p>We do not sell, rent, or trade your personal data to third parties for their marketing purposes.</p>
                        </section>

                        <section id="s05" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>05</span>
                                Data Retention
                            </h2>
                            <p>
                                We retain personal data only for as long as necessary to fulfil the purposes for which
                                it was collected or as required by applicable law:
                            </p>
                            <ul>
                                <li>
                                    <strong>Enquiry data (no engagement)</strong> — retained for 2 years from the date of last contact, then securely deleted.
                                </li>
                                <li>
                                    <strong>Project and commission files</strong> — retained for a minimum of <strong>20 years</strong> from project completion. This reflects the extended liability period applicable to construction works under Swiss law (Art. 371 OR), during which defects in a building may give rise to claims.
                                </li>
                                <li>
                                    <strong>Accounting and business records</strong> — retained for 10 years in accordance with Swiss commercial law (Art. 958f OR).
                                </li>
                                <li>
                                    <strong>Technical and analytics data</strong> — retained in anonymised or aggregated form for up to 26 months.
                                </li>
                                <li>
                                    <strong>Marketing consent records</strong> — retained until consent is withdrawn, plus 3 years for compliance purposes.
                                </li>
                            </ul>
                        </section>

                        <section id="s06" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>06</span>
                                Third-Party Processors
                            </h2>
                            <p>
                                We engage trusted service providers who may process personal data on our behalf.
                                All processors are bound by data processing agreements and may only process data
                                on our documented instructions:
                            </p>
                            <ul>
                                <li><strong>Email delivery</strong> — our SMTP provider processes email content for the sole purpose of transmission.</li>
                                <li><strong>Web hosting</strong> — our hosting provider stores website files and server logs on infrastructure located in the EU/EEA or Switzerland.</li>
                                <li><strong>Analytics</strong> — where analytics are enabled, data is processed in anonymised form only; no individual user profiles are created.</li>
                            </ul>
                            <p>
                                We do not use social media tracking pixels, advertising networks, or cross-site
                                tracking technologies on this website.
                            </p>
                        </section>

                        <section id="s07" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>07</span>
                                Cookies
                            </h2>
                            <p>
                                This website uses only technically necessary cookies required for the website to
                                function correctly (e.g. session management). No third-party advertising or
                                tracking cookies are set without your explicit consent.
                            </p>
                            <p>
                                You may manage cookie preferences through your browser settings at any time.
                                Please note that disabling technically necessary cookies may affect website functionality.
                            </p>
                        </section>

                        <section id="s08" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>08</span>
                                International Data Transfers
                            </h2>
                            <p>
                                Your personal data is processed primarily within Switzerland and the EU/EEA,
                                both of which provide an adequate level of data protection recognised by the other.
                                Should data be transferred to a country outside these jurisdictions, we ensure
                                appropriate safeguards are in place — such as EU Standard Contractual Clauses (SCCs)
                                or the Swiss equivalent standard data protection clauses — in accordance with
                                nDSG Art. 16 and GDPR Art. 46.
                            </p>
                        </section>

                        <section id="s09" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>09</span>
                                Your Rights
                            </h2>
                            <p>
                                Under Swiss and EU data protection law, you have the following rights with
                                respect to your personal data:
                            </p>
                            <ul>
                                <li><strong>Right of access</strong> — to receive a copy of the personal data we hold about you.</li>
                                <li><strong>Right to rectification</strong> — to request correction of inaccurate or incomplete data.</li>
                                <li><strong>Right to erasure</strong> — to request deletion of your data where there is no compelling reason for continued processing.</li>
                                <li><strong>Right to restriction</strong> — to request that we limit processing of your data in certain circumstances.</li>
                                <li><strong>Right to data portability</strong> — to receive your data in a structured, machine-readable format where processing is automated.</li>
                                <li><strong>Right to object</strong> — to object to processing based on legitimate interests or for direct marketing purposes.</li>
                                <li><strong>Right to withdraw consent</strong> — to withdraw consent at any time where processing is based on consent, without affecting the lawfulness of prior processing.</li>
                            </ul>
                            <p>
                                To exercise any of these rights, please contact{' '}
                                <a href="mailto:privacy@forma-architects.ch" className={styles.inlineLink}>
                                    privacy@forma-architects.ch
                                </a>.
                                We will respond within <strong>30 days</strong>. In cases of complexity or high volume,
                                we may extend this period by a further 60 days, in which case we will notify you
                                of the extension and the reasons within the initial 30-day period.
                            </p>
                        </section>

                        <section id="s10" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>10</span>
                                Supervisory Authority
                            </h2>
                            <p>
                                If you believe your data protection rights have been violated, you have the right
                                to lodge a complaint with the relevant supervisory authority:
                            </p>
                            <ul>
                                <li>
                                    <strong>Switzerland</strong> — Federal Data Protection and Information Commissioner (FDPIC){' '}
                                    <a
                                        href="https://www.edoeb.admin.ch"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.inlineLink}
                                    >
                                        www.edoeb.admin.ch
                                    </a>
                                    {' '}·{' '}
                                    <a href="mailto:edoeb@edoeb.admin.ch" className={styles.inlineLink}>
                                        edoeb@edoeb.admin.ch
                                    </a>
                                </li>
                                <li>
                                    <strong>EU residents</strong> — the data protection authority of your country of residence. We would, however, welcome the opportunity to address your concerns directly before you contact a supervisory authority.
                                </li>
                            </ul>
                        </section>

                        <section id="s11" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>11</span>
                                Changes to This Policy
                            </h2>
                            <p>
                                We may update this Privacy Policy from time to time to reflect changes in our
                                practices or applicable law. The date at the top of this page indicates when the
                                policy was last revised. We encourage you to review it periodically.
                            </p>
                            <p>
                                For the Terms governing use of this website, please see our{' '}
                                <Link href="/terms" className={styles.inlineLink}>Website Terms of Use</Link>.
                            </p>
                        </section>

                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
