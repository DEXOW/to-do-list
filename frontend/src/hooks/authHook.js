import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate();
        const { setUser } = useUser();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (typeof window !== "undefined") {
                const fetchUser = async () => {
                    try {
                        const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true });
                        setUser(userResponse.data);
                    } catch (error) {
                        navigate("/login");
                    } finally {
                        setLoading(false);
                    }
                };
                fetchUser();
            }
        }, []);

        if (loading) {
            return (
                <main className="flex items-center justify-center min-h-screen">
                    <span className="main-page loading loading-spinner loading-lg pb-24"></span>
                </main>
            );
        }

        return <Component {...props} />;
    };
}
