import type { Metadata } from 'next';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import StudioHero from './StudioHero';
import StudioPhilosophy from './StudioPhilosophy';
import StudioTeam from './StudioTeam';
import StudioAwards from './StudioAwards';
import styles from './studio.module.css';

export const metadata: Metadata = {
    title: 'Studio',
    description: 'Meet the team behind FORMA — award-winning architects, urban planners, and designers based in Zurich, Switzerland, delivering bold and timeless spaces since 2005.',
    openGraph: {
        title: 'Our Studio | FORMA Architects',
        description: 'Meet the team behind FORMA — architects and designers based in Zurich since 2005.',
    },
};



export default function StudioPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero — dark */}
                <StudioHero />

                {/* Philosophy — light */}
                <StudioPhilosophy />

                {/* Team — dark (restores light → dark → light rhythm) */}
                <StudioTeam />

                {/* Awards — light */}
                <StudioAwards />
            </main>

            <CTABanner />
            <Footer />
        </>
    );
}
