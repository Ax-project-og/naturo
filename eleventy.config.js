import { schemaGraph } from "./lib/schema.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("schemaGraph", schemaGraph);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2": "assets/fonts/fraunces.woff2",
    "node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2": "assets/fonts/fraunces-italic.woff2",
    "node_modules/@fontsource-variable/nunito-sans/files/nunito-sans-latin-wght-normal.woff2": "assets/fonts/nunito-sans.woff2",
    "node_modules/@fontsource-variable/nunito-sans/files/nunito-sans-latin-wght-italic.woff2": "assets/fonts/nunito-sans-italic.woff2",
  });
  eleventyConfig.addWatchTarget("src/assets/");

  // Articles du blog, du plus récent au plus ancien
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/blog/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // Pages indexables, pour le sitemap et le plan du site
  eleventyConfig.addCollection("indexables", (api) =>
    api.getAll().filter((p) => p.url && p.url.endsWith(".html") && !p.data.noindex && !p.data.excludeFromSitemap)
  );

  // URL publique sans l'extension .html (les hébergeurs servent /page pour /page.html)
  eleventyConfig.addFilter("cleanUrl", (url) => {
    if (!url) return url;
    if (url === "/index.html") return "/";
    return url.replace(/\.html$/, "");
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

  const mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  eleventyConfig.addFilter("dateFr", (d) => {
    const date = new Date(d);
    return `${date.getUTCDate()} ${mois[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  eleventyConfig.addFilter("initiale", (nom) => String(nom).trim().charAt(0).toUpperCase());

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("findBy", (items, key, value) => items.find((i) => i[key] === value));

  eleventyConfig.addFilter("filterBy", (items, key, value) => items.filter((i) => i.data[key] === value));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
