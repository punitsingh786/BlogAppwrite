# MegaBlog

A blog app, based on the MegaBlog project from Hitesh Choudhary's
[Chai aur React](https://github.com/hiteshchoudhary/chai-aur-react/tree/main/12MegaBlog) series,
built with React, Redux Toolkit, React Router, Tailwind CSS v4 and Appwrite
(auth, database and file storage). Posts are written with the TinyMCE rich text editor.

## Features
- Sign up / log in / log out (Appwrite Auth)
- Create, edit and delete posts with a featured image
- Active / inactive post status
- Protected routes
- Rich text editor (self-hosted TinyMCE, no API key needed)

## Setup
1. `npm install`
2. Copy `.env-sample` to `.env` and fill in your Appwrite values
3. `npm run dev`

## Appwrite configuration
**Table** (columns): `title` (string, 255), `content` (string, 100000), `featuredImage` (string, 255),
`userId` (string, 255), `status` (string, 20).
- Add an **index** on `status` (key index) - needed for the "active posts" query on the home page.
- Table permissions: role **Any** -> Read; role **Users** -> Create. Enable *Row security* so
  creators can update/delete their own rows (or give Users Update/Delete).

**Bucket**: permissions role **Any** -> Read; role **Users** -> Create. Enable *File security* or
give Users Update/Delete.

**Platforms**: add a Web platform in your Appwrite project with hostname `localhost`
(and your deployed domain later).

## What I changed from the original
- Updated to the Appwrite SDK v29 `TablesDB` API (rows/tables instead of documents/collections)
- Tailwind CSS v4, Vite 8, React 19, Oxlint
- Fixed bugs (auth payload, submit button type, slug rules, `Query` import, delete/update handling)
- New UI, logo, loading/error states, 404 page, route-level code splitting
- Self-hosted TinyMCE (no API key) and `getFileView` for images (works on the free plan)
