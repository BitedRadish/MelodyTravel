import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { Singer } from "@/types/index";
import { RowDataPacket } from "mysql2";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
};
console.log(dbConfig);

// GET 요청을 처리하는 함수
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const genre = searchParams.get("genre");

    if (!genre || typeof genre !== "string") {
        return NextResponse.json(
            { error: "Invalid genre parameter" },
            { status: 400 }
        );
    }

    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log(genre);

        const [rows] = await connection.execute<Singer[] & RowDataPacket[]>(
            `SELECT * FROM singers WHERE genre = ?`,
            [genre]
        );

        await connection.end();

        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
