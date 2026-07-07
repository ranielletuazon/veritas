import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import News from "./pages/News";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/news" element={<News />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
