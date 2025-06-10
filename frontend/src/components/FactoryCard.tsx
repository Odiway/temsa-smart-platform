import { Card, CardContent } from "@/components/ui/card";

interface Props {
  line: string;
  shift: string;
  operator: string;
  productionCount: number;
  status: "active" | "fault";
}

export default function FactoryCard({ line, shift, operator, productionCount, status }: Props) {
  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">🏭 {line} - Fabrika Paneli</h2>
        <p>👨‍🔧 Operatör: <strong>{operator}</strong></p>
        <p>⏱️ Vardiya: <strong>{shift}</strong></p>
        <p>🔄 Üretim: <strong>{productionCount} araç</strong></p>
        <p>
          🚨 Arıza:{" "}
          <span className={status === "active" ? "text-green-600" : "text-red-600 font-semibold"}>
            {status === "active" ? "Yok (🟢 Aktif)" : "Var (🔴 Arıza Var)"}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}