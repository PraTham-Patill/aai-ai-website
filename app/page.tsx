import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Zap, LineChart } from "lucide-react"
import { DemoChat } from "@/components/demo-chat"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050714] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#050714]/80 border-b border-[#1a1f36]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-blue-500"
          >
            Aai.ai
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-teal-400 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-300 hover:text-teal-400 transition-colors">
              About
            </Link>
            <Link href="/signin" className="text-gray-300 hover:text-teal-400 transition-colors">
              Sign In
            </Link>
            <Link href="/signup" className="text-gray-300 hover:text-teal-400 transition-colors">
              Sign Up
            </Link>
          </nav>
          <div className="flex space-x-3">
            <Link href="/signin">
              <Button variant="outline" className="border-teal-400 text-teal-400 hover:bg-teal-400/10">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-teal-400 to-purple-500 hover:from-teal-500 hover:to-purple-600 text-white border-0">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div id="particles-js" className="absolute inset-0 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050714]"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-blue-500">
              Aai.ai
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Your AI companion for creativity and productivity
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white text-lg py-6 px-8 rounded-full border-0 w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400/10 text-lg py-6 px-8 rounded-full w-full sm:w-auto"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Chat Section */}
      <section className="py-16 bg-[#080a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <DemoChat />
            <p className="text-center mt-6 text-gray-400">Sign in or sign up to unlock full access</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#050714]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-500">Powerful</span>{" "}
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-[#0c1025] p-8 rounded-xl border border-[#1a1f36] hover:border-teal-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] group">
              <div className="w-14 h-14 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Task Automation</h3>
              <p className="text-gray-400">Automate repetitive tasks and workflows with our advanced AI algorithms.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0c1025] p-8 rounded-xl border border-[#1a1f36] hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(192,132,252,0.3)] group">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Creative Assistance</h3>
              <p className="text-gray-400">
                Generate high-quality content for various purposes with our creative AI engine.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0c1025] p-8 rounded-xl border border-[#1a1f36] hover:border-blue-400 transition-all duration-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] group">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Insights</h3>
              <p className="text-gray-400">
                Get valuable insights and analytics to make data-driven decisions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#080a1a] border-t border-[#4B5563]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-sm text-gray-400">© 2025 Aai.ai | Created by Pratham Patil</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0">
              <div className="flex space-x-6 sm:mr-8">
                <Link href="#" className="text-sm text-gray-400 hover:text-[#00E5FF] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-gray-400 hover:text-[#00E5FF] transition-colors">
                  Terms of Service
                </Link>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#00E5FF] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#00E5FF] transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-github"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/pratham-patil-948b01248/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00E5FF] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

