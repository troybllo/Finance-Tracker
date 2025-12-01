import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

const defaultCategories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health & Fitness",
  "Travel",
  "Other",
];

async function seedCategories(userId: string) {
  console.log("Creating default categories...");

  for (const categoryName of defaultCategories) {
    // Check if category already exists for this user
    const existingCategory = await prisma.category.findUnique({
      where: {
        userId_name: {
          userId: userId,
          name: categoryName,
        },
      },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: {
          name: categoryName,
          userId: userId,
        },
      });
      console.log(`Created category: ${categoryName}`);
    } else {
      console.log(`Category already exists: ${categoryName}`);
    }
  }
}

async function getOrCreateTestUser() {
  // Try to find existing test user
  let user = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });

  // If doesn't exist, create it
  if (!user) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    user = await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        password_hash: hashedPassword,
      },
    });
    console.log("Created test user: test@example.com");
  } else {
    console.log("Using existing test user: test@example.com");
  }

  return user;
}

async function main() {
  console.log("Seeding Database...\n");

  // Get or create test user
  const testUser = await getOrCreateTestUser();

  console.log("");

  // Seed categories for test user
  await seedCategories(testUser.id);

  console.log("\nSeeding completed!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
