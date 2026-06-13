// Une las páginas PNG del CV en un solo PDF → public/cv-andres-caceres.pdf
// Uso: node scripts/build-cv-pdf.mjs <pagina1.png> <pagina2.png> ...
import { PDFDocument } from "pdf-lib";
import { readFile, writeFile } from "node:fs/promises";

const pages = process.argv.slice(2);
if (pages.length === 0) {
  console.error("Pasa las rutas de las imágenes PNG como argumentos.");
  process.exit(1);
}

const pdf = await PDFDocument.create();
pdf.setTitle("CV — Andrés Cáceres");
pdf.setAuthor("Andrés Cáceres");

for (const path of pages) {
  const png = await pdf.embedPng(await readFile(path));
  const page = pdf.addPage([png.width, png.height]);
  page.drawImage(png, { x: 0, y: 0, width: png.width, height: png.height });
}

await writeFile("public/cv-andres-caceres.pdf", await pdf.save());
console.log(`PDF creado: public/cv-andres-caceres.pdf (${pages.length} páginas)`);
