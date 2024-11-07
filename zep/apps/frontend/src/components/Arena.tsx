import React, { useEffect, useRef } from "react";

const CanvasGame = () => {
  const clientRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const playersRef = useRef<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    try {
      clientRef.current = new WebSocket("ws://localhost:8080");
      setTimeout(() => {}, 5000);
    } catch (err) {
      console.log(err, "err");
    }
  }, []);

  useEffect(() => {
    if (clientRef.current && canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
      clientRef.current.onopen = () => {
        clientRef.current!.send(
          JSON.stringify({
            type: "join",
            payload: {
              spaceId: "my-space",
              user: { id: "user-123" },
            },
          })
        );
      };
      console.log(clientRef.current.OPEN);

      clientRef.current.onmessage = (message) => {
        const data = JSON.parse(JSON.stringify(message.data));
        switch (data.type) {
          case "space-joined":
            handleJoinedSpace(data.payload);
            break;
          case "user-joined":
            handleUserJoined(data.payload);
            break;
          case "movement":
            handleMovement(data.payload);
            break;
          case "user-left":
            handleUserLeft(data.payload);
            break;
        }
      };
    }
  }, [clientRef]);

  const handleJoinedSpace = (payload: {
    spawn: { x: number; y: number };
    users: { id: string }[];
  }) => {
    playersRef.current = {
      "user-123": { x: payload.spawn.x, y: payload.spawn.y },
    };

    payload.users.forEach((user) => {
      playersRef.current[user.id] = { x: 400, y: 300 };
    });

    redrawCanvas();
  };

  const handleUserJoined = (payload: {
    x: number;
    y: number;
    userId: string;
  }) => {
    playersRef.current[payload.userId] = { x: payload.x, y: payload.y };

    redrawCanvas();
  };

  const handleMovement = (payload: {
    x: number;
    y: number;
    userId: string;
  }) => {
    playersRef.current[payload.userId] = { x: payload.x, y: payload.y };

    redrawCanvas();
  };

  const handleUserLeft = (payload: { userId: string }) => {
    delete playersRef.current[payload.userId];

    redrawCanvas();
  };

  const redrawCanvas = () => {
    if (!contextRef.current || !canvasRef.current) return;

    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    for (const [userId, player] of Object.entries(playersRef.current)) {
      contextRef.current.beginPath();
      contextRef.current.arc(player.x, player.y, 10, 0, 2 * Math.PI);
      contextRef.current.fillStyle = userId === "user-123" ? "red" : "blue";
      contextRef.current.fill();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!contextRef.current || !canvasRef.current || !clientRef) return;

    const player = playersRef.current["user-123"];
    switch (event.key) {
      case "ArrowLeft":
        player.x -= 10;
        break;
      case "ArrowRight":
        player.x += 10;
        break;
      case "ArrowUp":
        player.y -= 10;
        break;
      case "ArrowDown":
        player.y += 10;
        break;
    }

    clientRef.current!.send(
      JSON.stringify({
        type: "move",
        payload: {
          x: player.x,
          y: player.y,
        },
      })
    );

    redrawCanvas();
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        width: "800px",
        height: "600px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default CanvasGame;
