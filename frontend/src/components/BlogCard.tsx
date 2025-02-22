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

    // return (
    //     <Link to={`/blog/${id}`} className="block">
    //       <div className="p-6 border border-slate-300 rounded-2xl shadow-lg transition-transform transform hover:scale-105 bg-white max-w-screen-md mx-auto cursor-pointer mb-8">
    //         <div className="flex items-center gap-3 mb-4">
    //           <Avatar name={authorName} />
    //           <div className="text-sm text-slate-700">{authorName}</div>
    //           <div className="w-1 h-1 bg-slate-400 rounded-full" />
    //           <div className="text-sm text-slate-500">{publishedDate}</div>
    //         </div>
      
    //         <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      
    //         <p className="text-md text-slate-600 line-clamp-3">
    //           {content.slice(0, 100) + "..."}
    //         </p>
    //       </div>
    //     </Link>
    //   );
      

    // return (
    //     <Link to={`/blog/${id}`} className="block">
    //       <div className="p-6 border border-slate-300 rounded-2xl shadow-lg transition-transform transform hover:scale-105 bg-white max-w-screen-md mx-auto cursor-pointer">
    //         <div className="flex items-center gap-3 mb-4">
    //           <Avatar name={authorName} />
    //           <div className="text-sm text-slate-700">{authorName}</div>
    //           <div className="w-1 h-1 bg-slate-400 rounded-full" />
    //           <div className="text-sm text-slate-500">{publishedDate}</div>
    //         </div>
      
    //         <h2 className="text-2xl font-bold text-slate-900 mb-2">{title}</h2>
      
    //         <p className="text-md text-slate-600 line-clamp-3">
    //           {content.slice(0, 100) + "..."}
    //         </p>
    //       </div>
    //     </Link>
    //   );


    // return <Link to={`/blog/${id}`}>
    //     <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
    //         <div className="flex">
    //             <Avatar name={authorName} />
    //             <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}</div>
    //             <div className="flex justify-center flex-col pl-2 flex justify-center flex-col">
    //                 <Circle />
    //             </div>
    //             <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
    //                 {publishedDate}
    //             </div>
    //         </div>
    //         <div className="text-xl font-semibold pt-2">
    //             {title}
    //         </div>
    //         <div className="text-md font-thin">
    //             {content.slice(0, 100) + "..."}
    //         </div>
    //     </div>
    // </Link>
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
  