import React, { Fragment, useEffect } from "react";
import { IoFilter, IoChevronDownOutline } from "react-icons/io5";
import { TbPlus } from "react-icons/tb";
import Sidebar from "../layout/Sidebar/sidebar";
import TaskItem from "../layout/Task/taskItem";

const Component = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    
    return (
        <Fragment>
            <div className="h-screen pt-5 flex gap-5 overflow-hidden">
                <div className="relative">
                    <Sidebar />
                </div>
                <div className="h-full w-full flex flex-col overflow-y-auto px-10 pt-10">
                    <div className="flex justify-between gap-5">
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-wide">Good Morning, Thinal</h1>
                            <p className="text-gray-500">Today, 23 Feb 2024</p>
                        </div>
                        <div className="flex items-start gap-5">
                            <button className="w-48 flex items-center gap-2 bg-white text-black rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200">
                                <div className="bg-gray-200 p-1 rounded-md">
                                    <IoChevronDownOutline size={12}/>
                                </div>
                                <p>Today</p>
                            </button>
                            <button className="bg-white text-black rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200"><IoFilter size={20}/></button>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className="flex flex-col gap-2">
                            <TaskItem task={{title: "Design Standup"}} />
                            <TaskItem task={{title: "Login UI bug fix"}} />
                        </div>
                    </div>
                    <div className="fixed bottom-5 right-0 left-0 flex justify-center">
                        <button className="w-1/2 flex justify-between items-center bg-black text-white rounded-full py-2 px-6">
                            <div className="flex items-center gap-2">
                                <TbPlus color="white"/>
                                <p>Create New Task</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-black font-black">
                                <p className="bg-white rounded-sm py-0.5 px-1 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                                    CTRL
                                </p>
                                <p className="bg-white rounded-sm py-0.5 px-1 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                                    N
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;