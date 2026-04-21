import express from "express";
import compression from "compression";
import morgan from "morgan";
import { createRequestHandler } from "@react-router/express";
import { networkInterfaces } from "os";

const app = express();

// Доверять прокси (важно для корректного IP и протокола)
app.set("trust proxy", true);

// Логирование запросов
app.use(morgan("tiny"));
// Сжатие ответов
app.use(compression());

// Раздача статических файлов клиентской сборки с кешированием
app.use(express.static("build/client", { maxAge: "1y" }));

// Обработчик React Router
app.all(
  "*",
  createRequestHandler({
    build: () => import("./build/server/index.js"),
    mode: process.env.NODE_ENV,
    getLoadContext(req) {
      // Передаём объект запроса, чтобы сессия могла читать куки и заголовки
      return { req };
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  const ip = getLocalIP();
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📱 Network: http://${ip}:${port}`);
});

// Вспомогательная функция для получения локального IPv4
function getLocalIP() {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}