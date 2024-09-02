import React from "react";

const Card = ({ id, genre }: { id: string; genre: string }) => {
    return (
        <div className="w-[250px] border border-white h-[250px]">
            <div>{id}</div>
            <div>{genre}</div>
        </div>
    );
};

export default Card;
