import { useEffect, useState } from "react";

function ThemeToggle() {
    const [dark, setDark] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark(!dark)}
            className="px-3 py-2 rounded-md border bg-gray-200 dark:bg-gray-700 dark:text-white transition"
        >
            {dark ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}

export default ThemeToggle;