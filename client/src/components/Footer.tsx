export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-3">
            <span className="text-primary text-xl mr-2">
              <i className="ri-book-read-line"></i>
            </span>
            <h2 className="text-lg font-poppins font-bold text-gray-800">MoodReads</h2>
          </div>
          <p className="text-sm text-gray-600 text-center">Find the perfect book for every mood.</p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Privacy</span>
              <span className="text-sm">Privacy Policy</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Terms</span>
              <span className="text-sm">Terms of Service</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <span className="sr-only">Contact</span>
              <span className="text-sm">Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
