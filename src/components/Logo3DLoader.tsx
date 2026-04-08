'use client';

import dynamic from 'next/dynamic';

const Logo3D = dynamic(() => import('./Logo3D'), { ssr: false });

export default function Logo3DLoader() {
    return <Logo3D />;
}
