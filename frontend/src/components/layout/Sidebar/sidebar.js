import React, { Fragment, useEffect } from "react";
import $ from "jquery";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import { TbArrowBarLeft, TbPlus } from "react-icons/tb";
import SidebarItem from "./sidebarItem";

const Component = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);

    const toggleSideBar = async () => {
        $('#sideBar #toggleSideBarBtn').toggleClass('rotate-180');
        setTimeout(() => {
            $('#sideBar').toggleClass('w-60');
            $('#sideBar').toggleClass('w-20');
            $('#sideBar h1').toggleClass('rotate-90');
            $('#sideBar h1').parent().toggleClass('flex-col-reverse');
            $('#sideBar p').toggle('50');
        }, 100);
    }
    
    return (
        <Fragment>
            <div id="sideBar" className="max-h-[calc(100vh-20px)] h-screen w-60 bg-white rounded-tr-lg px-5 py-7 ease-in-out duration-300">
                <div className="flex justify-between gap-4">
                    <h1 className="text-2xl font-extrabold">Lists</h1>
                    <button id="toggleSideBarBtn" onClick={toggleSideBar} className="bg-background-gray text-white rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200"><TbArrowBarLeft color="black" strokeWidth={2.5}/></button>
                </div>
                <div className="h-5/6 mt-5">
                    <div className="h-full flex flex-col gap-2">
                        <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                            <SidebarItem title="Overview" count={2} active={true} icon={<LuGalleryHorizontalEnd strokeWidth={2.5}/>} onClick={() => {console.log('click')}}/>
                            <SidebarItem title="Tasks" count={5} icon={<LuGalleryHorizontalEnd strokeWidth={2.5}/>} />
                            <SidebarItem title="Tasks" count={5} icon={<LuGalleryHorizontalEnd strokeWidth={2.5}/>} />
                        </div>
                        <button onClick="" className="flex items-center gap-3 text-black rounded-lg p-3 bg-background-gray hover:bg-gray-200 ease-in-out duration-300">
                            <div className="w-[24px]">
                                <TbPlus />
                            </div>
                            <div className="w-full flex justify-between">
                                <p className="itemTitle font-bold whitespace-nowrap">Add New List</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;