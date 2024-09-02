"use client";
import axios from "axios";
import PagePadding from "@/components/PagePadding";
import SearchBar from "@/components/SearchBar";
import CardContainer from "./Components/CardContainer";
import Card from "./Components/Card";
import { useState, useEffect } from "react";
import useCategoryState from "@/hooks/useCategoryState";
import { Singer } from "@/types";

export default function Home() {
    const [singersData, setSingerData] = useState<Singer[]>([]);

    const { category, setCategory } = useCategoryState();
    const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

    useEffect(() => {
        // 데이터를 보놀 때 category 값을 보낼 수 있게
        axios
            .get<Singer[]>("/api/singersSearchData", {
                params: { genre: category },
            })
            .then((res) => {
                setSingerData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [category]);
    return (
        <PagePadding>
            <SearchBar></SearchBar>
            <CardContainer>
                {singersData.map((singer) => {
                    return (
                        <Card
                            key={singer.id}
                            id={singer.id}
                            genre={singer.genre}
                        ></Card>
                    );
                })}
            </CardContainer>
        </PagePadding>
    );
}
