import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  summary: string;
}

interface ResumePreviewProps {
  data: ResumeData;
  template: string;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold text-blue-600 mb-3 border-b-2 border-blue-600 pb-1">
      {title}
    </h2>
    {children}
  </div>
);

// --- Modern Template ---
const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, education, experience, skills, summary } = data;

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg min-h-[800px]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.name || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.address && <span>{personalInfo.address}</span>}
        </div>
      </div>

      {summary && (
        <Section title="PROFESSIONAL SUMMARY">
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </Section>
      )}

      {experience.some((e) => e.company || e.position) && (
        <Section title="WORK EXPERIENCE">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                </div>
                <span className="text-gray-600 text-sm">{exp.duration}</span>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm">{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {education.some((e) => e.school || e.degree) && (
        <Section title="EDUCATION">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.school}</p>
              </div>
              <span className="text-gray-600 text-sm">{edu.year}</span>
            </div>
          ))}
        </Section>
      )}

      {skills.some((skill) => skill.trim()) && (
        <Section title="SKILLS">
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((s) => s.trim())
              .map((s, i) => (
                <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-800">
                  {s}
                </Badge>
              ))}
          </div>
        </Section>
      )}
    </div>
  );
};

// --- Creative Template ---
const CreativeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg rounded-lg min-h-[800px]">
    <div className="text-center mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        {data.personalInfo.name || "Your Name"}
      </h1>
      <div className="flex flex-wrap justify-center gap-4 text-gray-600">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
      </div>
    </div>

    {data.summary && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">✨ ABOUT ME</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">🚀 EXPERIENCE</h2>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="border-l-4 border-purple-300 pl-4">
              <div className="flex justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                </div>
                <Badge variant="outline" className="text-purple-600 border-purple-300">
                  {exp.duration}
                </Badge>
              </div>
              {exp.description && (
                <p className="text-gray-700 text-sm">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">🎓 EDUCATION</h2>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.school}</p>
              </div>
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                {edu.year}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.skills.length > 0 && (
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold text-purple-600 mb-3">💎 SKILLS</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills
            .filter((s) => s.trim())
            .map((s, i) => (
              <Badge
                key={i}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
              >
                {s}
              </Badge>
            ))}
        </div>
      </div>
    )}
  </div>
);

// --- Executive Template ---
const ExecutiveTemplate: React.FC<{ data: ResumeData }> = ({ data }) => (
  <div className="bg-white p-8 shadow-lg rounded-lg min-h-[800px] border-t-4 border-gray-900">
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
        {data.personalInfo.name || "YOUR NAME"}
      </h1>
      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
        {data.personalInfo.email && <div>Email: {data.personalInfo.email}</div>}
        {data.personalInfo.phone && <div>Phone: {data.personalInfo.phone}</div>}
        {data.personalInfo.address && (
          <div className="col-span-2">Address: {data.personalInfo.address}</div>
        )}
      </div>
    </div>

    <Separator className="mb-8" />

    {data.summary && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Executive Summary
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
      </div>
    )}

    {data.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Professional Experience
        </h2>
        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div key={exp.id}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                </div>
                <div className="text-right text-gray-600 font-medium">{exp.duration}</div>
              </div>
              {exp.description && (
                <p className="text-gray-700 leading-relaxed text-justify">
                  {exp.description}
                </p>
              )}
              {index < data.experience.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </div>
    )}

    {data.education.length > 0 && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Education
        </h2>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.school}</p>
              </div>
              <span className="text-gray-600 font-medium">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {data.skills.length > 0 && (
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
          Core Competencies
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {data.skills
            .filter((s) => s.trim())
            .map((s, i) => (
              <div key={i} className="text-sm text-gray-700">
                {s}
              </div>
            ))}
        </div>
      </div>
    )}
  </div>
);

// --- Resume Preview Wrapper ---
const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const renderTemplate = () => {
    switch (template) {
      case "creative":
        return <CreativeTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Resume Preview
          <Badge variant="secondary" className="capitalize">
            {template} Template
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 max-h-[800px] overflow-y-auto">
        {renderTemplate()}
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
