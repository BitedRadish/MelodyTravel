import Image from "next/image";
import React from "react";

const Card = ({
    id,
    genre,
    image,
}: {
    id: string;
    genre: string;
    image: undefined | { height: number; url: string };
}) => {
    return (
        <div className="w-[220px] border border-white h-[250px] rounded-lg cursor-pointer overflow-hidden">
            <div className="w-full h-[180px] relative">
                <Image
                    alt={"프로필 없음"}
                    fill
                    className="object-cover "
                    src={image && image.url}
                ></Image>
            </div>
            <section className="flex gap-4">
                <div>{id}</div>
                <div>{genre}</div>
            </section>
        </div>
    );
};

export default Card;
