import React from "react";

const CardContainer = ({ children }) => {
    return (
        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-10 justify-items-center">
            {children}
        </div>
    );
};

export default CardContainer;
