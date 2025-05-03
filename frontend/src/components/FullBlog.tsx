// import { Blog } from "../hooks";
// import { Appbar } from "./Appbar";
// import { Avatar } from "./BlogCard";
// import { useNavigate } from "react-router-dom"; 
// import axios from "axios";
// import { BACKEND_URL } from "../tsconfig";  

// export const FullBlog = ({ blog }: { blog: Blog }) => {
//     const navigate = useNavigate();
//     console.log(blog.title);
//     const handleEditReq = () => { 
//         navigate('/publish' , {
//             state: {
//                 id: blog.id,
//                 title: blog.title,
//                 content: blog.content
//             }   
//         });
//     }


//     const handleDeleteReq = async () => {  
    
//         const res = await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
//             headers: {  
//                 Authorization: localStorage.getItem("token"),
//             },
//      } )

//      navigate('/myBlogs');
//     }



//     return (
//         <div className="min-h-screen flex flex-col bg-gray-800 text-gray-100">
//           <Appbar username={localStorage.getItem("username") || ""} />
//           <main className="flex justify-center flex-1">
//             <div className="grid grid-cols-12 gap-8 px-6 sm:px-10 w-full max-w-screen-xl pt-16">
//               {/* Blog Content */}
//               <article className="col-span-12 md:col-span-8 overflow-x-auto">
//                 <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
//                   {blog.title}
//                 </h1>
//                 <p className="text-sm text-gray-400 mt-3">{`Posted on ${blog.date}`}</p>
//                 <div className="mt-6 text-lg leading-relaxed break-words">
//                   {blog.content}
//                 </div>
//               </article>
    
//               {/* Author Section */}
//               <aside className="col-span-12 md:col-span-4 pl-0 md:pl-8">
//                 <div className="bg-gray-700 rounded-2xl p-6 shadow-lg">
//                   <h2 className="text-gray-300 text-xl font-semibold mb-4">Author</h2>
//                   <div className="flex items-center gap-6">
//                     <div className="pr-4 flex flex-col justify-center">
//                       <Avatar size="big" name={blog.author.username || "Anonymous"} />
//                     </div>
//                     <div>
//                       <p className="text-2xl font-bold text-white">
//                         {blog.author.username || "Anonymous"}
//                       </p>
//                       <p className="mt-3 text-gray-400">
//                         {`${blog.author.username} is an ambitious person who always wanted to share his thoughts in order to make other people fell good `}
//                       </p>
//                     </div>
                    
//                   </div>
//                 </div>
//               </aside>
//                 {/* {blog.userId === blog.authorId && (
//                   <div className="mt-6">
//                     <button onClick={handleEditReq} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                       Edit Blog
//                     </button>
//                     <button onClick={handleDeleteReq} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4">
//                       Delete Blog
//                     </button>
//                   </div>
//                 )} */}


// {blog.userId === blog.authorId && (
//   <div className="mt-8 flex flex-wrap gap-4">
//     <button
//       onClick={handleEditReq}
//       className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform duration-150 text-white font-medium py-2 px-6 rounded-md shadow hover:shadow-lg"
//     >
//       Edit Blog
//     </button>
//     <button
//       onClick={handleDeleteReq}
//       className="bg-red-600 hover:bg-red-700 active:scale-95 transition-transform duration-150 text-white font-medium py-2 px-6 rounded-md shadow hover:shadow-lg"
//     >
//       Delete Blog
//     </button>
//   </div>
// )}

 



//             </div>
//           </main>
    
//           {/* Footer */}
//           <footer className="py-6 text-center text-gray-400">
//             © {new Date().getFullYear()} BlogSphere. All rights reserved.
//           </footer>
//         </div>
//       );

// };




import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";
import { BACKEND_URL } from "../tsconfig";
import { Spinner } from "./Spinner";

export const FullBlog: React.FC<{ blog: Blog }> = ({ blog }) => {
    const [loading, setLoading] = React.useState(false);


  const navigate = useNavigate();

  const handleEditReq = () => {
    navigate("/publish", {
      state: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
      },
    });
  };

  const handleDeleteReq = async () => {
    setLoading(true);
    await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
      headers: {
        Authorization: localStorage.getItem("token") || "",
      },
    });
    navigate("/myBlogs");
  };
  
  if(loading) {
    return (
        <Spinner/>
    )
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 text-gray-100">
      <Appbar username={localStorage.getItem("username") || ""} />

      <main className="flex justify-center flex-1">
        <div className="grid grid-cols-12 gap-8 px-6 sm:px-10 w-full max-w-screen-xl pt-16">
          <article className="col-span-12 md:col-span-8 overflow-x-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-400 mt-3">{`Posted on ${blog.date}`}</p>
            <div className="mt-6 text-lg leading-relaxed break-words">
              {blog.content}
            </div>

            {blog.userId === blog.authorId && (
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleEditReq}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform duration-150 text-white font-medium py-2 px-6 rounded-md shadow hover:shadow-lg"
                >
                  Edit Blog
                </button>
                <button
                  onClick={handleDeleteReq}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 transition-transform duration-150 text-white font-medium py-2 px-6 rounded-md shadow hover:shadow-lg"
                >
                  Delete Blog
                </button>
              </div>
            )}
          </article>

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
                    {`${blog.author.username || "Anonymous"} is an ambitious person who always wanted to share their thoughts to inspire others.`}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400">
        © {new Date().getFullYear()} BlogSphere. All rights reserved.
      </footer>
    </div>
  );
};

