# RouterBase Cookbook

The cookbook repository is a content and tutorial asset for developers evaluating [RouterBase](https://routerbase.com).

Repository:

- `https://github.com/RouterBase/routerbase-cookbook`

Site:

- `https://routerbase.github.io/routerbase-cookbook/`

Included assets:

- Tutorials for using RouterBase as an OpenAI-compatible gateway.
- Model-switching rollout guidance.
- API collection import notes for Postman, Bruno, and Insomnia.
- Node.js and Python examples.
- Dev.to and Hashnode article drafts.
- Content calendar and review checklist.
- GitHub Pages site with quickstart, API collections, and content plan pages.

Validation:

- The repository has `npm run verify`.
- Node examples are tested without a live API key.
- Markdown files are checked for RouterBase links, balanced code fences, and follow-up references.
- GitHub Actions runs validation on every push and pull request.
- GitHub Pages publishes from `main` and `/docs`.
- The site homepage, quickstart page, API collections page, and sitemap returned HTTP 200 after enabling Pages.

Publishing follow-up:

- Publish `article-drafts/devto-openai-compatible-routerbase.md` on Dev.to after account login.
- Publish `article-drafts/hashnode-single-base-url.md` on Hashnode after account login.
- Keep examples aligned with the current default model used in the SDK starters.
