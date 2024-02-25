import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { Dropdown, TextInput } from 'flowbite-react';
import { LuGalleryHorizontalEnd, LuArrowRight } from "react-icons/lu";
import { TbArrowBarLeft, TbPlus, TbSettings, TbLogout2 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import UserContext from "../../../context/userContext";
import PageDataContext from "../../../context/pageContext";
import SidebarItem from "./sidebarItem";

const Component = () => {
    const navigate = useNavigate();
    const userProvider = useContext(UserContext);
    const pageProvider = useContext(PageDataContext);
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState("");
    const [currentList, setCurrentList] = useState(0);

    useEffect(() => {
        document.title = "Home";
        pageProvider.setPageData({list: 0});
        getLists();
    }, []);

    useEffect(() => {
        if (pageProvider.pageData) {
            setCurrentList(pageProvider.pageData.list);
        }
    }, [pageProvider.pageData]);


    const getLists = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/list/all`, { withCredentials: true });
            setLists(response.data.lists);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/user/logout`, { withCredentials: true });
            userProvider.setUser(null);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    const toggleAddNewListInput = () => {
        $('#addNewListInput').toggle('50');
        $('#addNewListBtn').toggle('50');
    }

    const handleAddNewList = async () => {
        if (newListName) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/list/create`, { name: newListName }, { withCredentials: true });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        toggleAddNewListInput();
        getLists();
    }
        
    const toggleSideBar = async () => {
        $('#sideBar #toggleSideBarBtn').toggleClass('rotate-180');
        setTimeout(() => {
            $('#sideBar').toggleClass('w-60');
            $('#sideBar').toggleClass('w-20');
            $('#sideBar h1').toggleClass('rotate-90');
            $('#sideBar h1').toggleClass('mb-10');
            $('#sideBar h1').parent().toggleClass('flex-col-reverse');
            $('#sideBar p').toggle('50');
        }, 100);
    }
    
    return (
        <Fragment>
            <div id="sideBar" className="max-h-[calc(100vh-20px)] h-screen w-60 flex flex-col justify-between bg-white rounded-tr-lg px-5 py-7 ease-in-out duration-300">
                <div className="flex flex-col h-5/6">
                    <div className="flex justify-between gap-4">
                        <h1 className="text-2xl font-extrabold">Lists</h1>
                        <button id="toggleSideBarBtn" onClick={toggleSideBar} className="flex items-center justify-center bg-background-gray text-white rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200"><TbArrowBarLeft color="black" strokeWidth={2.5}/></button>
                    </div>
                    <div className="h-5/6 mt-5">
                        <div className="h-full flex flex-col gap-2">
                            <div className="flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
                                <SidebarItem title="Overview" active={currentList === 0} icon={<LuGalleryHorizontalEnd strokeWidth={2.5}/>} onClick={() => {pageProvider.setPageData({list:0})}}/>
                                {lists.map((list, index) => {
                                    return <SidebarItem key={index} title={list.name} active={list._id === pageProvider.pageData.list} icon={<LuGalleryHorizontalEnd strokeWidth={2.5}/>} onClick={() => {pageProvider.setPageData({list: list._id})}}/>
                                })}
                            </div>
                            <button id="addNewListBtn" onClick={toggleAddNewListInput} className="flex items-center gap-3 text-black rounded-lg p-3 bg-background-gray hover:bg-gray-200 ease-in-out duration-300">
                                <div className="w-[24px]">
                                    <TbPlus />
                                </div>
                                <div className="w-full flex justify-between">
                                    <p className="itemTitle font-bold whitespace-nowrap">Add New List</p>
                                </div>
                            </button>
                            <div id="addNewListInput" className="hidden flex flex-col gap-2 rounded-xl px-2 py-1">
                                <TextInput id="name" name="name" label="Name" type="text" placeholder="List Name" onChange={(e) => {setNewListName(e.target.value)}}/>
                                <div className="flex items-center gap-2 mt-2 w-full">
                                    <button onClick={toggleAddNewListInput} className="p-2 bg-red-500 text-white rounded-lg"><IoIosClose /></button>
                                    <button onClick={handleAddNewList} className="p-2 flex justify-end bg-black text-white rounded-lg w-full"><LuArrowRight /></button>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <Dropdown label="" placement="top-start" dismissOnClick={false} renderTrigger={() => 
                        <button className="bg-background-gray p-2 rounded-md z-50 hover:bg-gray-200 ease-in-out duration-200">
                            <TbSettings strokeWidth={2.5}/>
                        </button>}>
                        <Dropdown.Item><button onClick={handleLogout} className="w-max flex items-center gap-2 text-red-500"><TbLogout2 strokeWidth={2.5}/> Log Out</button></Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </Fragment>
    );
};

export default Component;