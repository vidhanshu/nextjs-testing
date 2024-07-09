import prisma from "@/prisma/db"

export const resolvers = {
    Query: {
        todo: async (_: never, { id }: { id: string }) => {
            const todo = await prisma.todo.findUnique({ where: { id } });
            return todo;
        },
        todos: async () => {
            const todos = prisma.todo.findMany()
            return todos;
        }
    },
    Mutation: {
        createTodo: async (_: never, args: {
            todoDetails: {
                title: string,
                description: string,
                completed: boolean
            }
        }) => {
            const { todoDetails: { completed, description, title } } = args
            const todo = await prisma.todo.create({
                data: {
                    title,
                    description,
                    completed,
                }
            })
            return todo
        },
        deleteTodo: async (_: never, { id }: { id: string }) => {
            const todo = await prisma.todo.delete({ where: { id } })
            return todo;
        }
    }
}