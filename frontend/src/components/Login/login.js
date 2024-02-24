import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

const Component = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login";
    }, []);

    const handleLogin = () => {
        // TODO: Handle login
        navigate("/dashboard");
    };

    return (
        <Fragment>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="max-w-xs w-full flex flex-col gap-5">
                    <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg">
                        <h1 className="text-white text-2xl font-bold">Login</h1>
                        <div className="text-white space-y-2">
                            <Label htmlFor="email" color="white">Email</Label>
                            <TextInput id="email" label="Email" type="email" placeholder="Email" />
                        </div>
                        <div className="text-white space-y-2">
                            <Label htmlFor="password" color="white">Password</Label>
                            <TextInput id="password" label="Password" type="password" placeholder="Password" />
                        </div>
                        <div className="w-full flex items-end justify-between gap-5 mt-5">
                            <Button onClick={handleLogin} color="light">Login</Button>
                            <Link to="/register" className="text-white hover:underline text-right">Create an account ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;