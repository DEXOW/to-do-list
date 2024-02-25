import React, { Fragment, useEffect, useContext, useState } from "react";
import axios from "axios";
import $ from "jquery";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { TbPlus } from "react-icons/tb";
import { LuArrowRight } from "react-icons/lu";
import Sidebar from "../layout/Sidebar/sidebar";
import TaskItem from "../layout/Task/taskItem";
import withAuth from "../../hooks/authHook";
import UserContext from "../../context/userContext";
import PageDataContext from "../../context/pageContext";
import { isEmpty } from "validator";
import { Dropdown } from "flowbite-react";

const Component = () => {
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskListId, setNewTaskListId] = useState("");
    const [filter, setFilter] = useState(0); // ["All" , "To Do", "Completed"]
    const userProvider = useContext(UserContext);
    const pageProvider = useContext(PageDataContext);
    const user = userProvider.user;
    const filters = ["All", "To Do", "Completed"];

    useEffect(() => {
        document.title = "Home";
        pageProvider.setPageData({"list": 0});
        getLists();
        getTasks();
    }, []);

    useEffect(() => {
        if (pageProvider.pageData) {
            if (pageProvider.pageData.list === 0) {
                setFilteredTasks(tasks);
            } else {
                setFilteredTasks(tasks.filter(task => task.list === pageProvider.pageData.list));
            }
        } else {
            setFilteredTasks(tasks);
        }
    }, [filter, tasks, pageProvider.pageData]);

    const getCurrentDateInStr = () => {
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthName = monthNames[month];

        const formattedDate = `${day} ${monthName} ${year}`;

        return formattedDate;
    }

    const getLists = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/list/all`, { withCredentials: true });
            setLists(response.data.lists);
        } catch (error) {
            console.log(error);
        }
    }

    const getTasks = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/allByUser`, { withCredentials: true });
            setTasks(response.data.tasks);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleNewTaskInput = () => {
        $('#addNewTaskBtn').toggle('50');
        $('#addNewTaskInput').toggle('50');
        setNewTaskName("");
        setNewTaskListId("");
        $('#taskName').val("");
    }

    const toggleNewTaskSubmitBtn = (e) => {
        if (isEmpty(e.target.value)) {
            $('#addNewTaskSubmitBtn').hide();
            $('#addNewTaskCloseBtn').show();
        } else {
            $('#addNewTaskCloseBtn').hide();
            $('#addNewTaskSubmitBtn').show();
        }
    }

    const handleAddNewTask = async () => {
        console.log(newTaskName, newTaskListId);
        if (newTaskName && newTaskListId) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/create`, { name: newTaskName, listId: newTaskListId }, { withCredentials: true });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        toggleNewTaskInput();
        getTasks();
    }

    const handleClearCompletedTasks = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/clearCompleted`, { listId: String(pageProvider.pageData.list).toString() },{ withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        getTasks();
    }
    
    return (
        <Fragment>
            <div className="h-screen pt-5 flex gap-5 overflow-hidden">
                <div className="relative">
                    <Sidebar />
                </div>
                <div className="h-full w-full flex flex-col overflow-y-auto px-10 pt-10">
                    <div className="flex justify-between gap-5">
                        <div>
                            <h1 className="text-2xl font-extrabold tracking-wide">Good Morning, {user.name}</h1>
                            <p className="text-gray-500">Today, {getCurrentDateInStr()}</p>
                        </div>
                        <div className="flex items-start gap-5">
                            <Dropdown placement="bottom" dismissOnClick={true} renderTrigger={() => 
                                    <button className="w-48 flex items-center gap-2 bg-white text-black rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200">
                                        <div className="bg-gray-200 p-1 rounded-md">
                                            <IoChevronDownOutline size={12}/>
                                        </div>
                                        <p>{filters[filter]}</p>
                                    </button>
                            }>
                                <Dropdown.Item onClick={() => {setFilter(0)}}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => {setFilter(1)}}>To Do</Dropdown.Item>
                                <Dropdown.Item onClick={() => {setFilter(2)}}>Completed</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="mt-10 mb-20">
                        { filter === 0 || filter === 1 ? (
                            <>
                                <p className="text-xl font-extrabold mb-4">To Do</p>
                                <div className="flex flex-col gap-2">
                                    {filteredTasks.map((task, index) => {
                                        if (!task.completed) return <TaskItem key={index} task={task} getTaskFunc={getTasks} />
                                    })}
                                </div>
                            </>
                        ) : null }
                        { filter === 0 || filter === 2 ? (
                            <>
                                <div className="flex justify-between gap-2 items-center my-4">
                                    <p className="text-xl font-extrabold">Completed</p>
                                    <button onClick={handleClearCompletedTasks} className="bg-gray-200 text-sm rounded-md py-0.5 px-1 mx-5 hover:bg-gray-300 ease-in-out duration-200 cursor-pointer">
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {filteredTasks.map((task, index) => {
                                        if (task.completed) return <TaskItem key={index} task={task} getTaskFunc={getTasks} />
                                    })}
                                </div>
                            </>
                        ) : null }
                    </div>
                    <div className="fixed bottom-5 right-0 left-0 flex justify-center">
                        <div className="w-1/2 bg-black text-white rounded-full py-2 px-4">
                            <button id="addNewTaskBtn" onClick={toggleNewTaskInput} className="flex justify-between items-center w-full">
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
                            <div id="addNewTaskInput" className="hidden">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2 w-full">
                                        <input id="taskName" name="name" label="Name" type="text" placeholder="Task Name" onChange={(e) => { toggleNewTaskSubmitBtn(e); setNewTaskName(e.target.value) }} className="bg-transparent text-white border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 w-full"/>
                                    </div>
                                    <div className="flex items-center gap-2 text-black font-black">
                                        <Dropdown placement="top-start" dismissOnClick={true} renderTrigger={() => 
                                            <div className="flex items-start gap-5">
                                                <button className="flex items-center gap-2 bg-background-gray/[0.2] rounded-lg p-2 ease-in-out duration-200">
                                                    <div className="bg-gray-200 p-1 rounded-md">
                                                        <IoChevronDownOutline size={12}/>
                                                    </div>
                                                    <p className="text-sm me-6 text-white whitespace-nowrap">
                                                        {newTaskListId ? lists.find(list => list._id === newTaskListId).name : "Select List"}
                                                    </p>
                                                </button>
                                            </div>
                                        }>
                                            {lists.map((list, index) => {
                                                return <Dropdown.Item key={index} onClick={() => {setNewTaskListId(list._id)}}>{list.name}</Dropdown.Item>
                                            })}
                                        </Dropdown>
                                        <button onClick={handleAddNewTask} id="addNewTaskSubmitBtn" className="hidden bg-white rounded-full p-2 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                                            <LuArrowRight strokeWidth={2.5}/>
                                        </button>
                                        <button onClick={toggleNewTaskInput} id="addNewTaskCloseBtn" className="bg-white rounded-full p-2 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                                            <IoIosClose strokeWidth={2.5}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withAuth(Component);