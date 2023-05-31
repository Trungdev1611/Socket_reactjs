import axios from "axios";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function App() {
  //khai báo socket - dùng với context cho dễ
  const socket = io("https://dev.stakaapi.winds.vn", {
    auth: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBob25lX251bWJlciI6IjA5NjU3Nzc4ODgiLCJpZCI6MiwiZnVsbF9uYW1lIjoiVHLGsMahbmcgVGjhu4sgSMOyYSIsInJvbGUiOiJhZG1pbiIsImtpb3R2aWV0X2lkIjpudWxsLCJpc19yb290Ijp0cnVlLCJncm91cCI6ImFkbWluIn0sImlhdCI6MTY4NTUwODI2NSwiZXhwIjoxMTY4NTUwODI2NX0.xyJTa6T5DAVmRaM0WLjlB1rN2LPBcNia8vNKkshtpLU"
    }
  });

  useEffect(() => {
    function onConnect() {
      // setIsConnected(true);
      console.log(`da ket noi`);
    }

    function onDisconnect() {
      console.log(`ngat ket noi`);
    }

    function onFooEvent(value) {
      console.log("bắt data");
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    //bắt event ở đây   (khi gọi api hoặc lắng nghe bất kỳ khi event được bắn từ server)
    socket.on("export_excel_event", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      //clear event ở đây
      socket.off("export_excel_event", onFooEvent);
    };
  }, [socket]);

  async function handleClick() {
    //gọi api ở đây, để socket được bắn
  }
  return (
    <div className="App">
      <button onClick={handleClick}>abcdef</button>
    </div>
  );
}
