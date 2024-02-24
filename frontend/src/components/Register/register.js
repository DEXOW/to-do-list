import React, { Fragment, useEffect } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Component = () => {
    useEffect(() => {
        document.title = "Register";
    }, []);

    return (
        <Fragment>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="max-w-xs w-full flex flex-col gap-5">
                    <div className="p-5 flex flex-col gap-5 bg-gray-900 rounded-lg">
                        <h1 className="text-white text-2xl font-bold">Register</h1>
                        <div className="text-white space-y-2">
                            <Label htmlFor="email" color="white">Email</Label>
                            <TextInput id="email" label="Email" type="email" placeholder="Email" />
                        </div>
                        <div className="text-white space-y-2">
                            <Label htmlFor="password" color="white">Password</Label>
                            <TextInput id="password" label="Password" type="password" placeholder="Password" />
                        </div>
                        <div className="text-white space-y-2">
                            <Label htmlFor="confPassword" color="white">Confrim Password</Label>
                            <TextInput id="confPassword" label="Password" type="password" placeholder="Confirm Password" />
                        </div>
                        <div className="w-full flex items-end justify-between gap-5 mt-5">
                            <Button color="light">Register</Button>
                            <Link to="/login" className="text-white hover:underline text-right">Already have an account ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;