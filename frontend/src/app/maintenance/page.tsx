"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";

interface MaintenanceData {
  vehicle_id: string;
  speed: number;
  engine_temp: number;
  fuel_level: number;
  maintenance_required: boolean;
}

const MaintenancePage = () => {
  const [vehicles, setVehicles] = useState<MaintenanceData[]>([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const res = await axios.get<MaintenanceData[]>("http://localhost:5003/api/maintenance-data");
        setVehicles(res.data);
      } catch (err) {
        console.error("Bakım verisi çekilemedi", err);
      }
    };

    fetchMaintenanceData();
    const interval = setInterval(fetchMaintenanceData, 5000); // 5 saniyede bir yenile
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">🧠 Tahmini Bakım Paneli</h1>

        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="py-2 px-4">Araç ID</th>
              <th className="py-2 px-4">Hız (km/h)</th>
              <th className="py-2 px-4">Motor Sıcaklığı (°C)</th>
              <th className="py-2 px-4">Yakıt Seviyesi (%)</th>
              <th className="py-2 px-4">Uyarı</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.vehicle_id} className="text-center border-b">
                <td className="py-2 px-4">{vehicle.vehicle_id}</td>
                <td className="py-2 px-4">{vehicle.speed}</td>
                <td className="py-2 px-4">{vehicle.engine_temp}</td>
                <td className="py-2 px-4">{vehicle.fuel_level}</td>
                <td className="py-2 px-4">
                  {vehicle.maintenance_required ? (
                    <span className="text-red-600 font-semibold">Bakım Gerekli</span>
                  ) : (
                    <span className="text-green-600">Sorun Yok</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MaintenancePage;
