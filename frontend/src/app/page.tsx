"use client"; // Sadece App Router kullanıyorsan ekle

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";

interface VehicleData {
  speed: number;
  engine_temp: number;
  fuel_level: number;
  location: {
    lat: number;
    lon: number;
  };
}

const Home = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<VehicleData>("http://localhost:5001/api/vehicle-data");
        const now = new Date().toLocaleTimeString();
        setData(prev => [...prev.slice(-10), { ...res.data, time: now }]);
      } catch (err) {
        console.error("Veri çekilemedi", err);
      }
    };

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Live Vehicle Dashboard</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 140]} />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="speed" stroke="#8884d8" name="Speed (km/h)" />
          <Line type="monotone" dataKey="engine_temp" stroke="#82ca9d" name="Engine Temp (°C)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Home;
