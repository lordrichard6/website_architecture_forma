'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    // Pages that have a dark hero — header starts transparent with white text
    const hasDarkHero = pathname === '/' || pathname.startsWith('/projects/');
    const isTransparent = hasDarkHero && !scrolled;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        // Run once immediately in case page is already scrolled
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [close]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Determine active link
    const isActive = (href: string) => {
        if (href.startsWith('/#')) return pathname === '/';
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <header className={[
            styles.header,
            scrolled ? styles.scrolled : '',
            isTransparent ? styles.transparent : '',
        ].join(' ')}>
            <div className={`container ${styles.container}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo} onClick={close}>
                    <svg className={styles.logoMark} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <rect x="0.75" y="0.75" width="11.5" height="11.5" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="15.75" y="0.75" width="11.5" height="11.5" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="0.75" y="15.75" width="11.5" height="11.5" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="15.75" y="15.75" width="11.5" height="11.5" fill="currentColor" strokeWidth="0" />
                    </svg>
                    <span>FORMA</span>
                </Link>

                {/* Desktop nav */}
                <nav className={styles.nav}>
                    <Link href="/#projects" className={`${styles.link} ${isActive('/#projects') ? styles.active : ''}`}>Projects</Link>
                    <Link href="/studio"    className={`${styles.link} ${isActive('/studio')    ? styles.active : ''}`}>Studio</Link>
                    <Link href="/services"  className={`${styles.link} ${isActive('/services')  ? styles.active : ''}`}>Services</Link>
                    <Link href="/#contact"  className={`${styles.link} ${isActive('/#contact')  ? styles.active : ''}`}>Contact</Link>
                </nav>

                {/* Desktop CTA */}
                <Link href="/#contact" className={styles.cta}>
                    Start a Project
                </Link>

                {/* Mobile toggle */}
                <button
                    className={styles.menuBtn}
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile overlay */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`} aria-hidden={!isOpen}>
                <nav className={styles.mobileNav}>
                    <Link href="/#projects" className={styles.mobileLink} onClick={close}>Projects</Link>
                    <Link href="/studio"    className={styles.mobileLink} onClick={close}>Studio</Link>
                    <Link href="/services"  className={styles.mobileLink} onClick={close}>Services</Link>
                    <Link href="/#contact"  className={styles.mobileLink} onClick={close}>Contact</Link>
                    <Link href="/#contact"  className={styles.mobileCta}  onClick={close}>Start a Project</Link>
                </nav>
            </div>
        </header>
    );
}
