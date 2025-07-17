'use client';

import React from 'react';
import NavbarLink from './NavbarLink';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-gray-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="h-5 w-5"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              <li><NavbarLink href="/upload">Upload</NavbarLink></li>
              <li><NavbarLink href="/energy-consumption">Energy Consumption</NavbarLink></li>
              <li><NavbarLink href="/production">Production</NavbarLink></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-xl text-emerald-600">EMS App</Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
            <li><NavbarLink href="/upload">Upload</NavbarLink></li>
            <li><NavbarLink href="/energy-consumption">Energy Consumption</NavbarLink></li>
            <li><NavbarLink href="/production">Production</NavbarLink></li>
          </ul>
        </div>

        {/* No navbar-end content now */}
        <div className="navbar-end" />
      </div>
    </div>
  );
};

export default Navbar;
