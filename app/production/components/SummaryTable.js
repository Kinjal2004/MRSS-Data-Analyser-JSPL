import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Link from "next/link";

const SummaryTable = ({ data }) => {
  const exportToExcel = () => {
    var table_elt = document.getElementById("data-table");
    console.log(table_elt);
    // Convert table to worksheet
    const worksheet = XLSX.utils.table_to_sheet(table_elt);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Production Data");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "Production_Data.xlsx");
  };
  return (
    <div className="h-[400px] overflow-y-scroll border rounded-md shadow">
      <table className="min-w-full border-collapse" id="data-table">
        {/* Header */}
        <thead>
          <tr className="text-sm font-bold">
            <th
              className="px-6 py-3 text-center text-lg font-semibold tracking-wide uppercase"
              colSpan="18"
            >
              <div className="flex justify-center items-center gap-4">
                <span>DAILY ENERGY CONSUMPTION AS PER PRODUCTION REPORT</span>
                <button
                  onClick={() => exportToExcel()} // attach your export function here
                  className="btn btn-sm border-green-500 hover:bg-green-500 "
                >
                  Export to Excel
                </button>
              </div>
            </th>
          </tr>
          <tr className="text-sm font-bold bg-gray-100">
            <th className="px-6 py-3 text-center" colSpan="2"></th>
            <th
              className="px-6 py-3 text-center bg-gray-300 border border-black"
              colSpan="3"
            >
              ENERGY
            </th>
            <th
              className="px-6 py-3 text-center bg-gray-300 border border-black"
              colSpan="3"
            >
              PRODUCTION
            </th>
            <th
              className="px-6 py-3 text-center bg-gray-300 border border-black"
              colSpan="3"
            >
              SPECFIC ENERGY KWH/TON
            </th>
            <th
              className="px-6 py-3 text-center bg-gray-300 border border-black"
              colSpan="5"
            >
              POWER BOOKED
            </th>
            <th className="px-6 py-3 text-center" colSpan="3"></th>
          </tr>

          {/* Column Headings Row */}
          <tr className="text-sm font-bold bg-gray-200">
            <th className="px-4 py-2 text-center">Sl No.</th>
            <th className="px-4 py-2 text-center">DATE</th>
            <th className="px-4 py-2 text-center">PP1</th>
            <th className="px-4 py-2 text-center">PP2</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">PP1</th>
            <th className="px-4 py-2 text-center">PP2</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">PP1</th>
            <th className="px-4 py-2 text-center">PP2</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">PP1</th>
            <th className="px-4 py-2 text-center">PP2</th>
            <th className="px-4 py-2 text-center">IOLC & OTHERS</th>
            <th className="px-4 py-2 text-center">PGP</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">WT AVG SPECFIC</th>
            <th className="px-4 py-2 text-center">SIGNATURE</th>
            <th className="px-4 py-2 text-center">EDIT</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="text-sm divide-y divide-gray-200">
          {data?.length > 0 ? (
            data.map((entry, index) => {
              const summary = entry || {};
              return (
                <tr key={entry.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">
                    {summary.date || "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp1Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp2Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.plantUsage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.production?.pp1Production.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.production?.pp2Production.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.production?.totalProduction.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.specificConsumption?.specificPP1.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.specificConsumption?.specificPP2.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.specificConsumption?.specificPlant.toFixed(
                      2
                    ) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp1Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp2Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.iolcUsage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pgpUsage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.totalUsage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {(
                      summary?.calculated?.usage?.totalUsage /
                      summary?.calculated?.production?.totalProduction
                    ).toFixed(2) ?? "—"}
                  </td>
                  <td>{summary.name || "—"}</td>
                  <td className="px-4 py-2 text-center">
                    <Link
                      href={{
                        pathname: "/edit-data",
                        query: { id: entry.id }, // Passing entry ID via query
                      }}
                    >
                      <button className="btn btn-xs btn-outline text-orange-500 border-orange-400 hover:bg-orange-100">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={20}
                className="h-[300px] text-center text-lg font-semibold text-gray-500"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
