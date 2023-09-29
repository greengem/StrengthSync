'use client'
import React from "react";
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { useSession, signIn, signOut } from "next-auth/react"
import NextLink from 'next/link'

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: session } = useSession()
    return (
<Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">GYM</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="foreground" href="/">
            Profile
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/history" aria-current="page">
            History
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/routines">
            Routines
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/exercises">
            Exercises
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
            {session ? (
          <Button as={Link} color="primary" href="#" variant="flat" onClick={() => signOut()}>
            Logout
          </Button>
          ) : (
            <Button as={Link} color="primary" href="#" variant="flat" onClick={() => signIn()}>
            Login
          </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
      </NavbarMenu>
    </Navbar>
    )
}
