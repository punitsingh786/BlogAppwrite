# MegaBlog

A blog application built with React, Redux Toolkit, React Router, Tailwind CSS v4 and Appwrite
(authentication, database and file storage). Posts are written with a rich text editor.

## Features
- Sign up / log in / log out (Appwrite Auth)
- Create, edit and delete posts with a featured image
- Owner-only editing: users can change or delete only their own posts
- Admin role: an admin can edit or delete any post
- Active / inactive post status
- Protected routes, 404 page, loading and error states
- Rich text editor (self-hosted TinyMCE, no API key needed)

## Tech stack
React 19, Vite, Redux Toolkit, React Router, React Hook Form, Tailwind CSS v4, Appwrite (TablesDB, Storage, Auth)

## Setup
1. `npm install`
2. Copy `.env-sample` to `.env` and fill in your Appwrite values
3. `npm run dev`

## Appwrite configuration
**Table** (columns): `title` (string, 255), `content` (string, at least 100000 - the editor saves HTML),
`featuredImage` (string, 255), `userId` (string, 255), `status` (string, 20).
- Add a key **index** on `status`.
- Table permissions: role **Users** -> Create only. Turn on **Row level security**.
- Admin: add the role **Label -> admin** with Read, Update and Delete.

**Bucket**: role **Users** -> Create only, **File security** on, and the label `admin` with Read, Update and Delete.

**Admin user**: Appwrite console -> Auth -> Users -> your user -> Labels -> add `admin`.

**Platforms**: add a Web platform with hostname `localhost` (and your deployed domain).
