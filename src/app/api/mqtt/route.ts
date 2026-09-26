import mqtt, { type MqttClient } from "mqtt";

export const runtime = "nodejs";

const topicFilters = ["Garten/#", "garten/status/#"];
const encoder = new TextEncoder();

type Reading = {
  topic: string;
  payload: string;
  receivedAt: string;
};

type Subscriber = ReadableStreamDefaultController<Uint8Array>;

const subscribers = new Set<Subscriber>();
const latestReadings = new Map<string, Reading>();
let client: MqttClient | undefined;
let connectionStatus: { connected: boolean; error?: string } = {
  connected: false,
};

function send(subscriber: Subscriber, event: string, data: unknown) {
  try {
    subscriber.enqueue(
      encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
    );
  } catch {
    subscribers.delete(subscriber);
  }
}

function broadcast(event: string, data: unknown) {
  for (const subscriber of subscribers) {
    send(subscriber, event, data);
  }
}

function connectToMqtt() {
  if (client) return;

  client = mqtt.connect(process.env.MQTT_URL ?? "mqtt://172.16.1.242:1883", {
    username: process.env.MQTT_USERNAME ?? "admin",
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 2_000,
    connectTimeout: 10_000,
  });

  client.on("connect", () => {
    connectionStatus = { connected: true };
    broadcast("status", connectionStatus);
    client?.subscribe(topicFilters, (error) => {
      if (error) {
        connectionStatus = { connected: false, error: error.message };
        broadcast("status", connectionStatus);
      }
    });
  });

  client.on("message", (topic, payload) => {
    const reading = {
      topic,
      payload: payload.toString(),
      receivedAt: new Date().toISOString(),
    };
    latestReadings.set(topic, reading);
    broadcast("reading", reading);
  });

  client.on("error", (error) => {
    connectionStatus = { connected: false, error: error.message };
    broadcast("status", connectionStatus);
  });

  client.on("close", () => {
    connectionStatus = { connected: false };
    broadcast("status", connectionStatus);
  });
}

export async function GET(request: Request) {
  let subscriber: Subscriber | undefined;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      subscriber = controller;
      subscribers.add(controller);
      send(controller, "status", connectionStatus);
      for (const reading of latestReadings.values()) {
        send(controller, "reading", reading);
      }
      connectToMqtt();

      request.signal.addEventListener(
        "abort",
        () => {
          if (subscriber) subscribers.delete(subscriber);
          controller.close();
        },
        { once: true },
      );
    },
    cancel() {
      if (subscriber) subscribers.delete(subscriber);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}