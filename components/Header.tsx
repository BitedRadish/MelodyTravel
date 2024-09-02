"use client";
import { useRouter } from "next/navigation";
import React from "react";

// Logo랑 밑으로 드래그 시 searchbar가 헤더에 적용
const Header = () => {
    const { push } = useRouter();
    return (
        <header className="w-full bg-black h-[4rem] sticky overflow-y-auto">
            <div
                className="text-white h-full flex items-center text-[2rem] pl-[4rem] cursor-pointer"
                onClick={() => {
                    push("/");
                }}
            >
                MelodyTravel
            </div>
        </header>
    );
};

export default Header;
