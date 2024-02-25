import $ from 'jquery';
import axios from 'axios';
import { MdOutlineDelete } from "react-icons/md";

const Component = ({
    id,
    title,
    icon,
    active,
    onClick,
    onDelete
}) => {

    const handleDeleteList = async () => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/list/delete`, { id }, { withCredentials: true });
            onDelete();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={onClick} onMouseEnter={() => $(`#deleteBtn-${id}`).show()} onMouseLeave={() => $(`#deleteBtn-${id}`).hide()} className={`flex items-center gap-3 ${active ? 'bg-background-gray' : null} text-black rounded-lg p-3 hover:bg-background-gray ease-in-out duration-300`}>
            <div className="w-[24px]">
                {icon}
            </div>
            <div className="w-full flex items-center justify-between">
                <p className="itemTitle font-bold">{title}</p>
                {id != 0 ? ( 
                    <button id={`deleteBtn-${id}`} onClick={handleDeleteList} className="hidden rounded-lg p-1 bg-gray-200 hover:text-red-500 ease-in-out duration-300">
                        <MdOutlineDelete />
                    </button>
                ) : null}
            </div>
        </button>
    )
}

export default Component;