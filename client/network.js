let socket;
let playerId = null;

export function initNetwork() {
    socket = new WebSocket("ws://localhost:3000");

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "init") {
            playerId = data.id;
            console.log("Connected as player", playerId);
        }

        if (data.type === "player_update") {
            // Burada diğer oyuncuların meshlerini güncelleyeceğiz
        }

        if (data.type === "player_join") {
            console.log("Player joined:", data.id);
        }

        if (data.type === "player_leave") {
            console.log("Player left:", data.id);
        }
    };

    // Her frame update göndermek için:
    setInterval(() => {
        if (!socket || socket.readyState !== 1) return;

        // Kamera bilgilerini buraya bağlayacağız
        socket.send(JSON.stringify({
            type: "update",
            x: window.playerX || 0,
            y: window.playerY || 50,
            z: window.playerZ || 0,
            yaw: window.playerYaw || 0,
            pitch: window.playerPitch || 0
        }));
    }, 50);
}
