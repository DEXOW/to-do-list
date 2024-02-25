const Component = ({
    title,
    icon,
    active,
    onClick
}) => {
    return (
        <button onClick={onClick} className={`flex items-center gap-3 ${active ? 'bg-background-gray' : null} text-black rounded-lg p-3 hover:bg-background-gray ease-in-out duration-300`}>
            <div className="w-[24px]">
                {icon}
            </div>
            <div className="w-full flex justify-between">
                <p className="itemTitle font-bold">{title}</p>
            </div>
        </button>
    )
}

export default Component;