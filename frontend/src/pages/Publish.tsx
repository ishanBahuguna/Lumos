import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../tsconfig";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aiResponse, setAiResponse] = useState<string>("");
  const [showAiBox, setShowAiBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch AI response from backend
  const handleAskAI = async () => {
    try {
      setLoading(true);
      setShowAiBox(true);

      const response = await axios.post(`${BACKEND_URL}/api/v1/blog/lumi`, {
        title,
        blog: description,
      } , {
        headers:{
            Authorization:localStorage.getItem("token")
        }
      });

      setAiResponse(response.data.blog || "No response from AI.");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI response.");
      setLoading(false);
    }
  };

  // Publish the blog
  const handlePublish = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar username={localStorage.getItem("username") || ""} />

      <div className="flex justify-center w-full pt-8">
        <div className={`max-w-screen-lg w-full transition-all ${showAiBox ? 'mr-96' : ''}`}>
          {/* Title Input */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm"
            placeholder="Title"
          />

          {/* Text Editor */}
          <TextEditor value={description} onChange={(e) => setDescription(e.target.value)} />

          {/* Button Container */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handlePublish}
              type="submit"
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            >
              Publish post
            </button>

            {/* Ask AI Button */}
            <button
              onClick={handleAskAI}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition"
            >
              Ask Lumi
            </button>
          </div>
        </div>

        {/* AI Response Box */}
        {showAiBox && (
          <div className="fixed right-8 top-24 w-96 p-6 bg-white border border-gray-300 shadow-xl rounded-lg transition-all">
            <h3 className="text-lg font-semibold mb-4">AI Response</h3>

            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 border-t-4 border-blue-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <p className="text-gray-800 mb-6">{aiResponse}</p>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setDescription(aiResponse);
                  setShowAiBox(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
              >
                Use AI Response
              </button>

              <button
                onClick={() => setShowAiBox(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 transition"
              >
                Keep Original
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Text Editor Component
function TextEditor({
  onChange,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}) {
  return (
    <div className="mt-4">
      <label htmlFor="editor" className="sr-only">Publish post</label>
      <textarea
        id="editor"
        rows={8}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        placeholder="Write an article..."
        required
      />
    </div>
  );
}

export default Publish;