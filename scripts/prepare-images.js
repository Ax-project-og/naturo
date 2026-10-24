// Génère les images optimisées du site à partir des originaux de contenu-original/images.
// À relancer uniquement si une image source change : `npm run images`.
import sharp from "sharp";

const SRC = "contenu-original/images";
const OUT = "src/assets/img";
const LOGO = `${SRC}/2972503_isabelle-gayet.png`;
const PORTRAIT = `${SRC}/2972675_isabelle-gayet.jpeg`;

const logo = await sharp(LOGO).metadata();

// Logo complet (soleil + mot « gaïaroma »)
const full = await sharp(LOGO).trim().toBuffer();
await sharp(full).resize({ width: 520 }).webp({ quality: 90 }).toFile(`${OUT}/logo-gaiaroma.webp`);
await sharp(full).resize({ width: 520 }).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-gaiaroma.png`);

// Symbole seul (sans le mot), pour l'en-tête et les favicons
const markRaw = await sharp(LOGO)
  .extract({ left: 0, top: 0, width: logo.width, height: Math.round(logo.height * 0.772) })
  .toBuffer();
const mark = await sharp(markRaw).trim().toBuffer();
await sharp(mark).resize({ height: 176 }).webp({ quality: 90 }).toFile(`${OUT}/logo-symbole.webp`);
await sharp(mark).resize({ height: 176 }).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-symbole.png`);

const square = (size, bg) =>
  sharp(mark)
    .resize(size, size, { fit: "contain", background: bg ?? { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 });
await square(48).toFile(`${OUT}/favicon-48.png`);
await square(192).toFile(`${OUT}/icon-192.png`);
await square(512).toFile(`${OUT}/icon-512.png`);
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#ffffff" } })
  .composite([{ input: await square(150).toBuffer(), gravity: "center" }])
  .png()
  .toFile(`${OUT}/apple-touch-icon.png`);

// Image de partage réseaux sociaux (1200×630)
const ogLogo = await sharp(full).resize({ height: 520 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#fbf7ee" } })
  .composite([{ input: ogLogo, gravity: "center" }])
  .jpeg({ quality: 85 })
  .toFile(`${OUT}/partage-gaiaroma.jpg`);

// Portrait d'Isabelle
await sharp(PORTRAIT).webp({ quality: 82 }).toFile(`${OUT}/isabelle-gayet.webp`);
await sharp(PORTRAIT).jpeg({ quality: 82, mozjpeg: true }).toFile(`${OUT}/isabelle-gayet.jpg`);

console.log("Images générées dans", OUT);
