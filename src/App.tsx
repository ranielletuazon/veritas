import "./App.css";
import "nprogress/nprogress.css";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import LoadingPage from "./pages/components/LoadingPage";
import { AppReadyContext } from "./context/appReady";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const NotFound = lazy(() => import("./pages/NotFound"));
const News = lazy(() => import("./pages/News"));
const About = lazy(() => import("./pages/About"));
const NewsPost = lazy(() => import("./pages/NewsPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersView = lazy(() => import("./pages/CareersView"));
const ProductsView = lazy(() => import("./pages/ProductsView"));

NProgress.configure({ showSpinner: false });

const SPLASH_MIN_VISIBLE = 900;
const SPLASH_FADE_DURATION = 500;

function NavigationProgress() {
    const location = useLocation();
    useEffect(() => {
        NProgress.start();
        const timer = setTimeout(() => NProgress.done(), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);
    return null;
}

function FadeIn({ children }: { children: ReactNode }) {
    const location = useLocation();
    return (
        <div key={location.pathname} className="page-fade">
            {children}
        </div>
    );
}

function App() {
    const [showSplash, setShowSplash] = useState(true);
    const [splashFading, setSplashFading] = useState(false);
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        const fadeTimer = setTimeout(() => {
            setSplashFading(true);
            setAppReady(true); // ← Reveal components are now allowed to trigger
        }, SPLASH_MIN_VISIBLE);

        const removeTimer = setTimeout(
            () => setShowSplash(false),
            SPLASH_MIN_VISIBLE + SPLASH_FADE_DURATION,
        );

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <AppReadyContext.Provider value={appReady}>
            <BrowserRouter>
                {showSplash && <LoadingPage fadingOut={splashFading} />}

                <NavigationProgress />
                <Suspense
                    fallback={<div className="min-h-screen bg-slate-50" />}
                >
                    <FadeIn>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/news" element={<News />} />
                            <Route path="/about-us" element={<About />} />
                            <Route path="/contact-us" element={<Contact />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route
                                path="/careers/:slug"
                                element={<CareersView />}
                            />
                            <Route path="/news/:slug" element={<NewsPost />} />
                            <Route
                                path="/products/:slug"
                                element={<ProductsView />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </FadeIn>
                </Suspense>
            </BrowserRouter>
        </AppReadyContext.Provider>
    );
}

export default App;
