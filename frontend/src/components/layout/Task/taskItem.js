import { useEffect, useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import { Checkbox, Dropdown } from 'flowbite-react';
import { IoMdMore, IoIosClose } from 'react-icons/io';
import { LuArrowRight } from "react-icons/lu";
import { isEmpty } from 'validator';

const Component = ({ task, getTaskFunc }) => {
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
       $(`#checkBox-${task._id}`).prop('defaultChecked', task.completed);
       console.log(task.completed);
    }, [task._id]);

    const handleTaskCheck = (e) => {
        let completed = e.target.checked ? "true" : "false";
        try {
            axios.post(`${process.env.REACT_APP_API_URL}/task/update`, { id: task._id, completed: completed }, { withCredentials: true });
            getTaskFunc();
        }
        catch (error) {
            console.log(error);
        }
    }

    const toggleEditTaskInput = () => {
        $(`#taskNameDisplay-${task._id}`).toggle('50');
        $(`#taskNameEdit-${task._id}`).toggle('50');
    }

    const toggleEditTaskSubmitBtn = (e) => {
        if (isEmpty(e.target.value) || e.target.value === task.name) {
            $(`#editTaskSubmitBtn-${task._id}`).hide();
            $(`#editTaskCloseBtn${task._id}`).show();
        } else {
            $(`#editTaskSubmitBtn-${task._id}`).show();
            $(`#editTaskCloseBtn${task._id}`).hide();
        }
    }

    const handleEditTask = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/update`, { id: task._id, name: taskName }, { withCredentials: true });
            getTaskFunc();
            toggleEditTaskInput();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDeleteTask = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/delete`, { id: task._id }, { withCredentials: true });
            getTaskFunc();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full bg-white rounded-lg px-4 py-3 hover:shadow-md ease-in-out duration-500">
            <div id={`taskNameDisplay-${task._id}`} className='flex justify-between'>
                <div className="flex items-center gap-4">
                    <Checkbox id={`checkBox-${task._id}`} onClick={handleTaskCheck}/>
                    <p className="text-sm">{task.name}</p>
                </div>
                <div>
                    <Dropdown placement="bottom" dismissOnClick={true} renderTrigger={() => 
                        <button className="bg-white text-black rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200">
                            <IoMdMore size={20}/>
                        </button>
                    }>
                        <Dropdown.Item onClick={toggleEditTaskInput}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={handleDeleteTask}>Delete</Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
            <div id={`taskNameEdit-${task._id}`} className='hidden'>
                <div className="flex justify-between items-center">
                    <input type="text" defaultValue={task.name} onChange={(e) => { toggleEditTaskSubmitBtn(e); setTaskName(e.target.value) }} className="bg-transparent text-black border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 w-full"/>
                    <button onClick={handleEditTask} id={`editTaskSubmitBtn-${task._id}`} className="hidden bg-white rounded-full p-2 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                        <LuArrowRight strokeWidth={2.5}/>
                    </button>
                    <button onClick={toggleEditTaskInput} id={`editTaskCloseBtn${task._id}`} className="bg-white rounded-full p-2 hover:bg-gray-200 ease-in-out duration-200 cursor-pointer">
                        <IoIosClose strokeWidth={2.5}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Component;