/**
 * Generates public/resume.pdf — a real, downloadable one/two-page resume.
 * Run with: npm run resume
 *
 * Replace public/resume.pdf with your own designed PDF at any time; the
 * "Download Resume" button links to /resume.pdf.
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WIDTH = 595.28;
const HEIGHT = 841.89;
const MARGIN = 46;
const CONTENT = WIDTH - MARGIN * 2;

const ink = rgb(0.09, 0.1, 0.13);
const body = rgb(0.27, 0.29, 0.34);
const muted = rgb(0.44, 0.46, 0.52);
const accent = rgb(0.24, 0.4, 0.85);
const rule = rgb(0.86, 0.88, 0.92);

const doc = await PDFDocument.create();
doc.setTitle("Majeti Lakshmi Srujana - Software Engineer Resume");
doc.setAuthor("Majeti Lakshmi Srujana");
doc.setSubject("Software Engineer | Full-Stack Developer | Generative AI Enthusiast");
doc.setCreator("Portfolio resume generator");

const regular = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);

let page = doc.addPage([WIDTH, HEIGHT]);
let y = HEIGHT - MARGIN;

const wrap = (text, font, size, maxWidth) => {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const newPage = () => {
  page = doc.addPage([WIDTH, HEIGHT]);
  y = HEIGHT - MARGIN;
  page.drawText("MAJETI LAKSHMI SRUJANA", {
    x: MARGIN,
    y,
    size: 8,
    font: bold,
    color: muted,
  });
  page.drawText("Software Engineer", {
    x: WIDTH - MARGIN - regular.widthOfTextAtSize("Software Engineer", 8),
    y,
    size: 8,
    font: regular,
    color: muted,
  });
  y -= 8;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: WIDTH - MARGIN, y },
    thickness: 0.6,
    color: rule,
  });
  y -= 22;
};

const ensure = (height) => {
  if (y - height < MARGIN) newPage();
};

const paragraph = (text, { size = 9.4, font = regular, color = body, indent = 0, lead = 13 } = {}) => {
  for (const line of wrap(text, font, size, CONTENT - indent)) {
    ensure(lead);
    page.drawText(line, { x: MARGIN + indent, y, size, font, color });
    y -= lead;
  }
};

const section = (title) => {
  ensure(34);
  y -= 6;
  page.drawText(title.toUpperCase(), {
    x: MARGIN,
    y,
    size: 8,
    font: bold,
    color: accent,
  });
  y -= 6;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: WIDTH - MARGIN, y },
    thickness: 0.7,
    color: rule,
  });
  y -= 14;
};

const heading = (left, right) => {
  ensure(26);
  page.drawText(left, { x: MARGIN, y, size: 10.5, font: bold, color: ink });
  if (right) {
    page.drawText(right, {
      x: WIDTH - MARGIN - regular.widthOfTextAtSize(right, 8.4),
      y: y + 0.5,
      size: 8.4,
      font: regular,
      color: muted,
    });
  }
  y -= 12;
};

const subheading = (text) => {
  ensure(16);
  page.drawText(text, { x: MARGIN, y, size: 9.2, font: regular, color: body });
  y -= 12;
};

const bullet = (text) => {
  ensure(14);
  page.drawCircle({ x: MARGIN + 3, y: y + 3.1, size: 1.15, color: accent });
  paragraph(text, { indent: 11, size: 9.1, lead: 12.2 });
};

const tagLine = (text) => {
  ensure(16);
  for (const line of wrap(text, regular, 8.5, CONTENT)) {
    page.drawText(line, { x: MARGIN, y, size: 8.5, font: regular, color: muted });
    y -= 11;
  }
};

/* ------------------------------------------------------------------ header */
y = HEIGHT - MARGIN - 22;
page.drawText("MAJETI LAKSHMI SRUJANA", {
  x: MARGIN,
  y,
  size: 21,
  font: bold,
  color: ink,
});
y -= 16;
page.drawText("Software Engineer  |  Full-Stack Developer  |  Generative AI Enthusiast", {
  x: MARGIN,
  y,
  size: 9.4,
  font: regular,
  color: accent,
});
y -= 14;
page.drawText("majeti.srujana99@gmail.com   ·   Rajamahendravaram, India", {
  x: MARGIN,
  y,
  size: 8.8,
  font: regular,
  color: muted,
});
y -= 14;
page.drawLine({
  start: { x: MARGIN, y },
  end: { x: WIDTH - MARGIN, y },
  thickness: 1,
  color: rule,
});

/* ----------------------------------------------------------------- profile */
section("Profile");
paragraph(
  "Software Engineer with hands-on experience building scalable full-stack applications and intelligent, AI-powered solutions. Works across React.js frontends, Python/FastAPI services and MySQL/MongoDB data layers, with practical experience in Generative AI and Retrieval-Augmented Generation.",
);

/* -------------------------------------------------------------- experience */
section("Professional Experience");
heading("Junior Developer", "May 2026 - Present");
subheading("Quantex Intelligence Systems Pvt Ltd");
paragraph(
  "Builds enterprise full-stack products across education, civil supplies, IoT, media and payments.",
);
bullet(
  "Smart School Management System - SaaS platform supporting K-12 through higher education, with 17 role-based access control roles and a smart-wallet campus ID system.",
);
bullet(
  "Civil Supplies Command Control Center - real-time monitoring and control dashboard built with React.js, FastAPI and MySQL.",
);
bullet(
  "Smart Zoop Band - wearable band companion platform with IoT and Bluetooth integration (React.js, Node.js, MongoDB).",
);
bullet("NEXUS Play - TV news and media application (React.js, Node.js, MongoDB).");
bullet(
  "Event Management Application - end-to-end event planning platform built with React.js, FastAPI and MySQL.",
);
bullet("Digital Wallet - student ID transactions and payment application.");

section("Internships");
heading("Generative AI Developer Intern", "");
subheading("SUG Creative");
bullet(
  "Built Generative AI solutions using LangChain, RAG and LLMs across content generation, document analysis and conversational chatbots.",
);

heading("Full Stack Developer Intern", "");
subheading("Amaravathi Software Innovations Pvt Ltd");
bullet(
  "Built a student verification system with QR code scanning and facial recognition, plus a real-time face recognition administration dashboard for lab allocation.",
);

heading("Full Stack Developer Intern", "");
subheading("Anedium Pvt Ltd");
bullet("Developed reusable React components and integrated REST APIs within a MERN stack application.");

heading("Machine Learning Intern", "");
subheading("Infosys Springboard");
bullet(
  "Worked on a Cat Emotion Recognition System using CNN and LSTM with approximately 85% accuracy, deployed using Streamlit.",
);

/* ---------------------------------------------------------------- projects */
section("Selected Projects");
heading("DocAssist - AI Document Question Answering System", "");
tagLine("Python · SQL · LangChain · RAG");
bullet(
  "Full-stack AI platform for document question answering with document ingestion, a retrieval pipeline and context-aware answers grounded in the source documents to reduce hallucinations.",
);

heading("IntervAI - Voice Interview Evaluation System", "");
tagLine("Python · NLP · Machine Learning");
bullet(
  "AI interview evaluation platform analysing speech clarity, grammar and confidence, with visual feedback dashboards and candidate-specific improvement suggestions.",
);

heading("GitHub Zen - Repository Management Platform", "");
tagLine("React.js · FastAPI · GitHub OAuth · TanStack Query");
bullet(
  "Repository management dashboard for browsing repositories, managing pull requests and commenting, with efficient caching and real-time updates.",
);

/* ------------------------------------------------------------------ skills */
section("Technical Skills");
paragraph("Languages: Python, Java, JavaScript", { size: 9 });
paragraph("Frontend: React.js, HTML, CSS, Bootstrap, Tailwind CSS", { size: 9 });
paragraph("Backend: FastAPI, Flask, Node.js, Express.js, REST APIs", { size: 9 });
paragraph("Mobile: Flutter, Android Studio", { size: 9 });
paragraph("Generative AI: LangChain, RAG, Large Language Models", { size: 9 });
paragraph("Machine Learning: Scikit-learn, NumPy, Pandas", { size: 9 });
paragraph("Databases: MySQL, PostgreSQL, MongoDB", { size: 9 });
paragraph("Tools & Platforms: Git, GitHub, Streamlit, Google Colab, VS Code", { size: 9 });

/* --------------------------------------------------------------- education */
section("Education");
heading("Bachelor of Technology - Computer Science and Engineering", "2022 - 2026");
subheading("International School of Technology and Sciences for Women");
paragraph("CGPA: 8.1 / 10", { size: 9 });

/* ---------------------------------------------------------- certifications */
section("Certifications & Achievements");
bullet("Python and SQL Certification - HackerRank.");
bullet("Mastering AI and ChatGPT - GeeksforGeeks.");
bullet("Python Hackathon Participation Certificate.");
bullet("AICTE Approved Certifications.");
bullet("Contributed to six client projects at Quantex Intelligence Systems.");
bullet("Technical Support Lead at College Tech Fest, managing technical operations.");

const bytes = await doc.save();
const target = resolve(dirname(fileURLToPath(import.meta.url)), "..", "public", "resume.pdf");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, bytes);
console.log(`Wrote ${target} (${doc.getPageCount()} page(s), ${bytes.length} bytes)`);
