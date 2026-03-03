let socket = null;

export function initNetwork(){

    // Server URL değiştir
    const SERVER_URL = "ws://localhost:3000";

    socket = new WebSocket(SERVER_URL);

    socket.onopen = ()=>{
        console.log("Network connected");
    };

    socket.onmessage = (event)=>{
        const data = JSON.parse(event.data);

        switch(data.type){

            case "init":
                console.log("Player ID:", data.id);
                break;

            case "player_join":
                console.log("Player joined:", data.id);
                break;

            case "player_leave":
                console.log("Player left:", data.id);
                break;

            case "player_update":
                // TODO: Multiplayer player mesh update
                break;
        }
    };

    socket.onerror = err=>{
        console.error("Network error",err);
    };

}

// Oyuncu pozisyonu server’a gönder
export function sendPlayerUpdate(state){

    if(!socket || socket.readyState !== 1) return;

    socket.send(JSON.stringify({
        type:"update",
        ...state
    }));
}
