import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/userContext";

const Component = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confPassword: "",
    });

    const userProvider = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Register";
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/user/register`, user, { withCredentials: true })
        .then((res) => {
            if (res.status === 200) {
                axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true })
                .then((res) => {
                    if (res.status === 200) {
                        userProvider.setUser(res.data);
                        navigate("/dashboard");
                    }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <Fragment>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="max-w-xs w-full flex flex-col gap-5">
                    <form className="signUpForm" onSubmit={handleRegister}>
                        <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg">
                            <h1 className="text-white text-2xl font-bold">Register</h1>
                            <div className="text-white space-y-2">
                                <Label htmlFor="name" color="white">Name</Label>
                                <TextInput id="name" name="name" label="Name" type="text" placeholder="Name" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="text-white space-y-2">
                                <Label htmlFor="email" color="white">Email</Label>
                                <TextInput id="email" name="email" label="Email" type="email" placeholder="Email" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="text-white space-y-2">
                                <Label htmlFor="password" color="white">Password</Label>
                                <TextInput id="password" name="password" label="Password" type="password" placeholder="Password" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="text-white space-y-2">
                                <Label htmlFor="confPassword" color="white">Confrim Password</Label>
                                <TextInput id="confPassword" name="confPassword" label="Password" type="password" placeholder="Confirm Password" onChange={(e) => {setUser({ ...user, [e.target.name]:e.target.value})}}/>
                            </div>
                            <div className="w-full flex items-end justify-between gap-5 mt-5">
                                <Button type="submit" color="light">Register</Button>
                                <Link to="/login" className="text-white hover:underline text-right">Already have an account ?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;