import React, { Fragment, useEffect } from "react";
import { Button } from "flowbite-react";

const Component = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    
    return (
        <Fragment>
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="relative">
                    <h1 className="text-[calc(128px)] font-black uppercase text-transparent bg-gradient-to-b from-black from-30% to-white bg-clip-text">To Do</h1>
                    <div className="absolute bottom-10 w-[calc(100%+40px)] h-10 translate-x-[calc(-20px)] flex justify-center items-center bg-white/40 backdrop-blur-md">
                        <p className="text-xl font-bold">Your Tasking Companion</p>
                    </div>
                </div>
                <div className="mt-10 flex gap-5">
                    <Button href="/login" color="dark">Login</Button>
                    <Button href="/register" color="dark">Register</Button>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;