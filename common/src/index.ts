import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().optional()
})


export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
  
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string(),
  
})



// type inference uses in ts to create types of objects
export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>