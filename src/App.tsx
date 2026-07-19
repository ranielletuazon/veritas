import "./App.css";
import "nprogress/nprogress.css";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NProgress from "nprogress";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const NotFound = lazy(() => import("./pages/NotFound"));
const News = lazy(() => import("./pages/News"));
const About = lazy(() => import("./pages/About"));
const NewsPost = lazy(() => import("./pages/NewsPost"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const CareersView = lazy(() => import("./pages/CareersView"));

NProgress.configure({ showSpinner: false });

/* Job 1: start/stop the top bar the instant navigation happens.
   Lives OUTSIDE Suspense so it fires immediately, unaffected by chunk loading. */
function NavigationProgress() {
    const location = useLocation();

    useEffect(() => {
        NProgress.start();
        const timer = setTimeout(() => NProgress.done(), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return null;
}

/* Job 2: fade the page IN once it's actually ready to render.
   Lives INSIDE Suspense — the key only remounts (and replays the animation)
   after the lazy chunk has loaded and the real content is what's mounting. */
function FadeIn({ children }: { children: ReactNode }) {
    const location = useLocation();
    return (
        <div key={location.pathname} className="page-fade">
            {children}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <NavigationProgress />
            <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
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
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </FadeIn>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
