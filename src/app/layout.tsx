import type { Metadata } from "next";
import "./globals.css";
import { MqttSensorProvider } from "./MqttSensorProvider";
import MqttLiveSensorwerte from "./MqttLiveSensorwerte";
import MqttFireAlarm from "./MqttFireAlarm";

export const metadata: Metadata = {
  title: "Krabbelwetter | Entdecke den Garten",
  description: "Wetterdaten und kleine Entdeckertipps für den Garten.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de">
      <body>
        <MqttSensorProvider>
          <MqttLiveSensorwerte />
          {children}
          <MqttFireAlarm />
        </MqttSensorProvider>
      </body>
    </html>
  );
}
