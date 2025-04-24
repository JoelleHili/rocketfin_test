"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeFilled as HomeIcon, Search as SearchIcon } from "@mui/icons-material"

export default function Sidebar() {
    const pathname = usePathname();

    const routes = [
        { name: 'Home', path: '/', icon: <HomeIcon size={24} /> },
        { name: 'Search', path: '/search', icon: <SearchIcon size={24} /> },

    ];

    return (
        <div className="sidebar">
            <nav>
                <ul className="sidebar__list">
                    {routes.map((route) => (
                        <li key={route.path}>
                            <Link
                                href={route.path}
                            >
                                <div className="sidebar__item">
                                    {route.icon}
                                    <span>{route.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}