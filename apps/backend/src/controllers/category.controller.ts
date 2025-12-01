import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.userId;

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Please enter a name for the category",
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        userId_name: {
          userId,
          name: name.trim(),
        },
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        error: "This name already exists",
      });
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        userId,
      },
    });

    res.status(201).json({
      category: {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });
  } catch (error) {
    console.error("Create category error: ", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "User is Unauthorized",
      });
    }

    const categories = await prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    if (categories.length == 0) {
      return res.status(200).json({
        error: "This user has no categories created",
      });
    }

    res.status(200).json({
      categories: categories,
    });
  } catch (error) {
    console.error("Get categories error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "User is Unauthorized",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        error: "Please enter a name",
      });
    }

    // Check if category exists and belongs to user
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (!existingCategory) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    // Check if new name conflicts with another category
    const duplicateCategory = await prisma.category.findUnique({
      where: {
        userId_name: {
          userId: userId,
          name: name.trim(),
        },
      },
    });

    if (duplicateCategory && duplicateCategory.id !== id) {
      return res.status(409).json({
        error: "A category with this name already exists",
      });
    }

    // Update the category
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name.trim(),
      },
    });

    res.status(200).json({
      category,
    });
  } catch (error) {
    console.error("Update categories error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        error: "User is Unauthorized",
      });
    }

    if (!id) {
      return res.status(401).json({
        error: "This isnt a valid category",
      });
    }

    const category = await prisma.category.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        _count: {
          select: {
            expenses: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    if (category._count.expenses > 0) {
      return res.status(400).json({
        error: "Cannot delete category with existing expenses",
      });
    }

    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Delete category error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
    throw error;
  }
};
