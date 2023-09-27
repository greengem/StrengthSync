import Link from 'next/link'

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Gym Tracking App</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href='/'>Profile</Link></li>
                    <li><Link href='/history'>History</Link></li>
                    <li><Link href='/exercises'>Exercises</Link></li>
                </ul>
            </div>
        </div>
    )
}

