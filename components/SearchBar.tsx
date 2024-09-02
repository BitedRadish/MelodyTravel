"use client";

import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const SearchBar = () => {
    const [input, setInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };
    return (
        <section className="mt-[1rem] w-full h-[100px] border border-blue flex items-center justify-center">
            <form
                // onSubmit={handleSubmit}
                className="w-full h-full flex items-center justify-center"
            >
                <div className="relative w-[80%] h-[70%]">
                    <input
                        placeholder="장르를 입력하세요"
                        className="w-full h-full border border-red-50 rounded-full px-4"
                        type="text"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
                    >
                        <CiSearch size={30} />
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SearchBar;
