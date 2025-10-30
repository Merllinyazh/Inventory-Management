import React, { useEffect, useState, useRef } from "react";
import { getReport } from "./api";

export default function Report() {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const reportRef = useRef();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await getReport();
      const data = res?.data || [];

     
      const grouped = data.reduce((acc, row) => {
        if (!acc[row.warehouse]) acc[row.warehouse] = [];
        acc[row.warehouse].push(row);
        return acc;
      }, {});

      setGroupedData(grouped);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("Failed to load report data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = reportRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Product Balance Report</title>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              margin: 40px;
              color: #2a0f23;
              background: #f8f8f8;
            }
            h1 {
              text-align: center;
              color: #4a1f3c;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              background: white;
            }
            th, td {
              border: 1px solid #dcdcdc;
              padding: 10px;
              text-align: center;
              font-size: 15px;
            }
            th {
              background-color: #4a1f3c;
              color: #f8f8f8;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Product Balance Report</h1>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (loading) return <div className="p-6 text-center">Loading report...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#4a1f3c] tracking-wide">
            Balance Report
          </h1>
          <button
            onClick={handlePrint}
            className="bg-[#653f52] hover:bg-[#4a1f3c] text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200 hover:scale-105"
          >
             Print Report
          </button>
        </div>

        {/* Report Table */}
        <div ref={reportRef} className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="min-w-full text-sm bg-white rounded-xl border border-gray-400">
            <thead className="bg-gradient-to-r from-[#643c50] to-[#7a5270] text-white">
              <tr>
                <th className="p-3 text-center font-semibold w-1/3 border-r border-gray-300">
                  Warehouse
                </th>
                <th className="p-3 text-center font-semibold w-1/3 border-r border-gray-300">
                  Products
                </th>
                <th className="p-3 text-center font-semibold w-1/3">
                  Quantities
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedData).length > 0 ? (
                Object.entries(groupedData).map(([warehouse, items], index) => (
                  <tr
                    key={warehouse}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-purple-50 transition-all border-b border-gray-400`}
                  >
                    {/* Warehouse */}
                    <td className="p-4 border-r border-gray-300 font-medium text-[#4a1f3c] align-top">
                      {warehouse}
                    </td>

                    {/* Products */}
                    <td className="p-4 border-r border-gray-300 text-gray-700 align-top">
                      {items.map((i, idx) => (
                        <div
                          key={idx}
                          className="py-1 border-b last:border-b-0 border-gray-200"
                        >
                          {i.product_name}
                        </div>
                      ))}
                    </td>

                    {/* Quantities */}
                    <td className="p-4 text-gray-700 align-top">
                      {items.map((i, idx) => (
                        <div
                          key={idx}
                          className="py-1 border-b last:border-b-0 border-gray-200"
                        >
                          {i.qty}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-gray-500 py-6 font-medium"
                  >
                    No report data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
