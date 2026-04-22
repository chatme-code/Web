import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.WEB_PORT || 3002;
const APK_DIR = process.env.APK_UPLOAD_DIR || "/app/apk-files";

app.use("/downloads", express.static(APK_DIR, {
  setHeaders(res, filePath) {
    if (filePath.endsWith(".apk")) {
      res.setHeader("Content-Type", "application/vnd.android.package-archive");
      res.setHeader("Content-Disposition", `attachment; filename="${path.basename(filePath)}"`);
    }
  },
}));

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`[max99 Web] Running on port ${PORT}`);
});
