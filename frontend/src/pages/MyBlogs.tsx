import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useGetBlog } from "../hooks";

const MyBlogs = () => {
const { loading, blogs } = useGetBlog();

    if (loading) {
        return <div>
            <Appbar username={localStorage.getItem("username") || ""} /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar username={localStorage.getItem("username") || ""}/>
        <div className="flex justify-center px-4">
  <div className="w-full max-w-screen-md">
    {blogs.map(blog => (
      <BlogCard
        key={blog.id}
        id={blog.id}
        authorName={blog.author.username || "Anonymous"}
        title={blog.title}
        content={blog.content}
        publishedDate={blog.date}
      />
    ))}
  </div>
</div>

    </div>
}

export default MyBlogs