import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './legal.module.css';

export const metadata: Metadata = {
    title: 'Website Terms of Use',
    description: 'Terms governing use of the FORMA Architects website. Professional engagement is governed separately under SIA 102.',
    openGraph: {
        title: 'Website Terms of Use | FORMA Architects',
        description: 'Terms governing use of the FORMA Architects website.',
    },
};

export default function TermsPage() {
    return (
        <>
            <Header />
            <main>

                {/* ── Dark hero ── */}
                <div className={`grain ${styles.hero}`}>
                    <div className={`container ${styles.heroContent}`}>
                        <span className={styles.heroEyebrow}>Legal</span>
                        <h1 className={styles.heroHeading}>Website Terms of Use</h1>
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
                                <li><a href="#s01" className={styles.tocLink}>About FORMA Architects</a></li>
                                <li><a href="#s02" className={styles.tocLink}>Use of This Website</a></li>
                                <li><a href="#s03" className={styles.tocLink}>Intellectual Property &amp; Copyright in Deliverables</a></li>
                                <li><a href="#s04" className={styles.tocLink}>Project Information &amp; Accuracy</a></li>
                                <li><a href="#s05" className={styles.tocLink}>No Professional Advice</a></li>
                                <li><a href="#s06" className={styles.tocLink}>Professional Liability &amp; Insurance</a></li>
                                <li><a href="#s07" className={styles.tocLink}>Confidentiality</a></li>
                                <li><a href="#s08" className={styles.tocLink}>Third-Party Links</a></li>
                                <li><a href="#s09" className={styles.tocLink}>Limitation of Liability</a></li>
                                <li><a href="#s10" className={styles.tocLink}>Availability &amp; Changes</a></li>
                                <li><a href="#s11" className={styles.tocLink}>Privacy</a></li>
                                <li><a href="#s12" className={styles.tocLink}>Governing Law &amp; Jurisdiction</a></li>
                                <li><a href="#s13" className={styles.tocLink}>Contact</a></li>
                            </ol>
                        </nav>

                        <section id="s01" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>01</span>
                                About FORMA Architects
                            </h2>
                            <p>
                                This website is owned and operated by FORMA Architects AG, Bahnhofstrasse 42,
                                8001 Zürich, Switzerland (<strong>«FORMA»</strong>, <strong>«we»</strong>,{' '}
                                <strong>«us»</strong>). FORMA is a licensed architectural practice registered
                                in Switzerland and a member of the Swiss Society of Engineers and Architects (SIA).
                            </p>
                            <p>
                                By accessing and using this website, you agree to be bound by these Website Terms
                                of Use and all applicable Swiss laws and regulations. If you do not agree with any
                                part of these terms, please discontinue use of this website.
                            </p>
                        </section>

                        <section id="s02" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>02</span>
                                Use of This Website
                            </h2>
                            <p>You may use this website for lawful purposes only. You agree not to:</p>
                            <ul>
                                <li>Reproduce, distribute, or republish any content without our prior written consent.</li>
                                <li>Use the website to transmit unsolicited communications or spam.</li>
                                <li>Attempt to gain unauthorised access to any part of the website or its underlying infrastructure.</li>
                                <li>Use automated tools to scrape, index, or extract data from this website without permission.</li>
                                <li>Misrepresent your identity or affiliation in any enquiry or communication directed to us.</li>
                            </ul>
                        </section>

                        <section id="s03" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>03</span>
                                Intellectual Property &amp; Copyright in Deliverables
                            </h2>
                            <p>
                                All content on this website — including architectural visualisations, project
                                photography, drawings, written descriptions, the FORMA name, logotype, and
                                brand identity — is the exclusive intellectual property of FORMA Architects AG
                                and is protected under Swiss copyright law (Urheberrechtsgesetz, URG) and
                                international conventions. Nothing on this website grants any licence or right
                                to use our intellectual property without our express written permission.
                            </p>
                            <p>
                                Under Swiss law (URG Art. 2 and Art. 6), architectural works — including
                                design concepts, drawings, specifications, BIM models, renderings, and
                                three-dimensional models — are original works protected by copyright.{' '}
                                <strong>FORMA retains full copyright in all design documents, drawings,
                                and deliverables produced in the course of any commission</strong>, regardless
                                of whether a fee has been paid.
                            </p>
                            <p>
                                Upon full payment of agreed fees, the client receives a limited, non-exclusive,
                                non-transferable licence to use those documents solely for the specific
                                project for which they were produced. The documents may not be reused,
                                adapted, or reproduced for any other project or purpose without a separate
                                written agreement with FORMA.
                            </p>
                            <p>
                                Press and editorial enquiries regarding image usage should be directed to{' '}
                                <a href="mailto:press@forma-architects.ch" className={styles.inlineLink}>
                                    press@forma-architects.ch
                                </a>.
                            </p>
                        </section>

                        <section id="s04" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>04</span>
                                Project Information &amp; Accuracy
                            </h2>
                            <p>
                                Project descriptions, visualisations, drawings, BIM model extracts, and
                                specifications shown on this website are provided for informational and
                                portfolio purposes only. They represent the work as designed and may not
                                reflect the final built outcome, subsequent amendments, planning authority
                                decisions, or current project status. FORMA Architects makes no
                                representations as to the accuracy or completeness of any project
                                information presented.
                            </p>
                        </section>

                        <section id="s05" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>05</span>
                                No Professional Advice
                            </h2>
                            <p>
                                Content on this website is provided for general informational purposes only
                                and does not constitute professional architectural, planning, structural
                                engineering, or legal advice. No client relationship is created by virtue
                                of visiting this website or submitting an enquiry through the contact form.
                            </p>
                            <p>
                                Any formal engagement of FORMA Architects for professional services is subject
                                to a separate written fee agreement. Our standard form of agreement is based
                                on <strong>SIA 102</strong> — the Swiss Society of Engineers and Architects'
                                Regulation on Architectural Services — which defines the scope of services,
                                fee structure, and the respective rights and obligations of architect and client.
                            </p>
                        </section>

                        <section id="s06" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>06</span>
                                Professional Liability &amp; Insurance
                            </h2>
                            <p>
                                FORMA Architects AG carries Professional Indemnity (PI) insurance, as is
                                standard and required for architectural practice in Switzerland. This insurance
                                covers claims arising from professional negligence — including errors or
                                omissions in design, documentation, or construction administration — up to
                                the limits of the policy in force at the time of the relevant commission.
                            </p>
                            <p>
                                Details of our PI insurance coverage are available upon request and will be
                                disclosed as required under Swiss procurement rules or at the reasonable
                                request of a client prior to formal engagement. The existence of PI insurance
                                does not expand the scope of liability beyond what is agreed in the
                                commission-specific fee agreement.
                            </p>
                        </section>

                        <section id="s07" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>07</span>
                                Confidentiality
                            </h2>
                            <p>
                                We understand that information shared during an enquiry or commission —
                                including site details, client identity, programme requirements, budgets,
                                and strategic plans — may be commercially sensitive or confidential.
                            </p>
                            <p>
                                All information disclosed to FORMA Architects in the context of a project
                                enquiry or engagement will be treated as confidential and will not be
                                disclosed to third parties without your consent, except where required by
                                law, by a court order, or as strictly necessary to fulfil the commission
                                (e.g. sharing with specialist consultants or contractors under equivalent
                                confidentiality obligations).
                            </p>
                            <p>
                                Where a formal commission requires a Non-Disclosure Agreement (NDA),
                                FORMA is willing to enter into one prior to the exchange of sensitive
                                information. Please raise this requirement at the time of your initial enquiry.
                            </p>
                        </section>

                        <section id="s08" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>08</span>
                                Third-Party Links
                            </h2>
                            <p>
                                This website may contain links to external websites for informational purposes.
                                FORMA Architects has no control over and accepts no responsibility for the
                                content, privacy practices, or availability of those sites. The inclusion of
                                any link does not imply endorsement by FORMA Architects.
                            </p>
                        </section>

                        <section id="s09" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>09</span>
                                Limitation of Liability
                            </h2>
                            <p>
                                To the fullest extent permitted by Swiss law, FORMA Architects AG shall not
                                be liable for any indirect losses, loss of profit, loss of data, or
                                consequential damages arising from:
                            </p>
                            <ul>
                                <li>Your use of, or inability to use, this website.</li>
                                <li>Any errors, omissions, or inaccuracies in website content.</li>
                                <li>Interruption, suspension, or discontinuation of the website.</li>
                                <li>Any content on or linked from third-party websites.</li>
                            </ul>
                            <p>
                                Liability for direct losses caused by our gross negligence or wilful
                                misconduct remains unaffected in accordance with Swiss law (Art. 100 OR).
                                This limitation does not affect any mandatory statutory rights you may have
                                under Swiss consumer protection law.
                            </p>
                        </section>

                        <section id="s10" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>10</span>
                                Availability &amp; Changes
                            </h2>
                            <p>
                                We reserve the right to modify, suspend, or discontinue any aspect of this
                                website at any time without prior notice. We also reserve the right to amend
                                these Website Terms of Use at any time. The date of the most recent revision
                                is shown at the top of this page. Continued use of the website following any
                                update constitutes acceptance of the revised terms.
                            </p>
                        </section>

                        <section id="s11" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>11</span>
                                Privacy
                            </h2>
                            <p>
                                Your use of this website is also governed by our{' '}
                                <Link href="/privacy" className={styles.inlineLink}>Privacy Policy</Link>,
                                which is incorporated into these Terms by reference. The Privacy Policy
                                explains how we collect, use, and protect your personal data in compliance
                                with the Swiss nDSG and EU GDPR.
                            </p>
                        </section>

                        <section id="s12" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>12</span>
                                Governing Law &amp; Jurisdiction
                            </h2>
                            <p>
                                These Website Terms of Use are governed exclusively by substantive Swiss law,
                                without regard to conflict of law principles. Any disputes arising from or
                                relating to these terms or your use of this website shall be subject to the
                                exclusive jurisdiction of the ordinary courts of the Canton of Zürich,
                                Switzerland.
                            </p>
                        </section>

                        <section id="s13" className={styles.section}>
                            <h2 className={styles.sectionHeading}>
                                <span className={styles.sectionNum}>13</span>
                                Contact
                            </h2>
                            <p>
                                For questions regarding these Website Terms of Use, please contact:{' '}
                                <a href="mailto:legal@forma-architects.ch" className={styles.inlineLink}>
                                    legal@forma-architects.ch
                                </a>
                            </p>
                            <p>
                                FORMA Architects AG<br />
                                Bahnhofstrasse 42<br />
                                8001 Zürich, Switzerland
                            </p>
                        </section>

                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
