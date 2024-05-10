"use client"
import React, { useState } from "react";
import AccountProfile from "./AccountProfile";
import Changepass from "./Changepass";

interface Props {
    session: {
        user: {
            name: Object;
            email: string;
            image: string;
        };
    };
    profile_photo: string;
    username: string;
    password: string;
    fullname: string;
    gender: string;
    dob: Date;
    hometown: string;
    email: string;
}

const ChangeInfo = ({
    session,
    profile_photo,
    username,
    password,
    fullname,
    gender,
    dob,
    hometown,
    email,
}: Props) => {
    const [showAccountProfile, setShowAccountProfile] = useState(true);
    const [showChangePass, setShowChangePass] = useState(false);
    const [animateClass, setAnimateClass] = useState("");

    const handleShowAccountProfile = () => {
        setShowAccountProfile(true);
        setShowChangePass(false);
        // setAnimateClass("animate-spin");
    };

    const handleShowChangePass = () => {
        setShowAccountProfile(false);
        setShowChangePass(true);
        // setAnimateClass("animate-spin");
    };

    return (
        <div className="flex flex-col">
            <div className="w-ful flex justify-center">
                <button
                    className={`m-2 bg-indigo-400 px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform `}
                    onClick={handleShowAccountProfile}
                >
                    Account Profile
                </button>
                <button
                    className={`m-2 bg-indigo-400 px-4 py-3 bg-blue-600 rounded-md text-white outline-none focus:ring-4 shadow-lg transform active:scale-75 transition-transform `}
                    onClick={handleShowChangePass}
                >
                    Change Password
                </button>
            </div>

            {showAccountProfile && (
                <div className={`${animateClass}`}>
                    <AccountProfile
                        session={session}
                        profile_photo={profile_photo}
                        username={username}
                        password={password}
                        fullname={fullname}
                        gender={gender}
                        dob={dob}
                        hometown={hometown}
                        email={email}
                    />
                </div>
            )}

            {showChangePass && (
                <div className={`${animateClass}`}>
                    <Changepass session={session} password={password}/>
                </div>
            )}
        </div>
    );
};

export default ChangeInfo;