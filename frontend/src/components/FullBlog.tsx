import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-800 text-gray-100">
          <Appbar username={localStorage.getItem("username") || ""} />
          <main className="flex justify-center flex-1">
            <div className="grid grid-cols-12 gap-8 px-6 sm:px-10 w-full max-w-screen-xl pt-16">
              {/* Blog Content */}
              <article className="col-span-12 md:col-span-8 overflow-x-auto">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
                  {blog.title}
                </h1>
                <p className="text-sm text-gray-400 mt-3">{`Posted on ${blog.date}`}</p>
                <div className="mt-6 text-lg leading-relaxed break-words">
                  {blog.content}
                </div>
              </article>
    
              {/* Author Section */}
              <aside className="col-span-12 md:col-span-4 pl-0 md:pl-8">
                <div className="bg-gray-700 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-gray-300 text-xl font-semibold mb-4">Author</h2>
                  <div className="flex items-center gap-6">
                    <div className="pr-4 flex flex-col justify-center">
                      <Avatar size="big" name={blog.author.username || "Anonymous"} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {blog.author.username || "Anonymous"}
                      </p>
                      <p className="mt-3 text-gray-400">
                        {`${blog.author.username} is an ambitious person who always wanted to share his thoughts in order to make other people fell good `}
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
    
          {/* Footer */}
          <footer className="py-6 text-center text-gray-400">
            © {new Date().getFullYear()} BlogSphere. All rights reserved.
          </footer>
        </div>
      );

};
