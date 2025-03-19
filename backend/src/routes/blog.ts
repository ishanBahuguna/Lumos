import Anthropic from "@anthropic-ai/sdk";
import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { verify } from "hono/jwt";


// import { streamText } from "../streamText";

export const blogRouter = new Hono<{
  Bindings: {
    // connection pool url
    DATABASE_URL: string;
    JWT_SECRET: string;
    ANTHROPIC_API_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

// jwt auth middleware
blogRouter.use("/*", async (c, next) => {
  const header = c.req.header("authorization") || "";
  console.log(header);
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
    const date = new Date();
    const publishedDate = date.toISOString().split("T")[0];

    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        published: true,
        date: publishedDate,
        authorId: c.get("userId"),
      },
    });

    console.log(publishedDate);
    return c.json({
      id: blog.id,
      publishedDate,
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
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      date: true,
      author: {
        select: {
          username: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});


blogRouter.post("/lumi" , async(c) => {

    try {
        const {title , blog} : {title : string , blog : string } = await c.req.json();

        const anthropic = new Anthropic({
            apiKey: c.env.ANTHROPIC_API_KEY // defaults to process.env["ANTHROPIC_API_KEY"]
          });
          
          const msg = await anthropic.messages.create({
            model: "claude-3-7-sonnet-20250219",
            max_tokens:50,
            messages: [{ role: "user", content: `This is a blog u need fix its grammer and make it more catchy don't add more lines if u are not able to fix or understand the text return false nothing else: ${blog}` }],
          });

        //   const lumiRes = msg.content[0]?.type === "text" ? msg.content[0].text : "No response";

          const lumiRes:string = msg.content[0]?.text || "No response"
          console.log(lumiRes);

          return c.json({
            success:true,
            blog:lumiRes
          })
    } catch (e : any) {
        c.status(400)
        return c.json({
            message:e.message
        })
    }

})

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
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        author: {
          select: {
            username: true,
          },
        },
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
