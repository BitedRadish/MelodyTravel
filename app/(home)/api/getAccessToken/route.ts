// app/api/getAccessToken/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = "https://accounts.spotify.com/api/token";
const authParam = {
    grant_type: "client_credentials",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET_ID,
};

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // 서버에서 Spotify API 호출하여 토큰 받아오기
        const response = await axios.post(
            BASE_URL,
            new URLSearchParams(authParam).toString(),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const accessToken = response.data.access_token;
        return NextResponse.json({ accessToken }, { status: 200 });
    } catch (error) {
        console.error("Error fetching access token:", error);
    }
}
