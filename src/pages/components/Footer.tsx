import logo from "../../assets/images/veritas_landscape_logo.png";

export default function Footer() {
    return (
        <>
            <footer className="w-full max-w-full border border-black bg-gray-200 py-4 px-6">
                <div className="container mx-auto flex flex-row items-start justify-center gap-4">
                    {/* Left Content */}
                    <div className="w-1/2 border h-min-20 border-black">
                        <img src={logo} alt="Veritas Logo" className="h-20" />
                    </div>

                    {/* Right Content */}
                    <div className="w-1/2 border h-min-20 border-black">
                        <nav className="flex items-center gap-6 flex flex-col items-start justify-center">
                            <a
                                href="#"
                                className="text-black hover:text-gray-500"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="text-black hover:text-gray-500"
                            >
                                Products
                            </a>
                            <a
                                href="#"
                                className="text-black hover:text-gray-500"
                            >
                                Careers
                            </a>
                            <a
                                href="#"
                                className="text-black hover:text-gray-500"
                            >
                                About Us
                            </a>
                            <a
                                href="#"
                                className="text-black hover:text-gray-500"
                            >
                                Contact
                            </a>
                        </nav>
                    </div>
                </div>
            </footer>
        </>
    );
}
