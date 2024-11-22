import { useState } from 'react';
import { navigations } from '../assets/constants';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from 'lucide-react';

const Sidebar = () => {
    const [isExpanded, setExpanded] = useState(true);

    return (
        <div className="relative min-h-screen flex">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 ease-in-out border-r border-gray-300 bg-gray-50
        ${isExpanded ? 'w-64' : 'w-16'}`}
            >
                {/* Header */}
                <div className="h-[100px] flex justify-center items-center mt-10">
                    <div
                        className={`transition-all duration-300 ease-in-out flex flex-col items-center ${isExpanded ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="rounded-full bg-black w-10 h-10"></div>
                        {isExpanded && <span className="text-sm mt-2">Admin Dashboard</span>}
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    {navigations.map((item, index) => (
                        <div
                            className={`flex items-center justify-center h-11 px-2 cursor-pointer hover:bg-gray-200 ${!isExpanded && 'justify-center'}`}
                            key={index}
                        >
                            <a href={item.href} className={`flex items-center w-full relative ${isExpanded?" left-8": "justify-center"}`}>
                                <div className="h-4 relative">{item.icon && <item.icon />}</div>
                                {isExpanded && (
                                    <span className="ml-2 text-sm transition-all duration-300 ease-in-out">
                                        {item.label}
                                    </span>
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className={`flex-grow p-4 absolute top-[50%]  transition-all duration-300 ease-in-out ${isExpanded ? 'left-52 ' : 'left-5'} `}>
                    <button
                        className={`px-4 py-2border-2 scale-150`}
                        onClick={() => setExpanded(!isExpanded)}
                    >
                        {isExpanded? <ArrowLeftCircleIcon /> : <ArrowRightCircleIcon />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;