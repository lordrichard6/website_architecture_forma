'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking a link
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image src="/icon.png" alt="FORMA Logo" width={32} height={32} />
                    </div>
                    <span>FORMA</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/#projects" className={styles.link}>Projects</Link>
                    <Link href="/studio" className={styles.link}>Studio</Link>
                    <Link href="/services" className={styles.link}>Services</Link>
                    <Link href="/#contact" className={styles.link}>Contact</Link>
                </nav>

                <Link href="/#contact" className={styles.cta}>
                    Start a Project
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className={styles.menuBtn}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link href="/#projects" className={styles.mobileLink} onClick={handleLinkClick}>Projects</Link>
                    <Link href="/studio" className={styles.mobileLink} onClick={handleLinkClick}>Studio</Link>
                    <Link href="/services" className={styles.mobileLink} onClick={handleLinkClick}>Services</Link>
                    <Link href="/#contact" className={styles.mobileLink} onClick={handleLinkClick}>Contact</Link>
                    <Link href="/#contact" className={styles.mobileCta} onClick={handleLinkClick}>Start a Project</Link>
                </nav>
            </div>
        </header>
    );
}
