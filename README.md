# Quantly Landing Page

This is the landing page for Quantly, deployed on GitHub Pages with a custom domain.

## Deployment

This site is configured to be served via GitHub Pages.

1.  **CNAME**: The `CNAME` file ensures the site is served at `quantlyapp.com`.
2.  **.nojekyll**: This file prevents GitHub Pages from trying to build the site with Jekyll, ensuring all files (including those starting with `_`) are served correctly.

### How to Update

Simply push your changes to the `master` branch of the GitHub repository.

```bash
git add .
git commit -m "Update site"
git push origin master
```

Ensure your repository Settings > Pages is configured to deploy from the `master` branch (root directory).
