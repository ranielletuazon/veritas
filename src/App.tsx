import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import About from "./pages/About";
import NewsPost from "./pages/NewsPost";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import CareersView from "./pages/CareersView";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/contact-us" element={<Contact />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/careers/:slug" element={<CareersView />} />
                    <Route path="/news/:slug" element={<NewsPost />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
