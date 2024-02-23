export const errorFilter = async (error, c) => {
    const status = error.status ?? 500;
    return c.json({
        status: status,
        message: error.message ?? "Something went wrong",
    }, status);
};
