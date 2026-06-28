import {WebSocketServer} from "ws" ;
import {client} from "@repo/db/client" ;

const server = new WebSocketServer({
	port : 3001
}) ;

server.on("connection", async (socket) => {
    try {
        const user = await client.user.create({
            data: {
                username: Math.random().toString(),
                password: Math.random().toString()
            }
        });

        console.log("Created user:", user.id);

        socket.send("Connected");
    } catch (err) {
        console.error("Failed to create user:", err);
        socket.close();
    }
});