-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT,
    "link_appstore" TEXT,
    "link_playstore" TEXT,
    "link_website" TEXT,
    "display" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
