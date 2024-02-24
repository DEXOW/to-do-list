import { Checkbox } from 'flowbite-react';
import { IoMdMore } from 'react-icons/io';

const Component = ({ task }) => {
    return (
        <div className="w-full flex justify-between bg-white rounded-lg px-4 py-3 hover:shadow-md ease-in-out duration-500">
            <div className="flex items-center gap-4">
                <Checkbox />
                <p className="text-sm">{task.title}</p>
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