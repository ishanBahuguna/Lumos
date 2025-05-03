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
    console.log(res.userId);
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
    let blog;
    if(body.id) {
        blog = await prisma.blog.update({
            where: {
            id: body.id,
            },
            data: {
            title: body.title,
            content: body.content,
            published: true,
            date: publishedDate,
            },
        });
    } else {
        blog = await prisma.blog.create({
          data: {
            title: body.title,
            content: body.content,
            published: true,
            date: publishedDate,
            authorId: c.get("userId"),
          },
        });
    }

    return c.json({
      id: blog.id,
      publishedDate,
      message: body.id ? "Blog updated successfully" :  "Blog created successfully",
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
  const userId = c.get("userId");
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

blogRouter.get("/myBlogs", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId");
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
        // published: true, // Optional: filter only published blogs
      },
      include: {
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
  } catch (e: any) {}
});

blogRouter.post("/lumi", async (c) => {
  try {
    const { title, blog }: { title: string; blog: string } = await c.req.json();

    const anthropic = new Anthropic({
      apiKey: c.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Remember this is a blog you just have to make it pretty and you are allowed to extend upto 3 to 4 lines but not more than that. Another important thing is that if you are not able to do the job or not able to understand the context of the blog simply say that "Not able to fetch the response : Sorry Lumi is kid of Anthropic Claude and still learning" . Nothing extra should be done you should not even write a title just simple edit what is asked :\n ${blog}`,
        },
      ],
    });

    const lumiRes =
      msg.content[0]?.type === "text" ? msg.content[0].text : "No response";

    //   const lumiRes:string = msg.content[0]?.text || "No response"
    console.log(lumiRes);

    return c.json({
      success: true,
      blog: lumiRes,
    });
  } catch (e: any) {
    c.status(400);
    return c.json({
      message: e.message,
    });
  }
});

// never use body to get id in get request instead use params or query params
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //   const body = await c.req.json();
  const id = c.req.param("id");
  try {
    const userId = c.get("userId");
    const blog = await prisma.blog.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        date: true,
        authorId: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return c.json({
      blog : {
        ...blog,
        userId
      }
    });
  } catch (e: any) {
    c.status(406);
    return c.json({ error: e.message });
  }
});



blogRouter.delete("/:id", async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const id = c.req.param("id");
    try {
      const blog = await prisma.blog.delete({
        where: {
          id,
        },
      });
  
      return c.json({
        message: "Blog deleted successfully",
      });
    } catch (e: any) {
      c.status(406);
      return c.json({ error: e.message });
    }
  });
