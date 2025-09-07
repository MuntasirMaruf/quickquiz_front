import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            This is Student Page <br /><br />
            <Link href="/student/Maruf">Maruf</Link> <br /><br />
            <Link href="/student/Akash">Akash</Link> <br /><br />
        </div>
    )
}

export default page
