import React, { use } from "react";
import express from "express";
import { readFileSync } from "fs";
import path from "path";
import http from "http";
import ReactServerDOMClient from "react-server-dom-webpack/client";
import ReactDOMServer from "react-dom/server.node";
import Stream from "stream";

const app = express();

app.use("/public", express.static("build"));

app.use("/", (req, res) => {
  if (req.url.indexOf(".jsx") >= 0) {
    const path = req.url.replace('.jsx', '')
    http.get(`http://localhost:5556${path}`, (resRsc) => {
      resRsc.pipe(res)
    })
  } else {
    const ssrManifest = readFileSync(
      path.resolve(__dirname, "../build/react-ssr-manifest.json"),
      "utf8"
    );
    const ssrModuleMap = JSON.parse(ssrManifest);
    // 获取 rsc 流
    http.get("http://localhost:5556/", (resRsc) => {
      const readable = new Stream.PassThrough();
      let flightResponse = "";

      const flightStream = new Stream.Writable({
        write: (chunk, encoding, next) => {
          flightResponse += chunk;
          next();
        },
      });
      resRsc.pipe(readable);
      resRsc.pipe(flightStream);
      let response;
      function ClientRoot() {
        if (response) return use(response);
        response = ReactServerDOMClient.createFromNodeStream(
          readable,
          ssrModuleMap
        );
        return use(response);
      }

      function Template() {
        return (
          <html>
            <meta charSet="utf-8" />
            <head>
              <title>111</title>
            </head>
            <body>{<ClientRoot />}</body>
          </html>
        );
      }

      const ssrStream = ReactDOMServer.renderToPipeableStream(<Template />, {
        bootstrapScripts: ["/public/main.js"],
        onShellReady: () => {
          ssrStream.pipe(res);
        },
        onAllReady: () => {
          sendReactFlightToClient(flightResponse, res);
        },
      });
    });
  }
});

// 将 React Flight 以一个 dom script 片段的形式发送给客户端
function sendReactFlightToClient(flight, res) {
  res.write(`
    <script>
    if (window.clientFizzReactFlight) {
      clientFizzReactFlight(${JSON.stringify(flight)})
    } else {
      window.__initFlight = ${JSON.stringify(flight)}
    }
    </script>
    `);
}

app.listen(5555);
