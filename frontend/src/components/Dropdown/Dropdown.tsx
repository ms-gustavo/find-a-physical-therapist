"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface DropdownProps {
  label: string;
  options: { label: string; href: string }[];
}

const Dropdown = ({ label, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-light-text dark:text-dark-text mx-4"
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute bg-white text-black right-0 mt-2 py-2 w-48 rounded shadow-lg z-50">
          {options.map((option, index) => (
            <div key={index}>
              <Link
                href={option.href}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                {option.label}
              </Link>
              {index < options.length - 1 && <hr className="my-1" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
