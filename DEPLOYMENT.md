# Hostinger Deployment Guide

## Setup Instructions

### 1. Get Hostinger SFTP/FTP Credentials

Log into your Hostinger control panel (hPanel) → Files → FTP Accounts and get:
- **FTP Server**: Look for "Hostname" - usually `your-server-name.hostinger.com` or an IP like `123.45.67.89`
  - **DO NOT** include `ftp://` or port numbers
  - Example: `srv123456.hstgr.cloud` or `123.45.67.89`
- **FTP Username**: Your hosting username (usually shown in FTP Accounts)
- **FTP Password**: Your hosting password
- **Server Directory**: Usually `/public_html` or `/domains/yourdomain.com/public_html`
  - **Important**: Must start with `/` (absolute path)

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `FTP_SERVER`: Your Hostinger FTP server address
- `FTP_USERNAME`: Your Hostinger FTP username
- `FTP_PASSWORD`: Your Hostinger FTP password
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 3. Update supabaseClient.ts to Use Environment Variables

Replace hardcoded values with:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

### 4. Test Deployment

1. Commit and push to the `main` branch
2. Go to GitHub → Actions tab
3. Watch the deployment progress
4. Visit your website to verify

## Alternative: Git-Based Deployment

Some Hostinger plans support Git deployment:

1. In hPanel, go to "Git" section
2. Create a new repository
3. Link it to your GitHub repo
4. Set branch to `main`
5. Set deployment path to `public_html/`
6. Enable automatic deployments

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Verify environment variables are set in GitHub Secrets

### Files not uploading
- Verify FTP credentials
- Check `server-dir` path in workflow file
- Ensure Hostinger allows FTP connections

### Website not loading
- Check if `index.html` is in the root of `public_html/`
- Verify file permissions (644 for files, 755 for folders)
- Clear browser cache

## Important Notes

- The workflow builds the production version (`npm run build`)
- Only files in `dist/` folder are uploaded
- Deployment happens automatically on every push to `main` branch
- Old files are NOT deleted automatically (incremental upload)

## Security Best Practices

1. Never commit `.env` file to git
2. Store all sensitive credentials in GitHub Secrets
3. Use SFTP instead of FTP when possible (change action if needed)
4. Regularly rotate FTP passwords
