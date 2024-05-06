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

    const handleShowAccountProfile = () => {
        setShowAccountProfile(true);
        setShowChangePass(false);
    };

    const handleShowChangePass = () => {
        setShowAccountProfile(false);
        setShowChangePass(true);
    };

    return (
        <div className="flex flex-col">
            <div>
                <button onClick={handleShowAccountProfile}>Account Profile</button>
                <button onClick={handleShowChangePass}>Change Password</button>
            </div>

            {showAccountProfile && (
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
            )}

            {showChangePass && (
                <Changepass session={session} password={password} />
            )}
        </div>
    );
};

export default ChangeInfo;