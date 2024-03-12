import { db } from "@/lib/db";

// Assuming the "credit" field exists in your User model and you want to increment it
export const updateCredits = async (userId: string, creditFee: number) => {
  try {
    // Perform the update operation
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        credits: {
          increment: creditFee,
        },
      },
      // Assuming you want to return certain fields after update
      select: {
        id: true,
        username: true,
        credits: true, // Ensure this field exists in your model
      },
    });

    if (!updatedUser) throw new Error("User credits update failed");

    return updatedUser;
  } catch (error) {
    console.error("Failed to update user credits:", error);
    throw error; // Re-throwing the error for further handling up the call stack
  }
};
