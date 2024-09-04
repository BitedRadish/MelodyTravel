"use client";
import axios from "axios";
import PagePadding from "@/components/PagePadding";
import SearchBar from "@/components/SearchBar";
import CardContainer from "./Components/CardContainer";
import Card from "./Components/Card";
import { useState, useEffect, useMemo } from "react";
import useCategoryState from "@/hooks/useCategoryState";
import { Singer } from "@/types";
import ButtonContainer from "./Components/ButtonContainer";

interface ImagesProps {
    height: number;
    url: string;
}

export default function Home() {
    const [singersData, setSingerData] = useState<Singer[]>([]);
    const [images, setImages] = useState<(undefined | ImagesProps)[]>([]);

    const { category, setCategory } = useCategoryState();
    const SPOTIFY_KEY = process.env.NEXT_PUBLIC_SPOTIFY_API_KEY;

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
                // console.error("Error fetching data:", error);
            });
    }, [category]);

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const res = await axios.get("/api/getAccessToken");
                const token = res.data.accessToken;
                window.localStorage.setItem("token", token);
            } catch (error) {
                console.error("Error fetching access token:", error);
            }
        };

        fetchAccessToken();
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const token = window.localStorage.getItem("token");
                if (!token) return;

                // 모든 비동기 요청을 병렬로 수행
                const imageRequests = singersData.map(async (singer) => {
                    const res = await axios.get(
                        `https://api.spotify.com/v1/search?q=${singer.id}&type=artist&limit=1`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    return res.data.artists.items[0]?.images[1];
                });

                // 모든 요청이 완료된 후 이미지 상태 업데이트
                const fetchedImages = await Promise.all(imageRequests);
                setImages(fetchedImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [singersData]);
    return (
        <PagePadding>
            <SearchBar></SearchBar>
            <ButtonContainer></ButtonContainer>
            <CardContainer>
                {singersData.map((singer, idx) => {
                    return (
                        <Card
                            key={singer.id}
                            id={singer.id}
                            image={images[idx]}
                            genre={singer.genre}
                        ></Card>
                    );
                })}
            </CardContainer>
        </PagePadding>
    );
}
