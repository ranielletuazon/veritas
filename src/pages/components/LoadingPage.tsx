// import logo from "../../assets/images/veritas_landscape_logo_white.png";
import logo from "../../../public/images/new-veritas-logo.png";

interface LoadingPageProps {
    fadingOut: boolean;
}

export default function LoadingPage({ fadingOut }: LoadingPageProps) {
    return (
        <main
            aria-hidden="true"
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 transition-opacity duration-500 ease-out ${
                fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
        >
            <img
                src={logo}
                alt=""
                className="splash-pulse h-30 w-auto object-contain sm:h-24"
            />
        </main>
    );
}
