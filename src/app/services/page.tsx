import type { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import ServicesHero from './ServicesHero';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Comprehensive architectural services — master planning, residential, commercial, and interior design — delivered by FORMA Architects in Zurich.',
    openGraph: {
        title: 'Services | FORMA Architects',
        description: 'Comprehensive architectural services from concept to completion.',
    },
};

export default function ServicesPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero — dark, with scroll parallax */}
                <ServicesHero />

                {/* Services list — light surface */}
                <ServicesContent />
            </main>

            <CTABanner />
            <Footer />
        </>
    );
}
