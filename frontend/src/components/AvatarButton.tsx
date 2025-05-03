import { useNavigate } from "react-router-dom";

export function AvatarButton({
  name,
//   userId,
  size = "small",
}: {
  name: string;
//   userId: string;
  size?: "small" | "big";
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/myBlogs/');
  };

  return (
    <button
      onClick={handleClick}
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
    </button>
  );
}
