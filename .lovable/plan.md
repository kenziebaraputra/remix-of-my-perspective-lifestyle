
## Summary of Changes

Here are all 5 things to implement:

---

### 1. Hide "Create Account" on the Admin Login Page
**File:** `src/pages/AdminLogin.tsx`

Remove the mode toggle bar (the Sign In / Create Account tab switcher), the signup-specific UI elements, and lock the page to login-only mode. The state for `mode`, `signup` branch in `handleSubmit`, the SQL hint block, and the `UserPlus`/`LogIn` imports will all be removed. The page will only show a clean "Sign In" form.

---

### 2. Move the Hidden Admin Circle to Footer Bottom-Right (Fixed)
**Files:** `src/App.tsx`, `src/components/Footer.tsx`

Currently the `AdminFab` is a `fixed` circle at `bottom-6 right-6` globally. The request is to anchor it visually to the footer's bottom-right corner, still in a fixed/sticky position.

The implementation: keep it as `fixed bottom-6 right-6 z-50` (same visual position) but ensure the footer itself has `relative` positioning so the circle appears to live at the footer's edge. Since the footer is at the bottom of the page and the circle is fixed at the same corner, they naturally align — no changes to `App.tsx` are needed. However, to make it truly sit inside the footer's bottom-right corner, the FAB will be moved from the global `App.tsx` level into `Footer.tsx` itself, rendered as `absolute bottom-4 right-4` inside a `relative`-positioned footer wrapper. This keeps it visually anchored to the footer without a global floating element.

---

### 3. Editable Privacy Policy and Terms of Service Page Content
**Files:** `src/components/admin/AdminSettings.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/integrations/supabase/types.ts` (no change — using existing `site_settings` table)

The `site_settings` table already supports arbitrary key/value pairs. The plan:

**Admin Settings (Legal tab)** — add 2 large textarea fields:
- `legal_privacy_content` — full body text for Privacy Policy
- `legal_terms_content` — full body text for Terms of Service

Also update `SETTING_KEYS` to include these two new keys.

**Privacy.tsx** — fetch `legal_privacy_content` from `site_settings` on mount and render it. If no value is stored yet, fall back to the current hardcoded content (so nothing breaks immediately).

**Terms.tsx** — same pattern, fetching `legal_terms_content`.

Since the content will be plain text (not HTML/markdown), it will be rendered in a `<pre>`-style or whitespace-preserved `<p>` element. If richer formatting is desired later, markdown rendering can be added, but for now plain text with whitespace preserved is safe and simple.

---

### 4. Add Threads to Footer Connect Section
**Files:** `src/components/Footer.tsx`, `src/components/admin/AdminSettings.tsx`

Lucide does not have a Threads icon, so a simple inline SVG of the Threads logo (the "@" swirl) will be used, or alternatively the `AtSign` icon from Lucide as a placeholder that visually represents Threads.

- Add `footer_threads` to the footer's `FooterSettings` interface and default values.
- Fetch `footer_threads` from `site_settings` along with the other footer keys.
- Render a new list item in the "Connect" section with the Threads icon and label.
- Add a "Threads URL" field in AdminSettings → Footer & Social tab.
- Update `SETTING_KEYS` in AdminSettings to include `"footer_threads"`.

---

### Technical Summary

| Area | Files Changed |
|---|---|
| Admin Login (hide signup) | `src/pages/AdminLogin.tsx` |
| Admin FAB in footer | `src/App.tsx`, `src/components/Footer.tsx` |
| Editable Privacy/Terms content | `src/components/admin/AdminSettings.tsx`, `src/pages/Privacy.tsx`, `src/pages/Terms.tsx` |
| Threads in footer | `src/components/Footer.tsx`, `src/components/admin/AdminSettings.tsx` |

No database migrations are required — the existing `site_settings` table's flexible key/value structure supports all the new content fields (`legal_privacy_content`, `legal_terms_content`, `footer_threads`) without any schema changes.
