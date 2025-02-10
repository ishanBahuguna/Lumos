import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign, decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    // connection pool url
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// jwt auth middleware
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";

  try {
    if (!header) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    const token = header.split(" ")[1];

    //   in cloudflare decode just to get whats in payload/token
    const res = await verify(token, c.env.JWT_SECRET);

    if (!res) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    c.set("userId", String(res.userId));
    await next();
  } catch (err) {
    return c.json({
      error: "Internal Server Error!",
    });
  }
});


// Todo: integrate an LLM model so that if the user doesn't provide a title it will automatically be generated
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({
      id: blog.id,
      message: "Blog created successfully",
    });
  } catch (e: any) {
    c.status(406);
    return c.json({ error: e.message });
  }
});

blogRouter.post("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({
      id: blog.id,
      message: "Blog updated successfully",
    });
  } catch (e: any) {
    c.status(406);
    return c.json({ error: e.message });
  }
});


//Todo : add pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    console.log(c.get("userId"));
    const blogs = await prisma.blog.findMany();
    
    return c.json({
    blogs
});
});


// never use body to get id in get request instead use params or query params
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

//   const body = await c.req.json();
  const id = c.req.param("id");
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id,
      },
    });

    return c.json({
      blog,
    });
  } catch (e: any) {
    c.status(406);
    return c.json({ error: e.message });
  }
});
