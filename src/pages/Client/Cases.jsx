// src/pages/Client/Cases.jsx
import { motion } from "framer-motion";
import { useClient } from "../../context/UserProvider";
import { useEffect, useState } from "react";

export default function ClientCases() {
  const { caseData, fetchCases } = useClient();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchCases();
  }, [caseData?.length]);

  useEffect(() => {
    if (caseData.length > 0) {
      setCases(caseData);
    }
  }, [caseData?.length]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cases</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Case Title</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {cases?.map((c, i) => (
              <tr
                key={c.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{c.title}</td>
                <td
                  className={`p-4 font-semibold ${
                    c.status === "Active" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {c.status}
                </td>
                <td className="p-4">{c.last_update?.split(" ")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
