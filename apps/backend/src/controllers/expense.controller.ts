import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { amount, categoryId, note, date, currency } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: "Please enter a valid amount",
      });
    }

    if (!categoryId) {
      return res.status(400).json({
        error: "Please select a category",
      });
    }

    if (!date) {
      return res.status(400).json({
        error: "Please enter a date",
      });
    }

    const category = await prisma.category.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: amount,
        note: note || null,
        date: new Date(date),
        categoryId: categoryId,
        userId: userId,
        currency: currency || "USD",
      },
    });

    res.status(201).json({
      id: expense.id,
      amount: expense.amount,
      currency: expense.currency,
      note: expense.note,
      date: expense.date,
      categoryId: expense.categoryId,
      createdAt: expense.createdAt,
    });
  } catch (error) {
    console.error("Create expense error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // Pagination params
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Filter params
    const { from, to, categoryId } = req.query;

    // Build where clause
    const where: any = { userId };

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from as string);
      if (to) where.date.lte = new Date(to as string);
    }

    if (categoryId) {
      where.categoryId = categoryId as string;
    }

    // Get expenses and count in parallel
    const [expenses, total] = await Promise.all([
      prisma.expense.findMany({
        where,
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { date: "desc" },
        skip,
        take: limit,
      }),
      prisma.expense.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      expenses,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const expense = await prisma.expense.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!expense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Get expense error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, categoryId, note, date, currency } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // First check if expense exists
    const existingExpense = await prisma.expense.findUnique({
      where: { id },
    });

    if (!existingExpense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    // Then check if it belongs to the user
    if (existingExpense.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden: You don't have permission to update this expense",
      });
    }

    // If categoryId is being updated, verify it exists and belongs to user
    if (categoryId && categoryId !== existingExpense.categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
          userId: userId,
        },
      });

      if (!category) {
        return res.status(404).json({
          error: "Category not found",
        });
      }
    }

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: {
        amount: amount !== undefined ? amount : existingExpense.amount,
        note: note !== undefined ? note : existingExpense.note,
        date: date ? new Date(date) : existingExpense.date,
        categoryId: categoryId || existingExpense.categoryId,
        currency: currency || existingExpense.currency,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // First check if expense exists
    const expense = await prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    // Then check if it belongs to the user
    if (expense.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden: You don't have permission to delete this expense",
      });
    }

    await prisma.expense.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error("Delete expense error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
