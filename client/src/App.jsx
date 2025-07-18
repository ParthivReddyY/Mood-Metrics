
import React from "react";
import './App.css';

function App() {
  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [members, setMembers] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:9000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamName, email, members })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTeamName("");
        setEmail("");
        setMembers("");
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch {
      setMessage("Could not connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-0">
      <nav className="w-full py-6 px-8 flex justify-between items-center bg-white/80 shadow-lg fixed top-0 left-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-purple-700">Synchrony</span>
          <span className="text-lg font-semibold text-pink-500">Hackathon</span>
        </div>
        <a href="#register" className="bg-purple-600 text-white px-5 py-2 rounded-full shadow hover:bg-purple-700 transition font-semibold">Register</a>
      </nav>
      <main className="flex flex-col items-center justify-center w-full pt-32 pb-16 px-4">
        <section className="text-center mb-12">
          <h1 className="text-6xl font-extrabold text-purple-700 drop-shadow-lg mb-4">Synchrony Mini Hackathon 2025</h1>
          <p className="text-xl text-gray-700 mb-6">Build. Innovate. Collaborate. Win!</p>
          <a href="#register" className="inline-block bg-pink-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-pink-600 transition">Join Now</a>
        </section>
        <section className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-8">
          <div>
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">About</h2>
            <p className="text-gray-700 text-lg">Welcome to the Synchrony Mini Hackathon! Unleash your creativity and solve real-world problems with your team. Use modern tools like React and TailwindCSS to build something amazing. Network, learn, and compete for exciting prizes!</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-pink-600 mb-2">How It Works</h2>
            <ol className="list-decimal list-inside text-gray-700 text-lg space-y-1">
              <li>Form a team or go solo</li>
              <li>Pick a challenge</li>
              <li>Design, code, and present your solution</li>
              <li>Win exciting prizes!</li>
            </ol>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Get Started</h2>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-purple-700 transition">Learn React</a>
          </div>
        </section>
        <section id="register" className="mt-16 w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Register Your Team</h2>
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <textarea placeholder="Team Members (comma separated)" value={members} onChange={e => setMembers(e.target.value)} className="border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" rows={2} />
            <button type="submit" className="bg-pink-500 text-white font-bold px-6 py-2 rounded-full shadow hover:bg-pink-600 transition">Submit</button>
          </form>
          {message && <div className="mt-4 text-center text-lg text-purple-600 font-semibold">{message}</div>}
        </section>
      </main>
      <footer className="w-full text-center py-6 text-gray-500 text-sm bg-white/80 mt-8 shadow-inner">&copy; 2025 Synchrony Hackathon. All rights reserved.</footer>
    </div>
  );
}

export default App;
