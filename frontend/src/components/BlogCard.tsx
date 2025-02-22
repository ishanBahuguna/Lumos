import { Link } from "react-router-dom";


interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {


    return (
        <Link to={`/blog/${id}`} className="block">
          <div className="p-6 mt-16 border border-slate-700 rounded-2xl shadow-lg transition-transform transform hover:scale-105 bg-slate-900 max-w-screen-md mx-auto cursor-pointer mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={authorName} />
              <div className="text-sm text-slate-300">{authorName}</div>
              <div className="w-1 h-1 bg-slate-500 rounded-full" />
              <div className="text-sm text-slate-400">{publishedDate}</div>
            </div>
      
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      
            <p className="text-md text-slate-400 line-clamp-3">
              {content.slice(0, 100) + "..."}
            </p>
          </div>
        </Link>
      );


}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}



export function Avatar({ name, size = "small" }: { name: string; size?: "small" | "big" }) {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
          size === "small" ? "w-8 h-8" : "w-12 h-12"
        }`}
      >
        <span
          className={`${
            size === "small" ? "text-sm" : "text-lg"
          } font-semibold text-white`}
        >
          {name?.charAt(0).toUpperCase() || "?"}
        </span>
      </div>
    );
  }
  