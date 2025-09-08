import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            This is Student Page <br /><br />
            <Link href="/student/MMProToy4">Maruf</Link> <br /><br />
            <Link href="/student/Akash">Akash</Link> <br /><br />
        </div>
    )
}

export default page
