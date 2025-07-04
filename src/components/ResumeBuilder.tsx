import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import ResumePreview, { ResumeData } from "./ResumePreview";

interface ResumeBuilderProps {
  onBack: () => void;
}

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBack }) => {
  const [selectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: "", email: "", phone: "", address: "" },
    education: [{ id: "1", school: "", degree: "", year: "" }],
    experience: [{ id: "1", company: "", position: "", duration: "", description: "" }],
    skills: [""],
    summary: "",
  });

  const generateAISummary = async () => {
    try {
      const describe = `
        ${resumeData.personalInfo.name} has experience in: ${resumeData.experience
          .map((e) => `${e.position} at ${e.company}`)
          .join(", ")}.
        Education includes: ${resumeData.education
          .map((e) => `${e.degree} from ${e.school}`)
          .join(", ")}.
        Skills: ${resumeData.skills.join(", ")}.
      `;

      const response = await fetch("https://5736955a-4256-49d5-8849-e7233097d0e9.us-east-1.cloud.genez.io/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ describe }),
      });

      const data = await response.json();
      setResumeData((prev) => ({ ...prev, summary: data.summary || prev.summary }));
      alert("AI Summary Generated");
    } catch (err) {
      alert("AI summary generation failed. Using fallback.");
      const fallback = "Experienced professional with proven success in various roles.";
      setResumeData((prev) => ({ ...prev, summary: fallback }));
    }
  };

  const handleSaveToAPI = async () => {
    try {
      const response = await fetch("https://exife5tk9h.execute-api.ap-south-1.amazonaws.com/prod/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error("API call failed");
      alert("Resume saved to DynamoDB successfully!");
    } catch (error) {
      console.error("Save to API failed:", error);
      alert("Failed to save resume. Please try again.");
    }
  };

  const handleGeneratePDF = async () => {
    try {
      alert("Generating PDF...");
      const resumeElement = document.getElementById("resume-preview");
      if (!resumeElement) return alert("Resume preview not found.");

      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.name || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="ghost">
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSaveToAPI}>Save Resume</Button>
          <Button onClick={handleGeneratePDF} className="bg-blue-600 text-white hover:bg-blue-700">
            <Download className="mr-2" /> Generate PDF
          </Button>
        </div>
      </div>

      <div id="resume-preview">
        <ResumePreview data={resumeData} template={selectedTemplate} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
