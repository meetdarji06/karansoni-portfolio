import { lazy, Suspense, useEffect, useRef } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
import Lenis from "lenis";

const App = () => {
    const lenis = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        lenis.current = new Lenis({
            duration: 0.6, // Control the duration of the scroll
            easing: (t) => 1 - Math.pow(1 - t, 3), // Cubic easing for smooth stop
            smooth: true,
            smoothTouch: true, // Enable smooth scrolling on touch devices
        });

        const animate = (time) => {
            lenis.current.raf(time);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        // Cleanup on unmount
        return () => {
            lenis.current.destroy();
        };
    }, []);

    return (
        <>
            <LoadingProvider>
                <Suspense>
                    <MainContainer>
                        <Suspense>
                            <CharacterModel />
                        </Suspense>
                    </MainContainer>
                </Suspense>
            </LoadingProvider>
        </>
    );
};

export default App;
