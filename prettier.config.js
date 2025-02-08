{
  "plugins": ["prettier-plugin-ejs"],
  "ejsOpeningTags": ["<%", "<%_", "<%=", "<%-", "<%#", "<%@"],
  "ejsClosingTags": ["%>", "_%>"],
  "overrides": [
    {
      "files": "*.ejs",
      "options": {
        "parser": "ejs"
      }
    }
  ],
    "prettier.documentSelectors": ["**/*.ejs"]
  
}