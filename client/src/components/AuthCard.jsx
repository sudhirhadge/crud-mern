import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

function AuthCard() {
    const [tab, setTab] = useState("login");

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">

            {/* Tabs */}
            <div className="flex mb-6 border-b">
                <button
                    onClick={() => setTab("login")}
                    className={`flex-1 pb-2 font-medium ${tab === "login"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                        }`}
                >
                    Login
                </button>

                <button
                    onClick={() => setTab("register")}
                    className={`flex-1 pb-2 font-medium ${tab === "register"
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-500"
                        }`}
                >
                    Register
                </button>
            </div>

            {/* Form */}
            {tab === "login" ? <Login /> : <Register />}

            {/* Divider */}
            <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="px-3 text-sm text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social Login (dummy) */}
            <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    🔵 Continue with Google
                </button>

                <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                    ⚫ Continue with GitHub
                </button>
            </div>
        </div>
    );
}

export default AuthCard;