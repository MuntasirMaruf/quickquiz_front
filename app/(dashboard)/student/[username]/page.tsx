"use client";

import { use } from "react";

import React from 'react'

const page = ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = use(params)
    return (
        <div>
            <h3>Hello {username}</h3>
        </div>
    )
}

export default page
