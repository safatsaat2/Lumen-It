# Lumen — IT Agency

Premium IT & brand creation agency website built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

This guide shows you how to run the project on your computer and preview it **live in the browser**.

---

## 1. Prerequisites

Make sure you have these installed:

| Tool        | Minimum version | Check command       |
| ----------- | --------------- | ------------------- |
| **Node.js** | 18.18 or newer  | `node -v`           |
| **npm**     | 9 or newer      | `npm -v`            |
| **Git**     | any recent      | `git --version`     |

If you don't have Node.js, download the LTS build from [https://nodejs.org](https://nodejs.org).

---

## 2. Install dependencies

Open a terminal (PowerShell on Windows) in the project folder:

```powershell
cd "C:\Users\UseR\Documents\IT AGENCY"
```

Then install everything listed in `package.json`:

```powershell
npm install
```

This creates the `node_modules` folder and a fresh `package-lock.json` if needed. Run this **once** after cloning, and again whenever dependencies change.

---

## 3. Set up environment variables (optional)

The project reads its config from a `.env.local` file. Copy the example file:

```powershell
copy .env.example .env.local
```

Open `.env.local` and adjust values if you need them. For a basic local preview you can leave the defaults — the public site URL and name are the only variables actually used by the UI.

---

## 4. Start the dev server (live preview)

Run:

```powershell
npm run dev
```

> **Windows + PowerShell:** If you see `running scripts is disabled on this system` or `npm.ps1 cannot be loaded`, see [PowerShell script blocked](#powershell-script-blocked-npm-run-dev-fails) below before continuing.

You should see output similar to:

```
▲ Next.js 15.0.3
- Local:        http://localhost:3000
- Ready in 2.1s
```

Open your browser and go to:

**[http://localhost:3000](http://localhost:3000)**

The site will reload automatically every time you save a file — this is the "live" part. Edit anything inside `src/` (e.g. `src/app/page.tsx` or `src/app/globals.css`) and the browser updates instantly.

To stop the server, press `Ctrl + C` in the terminal.

---

## 5. View on another device on your network

Want to preview the site on your phone while it runs on your PC? Start Next.js bound to all interfaces:

```powershell
npm run dev -- -H 0.0.0.0
```

Then on your phone (connected to the same Wi-Fi) open:

```
http://<your-pc-ip>:3000
```

Find your PC's IP with `ipconfig` (look for the IPv4 address under your active adapter, e.g. `192.168.1.42`).

> If it doesn't load, allow Node.js through Windows Defender Firewall when prompted, or temporarily disable the firewall for the private network.

---

## 6. Production preview (optional)

To test the optimized production build locally:

```powershell
npm run build
npm run start
```

This serves the compiled output at [http://localhost:3000](http://localhost:3000) — the same URL, but exactly what real visitors would get.

---

## 7. Useful scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start dev server with hot reload                 |
| `npm run build`     | Create production build in `.next/`              |
| `npm run start`     | Serve the production build                       |
| `npm run lint`      | Run ESLint                                        |
| `npm run typecheck` | Run TypeScript without emitting files            |
| `npm run format`    | Format all `.ts`, `.tsx`, `.md`, `.json` files   |

---

## 8. Troubleshooting

### PowerShell script blocked (`npm run dev` fails)

If the terminal shows something like:

```text
npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
```

PowerShell is blocking `npm.ps1`. Use **one** of these fixes:

**Option A — Allow scripts for your user (recommended, one-time)**

Run PowerShell **as yourself** (normal window is fine) and paste:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Type `Y` when asked. Close the terminal, open a new one, then:

```powershell
cd "C:\Users\UseR\Documents\IT AGENCY"
npm run dev
```

**Option B — Use `npm.cmd` (no policy change)**

In the same PowerShell window:

```powershell
npm.cmd run dev
```

For other commands, use `npm.cmd` instead of `npm` (e.g. `npm.cmd install`).

**Option C — Use Command Prompt**

Open **cmd** (not PowerShell), `cd` to the project folder, then run `npm run dev` as usual.

---

**`'next' is not recognized` / command not found**
Run `npm install` first — the `next` CLI lives inside `node_modules/.bin`.

**Port 3000 already in use**
Either stop the other process, or run on a different port:

```powershell
npm run dev -- -p 3001
```

Then open [http://localhost:3001](http://localhost:3001).

**Changes not showing in the browser**
Hard refresh with `Ctrl + Shift + R`, or delete the `.next` folder and restart `npm run dev`.

**Permission / EPERM errors on Windows**
Close the editor and any terminal locking the folder, then delete `node_modules` and `.next` and run `npm install` again.

### Page has no styling (plain HTML, no colors)

This almost always means the browser is **not** talking to a healthy Next.js dev server.

1. **Use the dev server URL only** — open **http://localhost:3000** after `npm run dev`. Do **not** open HTML files from the folder in the browser (`file://` will never load CSS/JS).

2. **Kill old dev servers** — if you started `npm run dev` several times, an old broken process may still own port 3000. In PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

3. **Clean and restart**:

```powershell
cd "C:\Users\UseR\Documents\IT AGENCY"
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm.cmd run dev
```

4. Use the **exact URL** printed in the terminal (`Local: http://localhost:3000`). If it says port 3001 or 3002, use that port instead — or free port 3000 with step 2.

5. Hard refresh: `Ctrl + Shift + R`.

---

## 9. Project structure (quick reference)

```
IT AGENCY/
├─ src/
│  └─ app/
│     ├─ globals.css      # Global styles & Tailwind layers
│     ├─ layout.tsx       # Root layout
│     └─ page.tsx         # Home page
├─ public/                # Static assets (images, icons)
├─ next.config.mjs        # Next.js config
├─ tailwind.config.ts     # Tailwind theme
├─ tsconfig.json          # TypeScript config
└─ package.json           # Scripts & dependencies
```

---

## 10. Deploy to Vercel

The project builds successfully for production and works on [Vercel](https://vercel.com) with zero extra config (Next.js is auto-detected).

### Option A — GitHub + Vercel dashboard (recommended)

**1. Create a Git repo and push to GitHub**

```powershell
cd "C:\Users\UseR\Documents\IT AGENCY"
git init
git add .
git commit -m "Initial commit — Lumen agency site"
```

Create a new empty repo on [GitHub](https://github.com/new), then:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**2. Import on Vercel**

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in and click **Import Project**
3. Choose your GitHub repo
4. Vercel detects **Next.js** — leave defaults:
   - **Build Command:** `npm run build`
   - **Output:** (automatic)
   - **Install Command:** `npm install`
5. Add **Environment Variables** (Production):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-PROJECT.vercel.app` (use your real Vercel URL after the first deploy) |
| `NEXT_PUBLIC_SITE_NAME` | `Lumen` |

6. Click **Deploy**

Your site will be live at `https://your-project.vercel.app`. Every `git push` to `main` redeploys automatically.

**3. Custom domain (optional)**

In the Vercel project → **Settings** → **Domains**, add your domain (e.g. `lumen.agency`), then set `NEXT_PUBLIC_SITE_URL` to that URL and redeploy.

---

### Option B — Deploy from your PC with Vercel CLI

No GitHub required for the first deploy.

```powershell
cd "C:\Users\UseR\Documents\IT AGENCY"
npx vercel login
npx vercel
```

Follow the prompts (link to your Vercel account, project name, etc.). For production:

```powershell
npx vercel --prod
```

Set environment variables in the [Vercel dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Environment Variables** (same table as above).

---

### Notes

- Do **not** commit `.env.local` — only set secrets in Vercel’s dashboard.
- External images (Unsplash) work in production; no extra image config needed.
- If the build fails on Vercel, run `npm run build` locally first and fix any errors shown there.

---

Happy building! Open [http://localhost:3000](http://localhost:3000) after `npm run dev` and you're live.
