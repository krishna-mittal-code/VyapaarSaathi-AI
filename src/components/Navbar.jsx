import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold text-blue-600">VyapaarSathi AI</h1>

      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
        <Link to="/insights" className="hover:text-blue-600 transition">Insights</Link>
        <Link to="/recommendations" className="hover:text-blue-600 transition">Recommendations</Link>
        <Link to="/ai-summary" className="hover:text-blue-600 transition">Ask AI</Link>
      </div>
    </nav>
  );
}

export default Navbar;