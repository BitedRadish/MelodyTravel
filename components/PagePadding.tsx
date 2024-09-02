import React from "react";

const PagePadding = ({ children }: { children: React.ReactNode }) => {
    return <div className="mx-[4rem] border border-white">{children}</div>;
};

export default PagePadding;
