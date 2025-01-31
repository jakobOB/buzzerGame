import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT= 3000

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"],
    },
});

let buzzOrder = [];
let teams = {};

io.on("connection", (socket) => {
    // Handle team joining
    socket.on("join-team", (teamName) => {
        socket.teamName = teamName;
        teams[teamName] = teams[teamName] || 0;
        io.emit("update-teams", teams);
        console.log(`${teamName} joined`);
    });

    // Handle buzz
    socket.on("buzz", () => {
        if (socket.teamName && !buzzOrder.includes(socket.teamName)) {
            buzzOrder.push(socket.teamName);
            io.emit("update-buzzes", buzzOrder);
        }
    });

    // Reset buzzes
    socket.on("reset-buzzer", () => {
        buzzOrder = [];
        io.emit("reset-buzzer");
    });

    // Handle correct answer
    socket.on("correct-answer", () => {
        if (buzzOrder.length > 0) {
            const team = buzzOrder.shift(); // Get the first team in order
            teams[team] += 1; // Add 1 point
            io.emit("update-teams", teams); // Update scores
            io.emit("reset-buzzer")
        }
    });

    // Handle incorrect answer
    socket.on("incorrect-answer", () => {
        if (buzzOrder.length > 0) {
            const team = buzzOrder.shift(); // Get the first team in order
            teams[team] -= 1; // Deduct 1 point
            buzzOrder.slice(0)
            io.emit("update-buzzes", buzzOrder); // Update remaining buzz order
            io.emit("update-teams", teams); // Update scores
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.teamName);
        delete teams[socket.teamName];
        io.emit("update-teams", teams);
    });

    // Handle team reset
    socket.on("reset-teams", () => {
        console.log("Teams reset");
        teams = {};
        io.emit("update-teams", teams);
        io.emit("reset-teams");
    });
});

server.listen(PORT, "0.0.0.0",() => {
    console.log("Server is running on http://0.0.0.0:", PORT);
});


