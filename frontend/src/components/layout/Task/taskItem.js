import $ from 'jquery';
import { useEffect } from 'react';
import { Checkbox } from 'flowbite-react';
import axios from 'axios';
import { IoMdMore } from 'react-icons/io';

const Component = ({ task, getTaskFunc }) => {

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

    return (
        <div className="w-full flex justify-between bg-white rounded-lg px-4 py-3 hover:shadow-md ease-in-out duration-500">
            <div className="flex items-center gap-4">
                <Checkbox id={`checkBox-${task._id}`} onClick={handleTaskCheck}/>
                <p className="text-sm">{task.name}</p>
            </div>
            <div>
                <button className="bg-white text-black rounded-lg p-2 hover:bg-gray-200 ease-in-out duration-200">
                    <IoMdMore size={20}/>
                </button>
            </div>
        </div>
    )
}

export default Component;