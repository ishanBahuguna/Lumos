
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = ({ username }: { username: string }) => {

    return(
    <>
    {/* Modern App Bar */}
    <div className="flex justify-between items-center px-10 py-4 bg-slate-900 shadow-lg border-b border-slate-700 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/blogs" className="text-3xl font-extrabold text-white tracking-wide cursor-pointer">
        Lumos
      </Link>

      {/* Right Section: Button + Avatar */}
      <div className="flex items-center gap-6">
        <Link to={`/publish`}>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-500 transition-transform transform hover:scale-105 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-6 py-2.5"
          >
            + New Post
          </button>
        </Link>

        <Avatar size="big" name={username.charAt(0).toUpperCase()} />
      </div>
    </div>
    </>
    )


//   return (
//     <div className="border-b flex justify-between items-center px-10 py-4 bg-white shadow-sm">
//       {/* Logo */}
//       <Link to="/blogs" className="text-2xl font-bold cursor-pointer">
//         Lumos
//       </Link>

//       {/* Right Section: Button + Avatar */}
//       <div className="flex items-center gap-4">
//         <Link to={`/publish`}>
//           <button
//             type="button"
//             className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5"
//           >
//             New
//           </button>
//         </Link>

//         <Avatar size="big" name={username.charAt(0).toUpperCase()} />
//       </div>
//     </div>
//   );
};
