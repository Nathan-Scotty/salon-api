import prisma from "../db";

export const postComment = async (request, response) => {
    const { userId, content, stars } = request.body;

    try {
        const comment = await prisma.comment.create({
            data: {
                userId,
                content,
                stars: parseInt(stars),
            }
        });

        response.status(201).json({ data: comment })

    } catch (error) {
        response.status(500).json({ error: 'Failed to create comment' });
    }
}

export const getComment = async (request, response) => {
    const { userId } = request.query;

    try {
        const comments = await prisma.comment.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' }
        })
        response.status(200).json({ data: comments })
    } catch (error) {
        response.status(500).json({ error: "Error fetching comments" })
    }
}