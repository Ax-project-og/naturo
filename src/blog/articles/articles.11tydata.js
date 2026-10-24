export default {
  layout: "layouts/article.njk",
  permalink: (data) => `/blog/articles/${data.page.fileSlug}.html`,
  eleventyComputed: {
    fil: (data) => [{ titre: "Blog", url: "/blog" }, { titre: data.title }],
  },
};
