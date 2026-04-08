'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import styles from './Logo3D.module.css';

export default function Logo3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia('(max-width: 1024px)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const el = mountRef.current;
        if (!el) return;

        let mounted = true;
        let rafId: number;

        const W = el.clientWidth;
        const H = el.clientHeight;

        // ── Renderer ─────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        el.appendChild(renderer.domElement);

        // ── Scene & camera ────────────────────────────────────────
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 2000);
        camera.position.z = 750; // pulled back so rotation never clips at canvas edge

        // ── Lighting ─────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const key = new THREE.DirectionalLight(0x8ab59e, 3.5);
        key.position.set(200, 300, 400);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xddeae4, 0.8);
        rim.position.set(-300, -150, -200);
        scene.add(rim);

        // ── Scroll state ──────────────────────────────────────────
        let scrollY = window.scrollY;
        const onScroll = () => { scrollY = window.scrollY; };
        window.addEventListener('scroll', onScroll, { passive: true });

        // ── Load & extrude ────────────────────────────────────────
        const loader = new SVGLoader();
        loader.load('/forma_logo_white.svg', (data) => {
            if (!mounted) return;

            const group = new THREE.Group();

            for (const path of data.paths) {
                const shapes = SVGLoader.createShapes(path);
                for (const shape of shapes) {
                    const geo = new THREE.ExtrudeGeometry(shape, {
                        depth: 32,
                        bevelEnabled: true,
                        bevelThickness: 5,
                        bevelSize: 2.5,
                        bevelSegments: 4,
                        curveSegments: 10,
                    });
                    const mat = new THREE.MeshStandardMaterial({
                        color: 0x6E8C7A,
                        metalness: 0.55,
                        roughness: 0.3,
                        side: THREE.DoubleSide, // render both faces — prevents disappearing during rotation
                    });
                    group.add(new THREE.Mesh(geo, mat));
                }
            }

            // Center the meshes in local space BEFORE flipping Y —
            // this ensures rotation.y pivots around the geometric center,
            // not the corner of the SVG coordinate space.
            const box = new THREE.Box3().setFromObject(group);
            const center = box.getCenter(new THREE.Vector3());
            group.children.forEach(child => {
                (child as THREE.Object3D).position.sub(center);
            });

            // Now flip Y (SVG Y-down → Three.js Y-up)
            group.scale.set(1, -1, 1);
            scene.add(group);

            // ── Smooth scroll-driven rotation ─────────────────
            let currentRotY = 0;
            let currentRotX = 0;

            const tick = () => {
                if (!mounted) return;
                rafId = requestAnimationFrame(tick);

                const maxScroll = Math.max(
                    document.documentElement.scrollHeight - window.innerHeight, 1
                );
                const progress = scrollY / maxScroll;

                // Target: full Y rotation (reversed) + slight X tilt
                const targetRotY = -progress * Math.PI * 2;
                const targetRotX = -progress * 0.35;

                // Lerp for smoothness — higher = snappier, lower = lazier
                currentRotY += (targetRotY - currentRotY) * 0.055;
                currentRotX += (targetRotX - currentRotX) * 0.055;

                group.rotation.y = currentRotY;
                group.rotation.x = currentRotX;

                renderer.render(scene, camera);
            };
            tick();
        });

        return () => {
            mounted = false;
            cancelAnimationFrame(rafId);
            window.removeEventListener('scroll', onScroll);
            renderer.dispose();
            if (renderer.domElement.parentNode === el) {
                el.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            aria-hidden="true"
            className={styles.logo3d}
        />
    );
}
