'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useSession, signIn, signOut } from "next-auth/react"
import NextLink from 'next/link'
import { Avatar } from "@nextui-org/avatar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession();

    // Extract user's name, email, and image from the session
    const userName = session?.user?.name || "Unknown User";
    const userEmail = session?.user?.email || "Unknown Email";
    const userImage = session?.user?.image || "https://i.pravatar.cc/150";

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">GYMAPP</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive>
                    <Link as={NextLink} color="foreground" href="/">
                        Profile
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link as={NextLink} color="foreground" href="/history" aria-current="page">
                        History
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link as={NextLink} color="foreground" href="/routines">
                        Routines
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link as={NextLink} color="foreground" href="/exercises">
                        Exercises
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    {session ? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name={userName}
                                    size="sm"
                                    src={userImage}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{userEmail}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">My Settings</DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button as={Link} color="primary" href="#" variant="flat" onClick={() => signIn()}>
                            Login
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link as={NextLink} className="w-full" href="/" size="lg">Profile</Link>
                    <Link as={NextLink} className="w-full" href="/history" size="lg">History</Link>
                    <Link as={NextLink} className="w-full" href="/routines" size="lg">Routines</Link>
                    <Link as={NextLink} className="w-full" href="/exercises" size="lg">Exercises</Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}
