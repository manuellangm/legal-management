// src/pages/Client/Documents.jsx
import { motion } from "framer-motion";

export default function ClientDocuments() {
  const mockDocuments = [
    {
      id: 1,
      name: "Divorce Agreement.pdf",
      type: "PDF",
      date: "2025-09-10",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: 2,
      name: "Property Dispute.docx",
      type: "Word",
      date: "2025-08-20",
      url: "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.docx",
    },
    {
      id: 3,
      name: "Contract Review.pdf",
      type: "PDF",
      date: "2025-09-15",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const handleView = (url) => {
    window.open(url, "_blank"); // Open the document in a new tab
  };

  const handleDownload = (url, name) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Documents</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto"
      >
        <table className="min-w-full bg-gray-800 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="p-4">Document Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date Uploaded</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDocuments.map((doc, i) => (
              <tr
                key={doc.id}
                className={`border-b border-gray-700 ${
                  i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"
                }`}
              >
                <td className="p-4">{doc.name}</td>
                <td className="p-4">{doc.type}</td>
                <td className="p-4">{doc.date}</td>
                <td className="p-4 space-x-2">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                    onClick={() => handleView(doc.url)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                    onClick={() => handleDownload(doc.url, doc.name)}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
