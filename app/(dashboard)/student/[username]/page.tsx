"use client";

import Link from "next/link";

import React from 'react';

// const page = ({ params }: { params: Promise<{ username: string }> }) => {
//     const { username } = use(params)
//     return (
//         <div>
//             <h3>Hello {username}</h3> <br />
//             <Link href="/student/Maruf/profile">Profile</Link> <br /><br />

//         </div>
//     )
// }

type PageProps = {
    params: Promise<{ username: string }>;
};

const page = ({ params }: PageProps) => {
    const { username } = React.use(params); // unwrap the promise

    return (
        <div>
            <h3>Hello {username}</h3>
            <br />
            <Link href={`/student/${username}/profile`}>Profile</Link>
            <br /><br />
        </div>
    );
};

export default page;
