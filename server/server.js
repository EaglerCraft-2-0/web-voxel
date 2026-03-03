import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: 3000 });

console.log("Server running on port", 3000);

let players = new Map();
let nextId = 1;

const WORLD_SEED = 12345;

wss.on("connection", (ws) => {
    const id = nextId++;
    players.set(ws, {
        id,
        x: 0,
        y: 50,
        z: 0,
        yaw: 0,
        pitch: 0
    });

    // Yeni oyuncuya kimlik ve seed gönder
    ws.send(JSON.stringify({
        type: "init",
        id,
        seed: 12345
    }));

    broadcast({
        type: "player_join",
        id
    });

    ws.on("message", (message) => {
        try {
            const data = JSON.parse(message);

            if (data.type === "update") {
                const player = players.get(ws);
                if (!player) return;

                // Server-authoritative update
                player.x = data.x;
                player.y = data.y;
                player.z = data.z;
                player.yaw = data.yaw;
                player.pitch = data.pitch;

                broadcast({
                    type: "player_update",
                    id: player.id,
                    x: player.x,
                    y: player.y,
                    z: player.z,
                    yaw: player.yaw,
                    pitch: player.pitch
                }, ws);
            }

        } catch (err) {
            console.error("Invalid message", err);
        }
    });

    ws.on("close", () => {
        const player = players.get(ws);
        if (!player) return;

        broadcast({
            type: "player_leave",
            id: player.id
        });

        players.delete(ws);
    });
});

function broadcast(data, exclude = null) {
    const msg = JSON.stringify(data);
    for (const client of players.keys()) {
        if (client !== exclude && client.readyState === 1) {
            client.send(msg);
        }
    }
}
