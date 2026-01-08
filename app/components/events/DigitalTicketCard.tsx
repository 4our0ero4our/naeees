
import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

interface TicketProps {
    event: any;
    registration: any;
    user: any;
}

const DigitalTicketCard: React.FC<TicketProps> = ({ event, registration, user }) => {
    return (
        <div className="w-full max-w-sm mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl relative filter drop-shadow-xl transform transition-transform hover:scale-[1.02] duration-300">
            {/* Top Section: Image */}
            <div className="h-48 w-full relative">
                {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <span className="text-gray-500 font-bold text-2xl">EVENT</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-6">
                    <span className="bg-[#EAB308] text-black text-xs font-black uppercase px-2 py-1 rounded shadow-sm">
                        {event.type === 'free' ? 'Free Entry' : 'Paid Access'}
                    </span>
                </div>
            </div>

            {/* Middle Section: Details */}
            <div className="p-6 pb-0">
                <h2 className="text-xl font-black font-heading leading-tight mb-4">{event.title}</h2>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Date</p>
                        <p className="font-bold flex items-center gap-1.5 text-gray-800">
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Time</p>
                        <p className="font-bold flex items-center gap-1.5 text-gray-800">
                            {event.time}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Location</p>
                        <p className="font-bold flex items-center gap-1.5 text-gray-800 truncate">
                            {event.venue}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Attendee</p>
                        <p className="font-bold text-gray-800 truncate">{user.fullName}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Access Code</p>
                        <p className="font-mono font-bold text-gray-800 tracking-wider">{registration.ticketCode.slice(-6)}</p>
                    </div>
                </div>
            </div>

            {/* Divider with Cutouts */}
            <div className="relative w-full h-8 flex items-center justify-center my-2">
                {/* Left Cutout */}
                <div className="absolute left-0 w-6 h-12 bg-[#F8F9FA] rounded-r-full -translate-x-1/2"></div>
                {/* Right Cutout */}
                <div className="absolute right-0 w-6 h-12 bg-[#F8F9FA] rounded-l-full translate-x-1/2"></div>
                {/* Dashed Line */}
                <div className="w-[80%] border-t-2 border-dashed border-gray-200"></div>
            </div>

            {/* Bottom Section: Barcode */}
            <div className="p-6 pt-0 text-center">
                {/* Mock Barcode */}
                <div className="h-16 flex items-end justify-center gap-[2px] opacity-80 mb-2">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                height: `${Math.max(40, Math.random() * 100)}%`,
                                width: Math.random() > 0.5 ? '4px' : '2px',
                                backgroundColor: 'black'
                            }}
                        />
                    ))}
                </div>
                <p className="text-[10px] text-gray-400 font-mono tracking-[0.2em]">{registration.ticketCode}</p>
            </div>

        </div>
    );
};

export default DigitalTicketCard;
