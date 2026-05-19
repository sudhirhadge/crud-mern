import React, { useContext, useEffect } from "react";
import AddItem from "./components/AddItem";
import AuthCard from "./components/AuthCard";
import ItemList from "./components/ItemList";
import UserInfo from "./components/UserInfo";
import AuthContext from "./components/context/AuthContext";
import ThemeToggle from "./components/ThemeToggle";

export default function AppContent({ currentItem, setCurrentItem }) {
    const { user, accessToken, setAccessToken } = useContext(AuthContext);

    useEffect(() => {
        // full page refresh accessToken will be lost since it's stored in state, so we need to check if we can get a new one using the refresh token

        // If no access token, try to make new request with cookies on refresh route
        const response = fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
            method: 'POST',
            credentials: 'include' // include cookies in the request
        }).then(res => res.json())
            .then(data => {
                console.log("refresh response", data)
                setAccessToken(data.accessToken);
            })
            .catch(err => console.error("Error refreshing token:", err));

    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">

            {/* 🔹 HEADER */}
            <header className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    🚀 CRUD Dashboard
                </h1>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user && (
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Welcome 👋
                        </span>
                    )}
                </div>
            </header>

            {/* 🔹 MAIN */}
            <main className="flex-1 max-w-6xl mx-auto w-full p-6 space-y-6">

                {/* Auth Section */}
                <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded-xl shadow-sm">
                    <h2 className="text-lg font-medium mb-3">User Access</h2>

                    {!user ? (
                        <div className="flex justify-center">
                            <AuthCard />
                        </div>
                    ) : (
                        <UserInfo />
                    )}
                </div>

                {/* Add Item */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                    <h2 className="text-lg font-medium mb-3">Manage Items</h2>
                    <AddItem currentItem={currentItem} setCurrentItem={setCurrentItem} />
                </div>

                {/* Item List */}
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm">
                    <ItemList setCurrentItem={setCurrentItem} />
                </div>

            </main>

            {/* 🔹 FOOTER */}
            <footer className="bg-white dark:bg-gray-900 border-t text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                © {new Date().getFullYear()} Sudhir App • All rights reserved
            </footer>

        </div>
    );
}