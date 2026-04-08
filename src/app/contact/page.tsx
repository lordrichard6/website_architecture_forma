import type { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactHero from './ContactHero';
import ContactSection from './ContactSection';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Begin your project with FORMA Architects. Reach our Zurich studio to discuss residential, commercial, cultural, or civic architecture commissions across Europe.',
    openGraph: {
        title: 'Contact | FORMA Architects',
        description: 'Begin your project with FORMA Architects in Zurich.',
    },
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main>
                <ContactHero />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
