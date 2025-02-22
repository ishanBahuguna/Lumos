import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@ishan_bahuguna/lumos-common";


// Create the main Hono app
export const userRouter = new Hono<{
  Bindings: {
    // connection pool url
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId:string
  }
}>();





userRouter.post("/signup", async (c) => {
  /** Never intantiate prisma client in global context reason:
   * first it will not allow
   * second the routes might be deployed independently
   */
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


//   zod and password hash

try {
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);

    if(!success) {
        c.status(400);
        return c.json({
            success:false,
            message: "Invalid inputs"
        })
    }

    const user = await prisma.user.create({
      data: {
        username:body.username,
        email: body.email,
        password: body.password,
      },
    });

    console.log(user)

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    return c.json({
        success:true,
        message: "User created successfully",
        username:user.username,
        token: `Bearer ${token}`,
    });
  } catch (e:any) {
    c.status(403);
    return c.json({
        success:false,
      error: e.message,
    });
  }
});

userRouter.post("/signin", async (c) => {
  // initantiated the prisma client:
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());



  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);

    if(!success) {
        c.status(400);
        return c.json({
            message: "Invalid inputs"
        })
    }


    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found " });
    }

    const token = await sign({ userId: user.id }, c.env.JWT_SECRET);

    c.status(200);
    return c.json({
      message: `Welcome ${user.username}`,
      token: `Bearer ${token}`,
    });
  } catch (e: any) {
    c.status(404);
    return c.json({
      message: e.message,
    });
  }
});






