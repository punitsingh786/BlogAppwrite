// A user is an admin when their Appwrite account has the label "admin"
// (Appwrite console -> Auth -> Users -> your user -> Labels).
export const isAdmin = (user) => !!user?.labels?.includes("admin");