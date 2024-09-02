import React from "react";

interface ListPageProps {
    params: {
        genre: string;
    };
}

const page = (props: ListPageProps) => {
    return <div>{`list ${props.params.genre}`}</div>;
};

export default page;
