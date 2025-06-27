/*
  Warnings:

  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link_appstore" TEXT,
    "link_playstore" TEXT,
    "link_website" TEXT,
    "display" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("bucket", "createdAt", "description", "display", "id", "link_appstore", "link_playstore", "link_website", "platform", "project_name", "tag", "year") SELECT "bucket", "createdAt", "description", "display", "id", "link_appstore", "link_playstore", "link_website", "platform", "project_name", "tag", "year" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_bucket_project_name_key" ON "Project"("bucket", "project_name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
