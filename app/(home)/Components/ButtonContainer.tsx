"use client";
import React from "react";
import useCategoryState from "@/hooks/useCategoryState";
import { useMemo } from "react";

const ButtonContainer = () => {
    const { category, setCategory } = useCategoryState();

    const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        setCategory(e.currentTarget.textContent);
    };
    const genres = useMemo(() => ["hiphop", "trot", "band"], []);
    return (
        <div className="w-full border  h-[50px] flex gap-8 justify-center">
            {genres.map((genre) => {
                return (
                    <button
                        className="w-[100px] h-full rounded-md bg-blue-400 hover:bg-blue-700 active:bg-blue-900 "
                        key={genre}
                        onClick={onClickButton}
                        value={genre}
                    >
                        {genre}
                    </button>
                );
            })}
        </div>
    );
};

export default ButtonContainer;
