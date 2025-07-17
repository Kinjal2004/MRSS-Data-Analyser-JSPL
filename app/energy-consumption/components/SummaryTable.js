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
    XLSX.utils.book_append_sheet(workbook, worksheet, "MRSS Data");

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "MRSS_Energy_Meter_Reading.xlsx");
  };
  return (
    <div className="h-[400px] overflow-y-scroll border rounded-md shadow">
      <table className="min-w-full border-collapse" id="data-table">
        {/* Header */}
        <thead>
          <tr className="text-sm font-bold">
            <th
              className="px-6 py-3 text-center text-lg font-semibold tracking-wide uppercase"
              colSpan="21"
            >
              <div className="flex justify-center items-center gap-4">
                <span>MRSS ENERGY METER READING (IN KWH)</span>
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
            <th className="px-6 py-3 text-center" colSpan="7"></th>
            <th className="px-6 py-3 text-center bg-gray-300" colSpan="7">
              33kV SWITCHBOARD READING FROM PANEL
            </th>
            <th className="px-6 py-3 text-center" colSpan="7"></th>
          </tr>

          {/* Column Headings Row */}
          <tr className="text-sm font-bold bg-gray-200">
            <th className="px-4 py-2 text-center">Sl No.</th>
            <th className="px-4 py-2 text-center">DATE</th>
            <th className="px-4 py-2 text-center">TRAFO-1</th>
            <th className="px-4 py-2 text-center">TRAFO-2</th>
            <th className="px-4 py-2 text-center">TRAFO-3</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">CWH*1.2</th>
            <th className="px-4 py-2 text-center">PP1</th>
            <th className="px-4 py-2 text-center">PP2</th>
            <th className="px-4 py-2 text-center">HT/LT-1</th>
            <th className="px-4 py-2 text-center">HT/LT-2</th>
            <th className="px-4 py-2 text-center">STATION</th>
            <th className="px-4 py-2 text-center">PGP</th>
            <th className="px-4 py-2 text-center">TOTAL</th>
            <th className="px-4 py-2 text-center">
              POWER <br /> BOOK
              <br />
              PP1
            </th>
            <th className="px-4 py-2 text-center">
              POWER <br /> BOOK
              <br />
              PP2
            </th>
            <th className="px-4 py-2 text-center">
              IOLC <br />&<br />
              OTHERS
            </th>
            <th className="px-4 py-2 text-center">PF</th>
            <th className="px-4 py-2 text-center">
              12:00 <br />
              TO
              <br />
              12:00
            </th>
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
                    {summary?.transformerData
                      ?.find((item) => item.name === "TRAFO-1")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.transformerData
                      ?.find((item) => item.name === "TRAFO-2")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.transformerData
                      ?.find((item) => item.name === "TRAFO-3")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.transformerUsage.toFixed(2) ??
                      "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.nesco?.nescoTotalReading.toFixed(2) ??
                      "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp1Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp2Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.otherData
                      ?.find((item) => item.name === "HT/LT-1")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.otherData
                      ?.find((item) => item.name === "HT/LT-2")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.otherData
                      ?.find((item) => item.name === "STATION")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.otherData
                      ?.find((item) => item.name === "PGP")
                      ?.total?.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.totalUsage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp1Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.pp2Usage.toFixed(2) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.iolcUsage +
                      summary?.calculated?.usage?.pgpUsage ?? "—"}
                  </td>
                  <td
                    className={`px-4 py-2 text-center ${
                      summary.powerFactor > 1 || summary.powerFactor < 0
                        ? "text-red-500 font-semibold"
                        : ""
                    }`}
                  >
                    {summary.calculated?.nesco?.pf.toFixed(4) ?? "—"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {summary?.calculated?.usage?.transformer12Usage.toFixed(
                      2
                    ) ?? "—"}
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
