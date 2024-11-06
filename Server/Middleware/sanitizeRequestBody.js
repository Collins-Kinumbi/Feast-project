const sanitizeOptions = {
  allowedTags: ["b", "i", "em", "strong", "p", "ul", "ol", "li", "a"],
  allowedAttributes: {
    a: ["href"],
  },
  allowedSchemes: ["http", "https"],
};

export const sanitizeRequestBody = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = sanitizeHtml(req.body[key], sanitizeOptions);
      }
    }
  }
  next();
};
