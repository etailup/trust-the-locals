import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";

// Minimal .env.local loader (no external dependency)
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .forEach((line) => {
      const idx = line.indexOf("=");
      if (idx > -1) {
        const key = line.slice(0, idx).trim();
        let val = line.slice(idx + 1).trim();
        // Strip surrounding quotes if present
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    });
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
// Expect BLOB_READ_WRITE_TOKEN in the environment (e.g., via .env.local)
const BLOB_TOKEN = (process.env.BLOB_READ_WRITE_TOKEN || "").trim().replace(/^["']|["']$/g, "");
// Optional prefix if your token is scoped (e.g., set BLOB_PREFIX=trust)
const BLOB_PREFIX = (process.env.BLOB_PREFIX || "").trim().replace(/^["']|["']$/g, "").replace(/^\/+|\/+$/g, "");

// file extensions you want to upload
const ALLOWED_EXT = [".jpg", ".jpeg", ".png", ".svg", ".mp4"];

const mapping = {};

async function walk(dir, uploads) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await walk(fullPath, uploads);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) continue;

      // compute relative path like "/experiences/x.jpg"
      const relativePath = fullPath.replace(PUBLIC_DIR, "");

      uploads.push(uploadFile(fullPath, relativePath));
    }
  }
}

async function uploadFile(fullPath, relativePath) {
  console.log(`⬆️ Uploading: ${relativePath}`);

  // Remove leading slash and double slashes (Blob requirement)
  const cleanPath = relativePath.replace(/^\/+/, "").replace(/\/+/g, "/");

  // Build blob path; if BLOB_PREFIX is set, prepend it
  const blobPath = (BLOB_PREFIX ? `${BLOB_PREFIX}/${cleanPath}` : cleanPath).replace(/\/+/g, "/");

  const blob = await put(blobPath, fs.readFileSync(fullPath), {
    access: "public",
    token: BLOB_TOKEN,
    allowOverwrite: true,
  });

  mapping[relativePath] = blob.url;
}

async function main() {
  if (!BLOB_TOKEN) {
    console.error("❌ Missing BLOB_READ_WRITE_TOKEN environment variable. Set it and rerun the script.");
    process.exit(1);
  }

  const masked = BLOB_TOKEN.length > 8 ? `${BLOB_TOKEN.slice(0, 4)}...${BLOB_TOKEN.slice(-4)}` : "(short token)";
  console.log(`🔑 Using token: ${masked}${BLOB_PREFIX ? ` with prefix "${BLOB_PREFIX}"` : ""}`);
  console.log("📤 Starting upload to Vercel Blob...");
  const uploads = [];
  await walk(PUBLIC_DIR, uploads);
  await Promise.all(uploads);

  fs.writeFileSync(
    "blob-mapping.json",
    JSON.stringify(mapping, null, 2),
    "utf8"
  );

  console.log("✅ Upload complete!");
  console.log("📄 Mapping file saved: blob-mapping.json");
}

main();
