import React, { Fragment, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import axios from "axios";
import UserContext from "../../context/userContext";

const Component = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const userProvider = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login";
    }, []);

    useEffect(() => {
        if (userProvider.user !== null) {
            navigate("/dashboard");
        }
    }, [userProvider, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/user/login`, user, { withCredentials: true })
        .then((res) => {
            if (res.status === 200) {
                axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
                .then((res) => {
                    if (res.status === 200) {
                        userProvider.setUser(res.data);
                        // navigate("/dashboard");
                    }
                });
            }
        });
                
    };

    return (
        <Fragment>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="max-w-xs w-full flex flex-col gap-5">
                    <form className="signUpForm" onSubmit={handleLogin}>
                        <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg">
                            <h1 className="text-white text-2xl font-bold">Login</h1>
                            <div className="text-white space-y-2">
                                <Label htmlFor="email" color="white">Email</Label>
                                <TextInput id="email" name="email" label="Email" type="email" placeholder="Email" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="text-white space-y-2">
                                <Label htmlFor="password" color="white">Password</Label>
                                <TextInput id="password" name="password" label="Password" type="password" placeholder="Password" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="w-full flex items-end justify-between gap-5 mt-5">
                                <Button type="submit" color="light">Login</Button>
                                <Link to="/register" className="text-white hover:underline text-right">Create an account ?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;