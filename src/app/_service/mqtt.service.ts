import { Injectable } from '@angular/core';
import * as mqtt from 'mqtt';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  // private mqttClient!: mqtt.MqttClient;

  // constructor() {
  //   // MQTT Broker Configuration
  //   const mqttBroker = "seval.ddns.net";
  //   const mqttPort = 1883;
  //   const mqttUsername = "thanh";
  //   const mqttPassword = "thanhnguyen";
  //   // const mqttTopic = "Device001_RECEIVE";

  //   // Initialize MQTT client
  //   this.mqttClient = mqtt.connect(`mqtt://${mqttBroker}:${mqttPort}`, {
  //     username: mqttUsername, // Optional: If your broker requires authentication
  //     password: mqttPassword, // Optional: If your broker requires authentication
  //   });

  //   // this.mqttClient.on('connect', () => {
  //   //   console.log('Connected to MQTT broker');
  //   //   this.subscribeToTopic(mqttTopic); // Subscribe to your desired topic
  //   // });

  //   this.mqttClient.on('message', (topic, message) => {
  //     // Handle incoming MQTT messages here
  //     console.log(`Received message on topic: ${topic}, message: ${message.toString()}`);
  //   });
  // }

  // subscribeToTopic(topic: string): void {
  //   this.mqttClient.subscribe(topic);
  // }

  // publishMessage(topic: string, message: string): void {
  //   if (this.mqttClient) {
  //     this.mqttClient.publish(topic, message);
  //   }
  // }

  // endConnection(): void {
  //   if (this.mqttClient) {
  //     this.mqttClient.end(); // Disconnect from the MQTT broker
  //   }
  // }
}
