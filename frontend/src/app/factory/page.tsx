"use client";

import FactoryCard from "@/components/FactoryCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";

interface FactoryData {
  line: string;
  shift: string;
  operator: string;
  productionCount: number;
  status: "active" | "fault";
}

export default function FactoryPage() {
  const [data, setData] = useState<FactoryData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<FactoryData>("http://localhost:5004/api/factory-data");
        setData(res.data);
      } catch (err) {
        console.error("Factory verisi alınamadı", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <> 
    <Navbar />
    <div className="py-100 px-4">
      {data && (
        <FactoryCard

          line={data.line}
          shift={data.shift}
          operator={data.operator}
          productionCount={data.productionCount}
          status={data.status}
        />
      )}
    </div>
    </>
  );
}
