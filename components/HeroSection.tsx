import Image from 'next/image';

const HeroSection: React.FC = () => (
  <section className="relative flex flex-col-reverse md:flex-row items-center justify-between gap-8 py-8 md:py-16 px-6 md:px-20 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-50/60 to-transparent rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
    
    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200/50 rounded-full text-blue-800 text-sm font-medium mb-6 backdrop-blur-sm">
        <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
        AI-Powered Education Platform
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight md:leading-tight tracking-tight">
        Reach students with <br />
        <span className="text-blue-800 relative">
          AI-powered content
          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform scale-x-0 animate-pulse"></div>
        </span> on <br />
        their preferred platforms
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed font-light">
        CoEdu leverages <span className="text-blue-800 font-medium">intelligent automation</span> to deliver personalized learning experiences on WhatsApp and more. 
        <span className="text-gray-800 font-medium"> Empower your students</span> with AI-driven interactions, smart content recommendations, and seamless engagement across any platform.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <button className="group relative px-8 py-4 bg-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-900 hover:-translate-y-1 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative flex items-center justify-center gap-2">
            Get Started
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
        
        <button className="group px-8 py-4 bg-white text-blue-800 font-semibold rounded-xl border-2 border-blue-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Demo
          </span>
        </button>
      </div>
      
      <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-blue-600 font-semibold text-xs">J</div>
            <div className="w-8 h-8 bg-green-100 rounded-full border-2 border-white flex items-center justify-center text-green-600 font-semibold text-xs">M</div>
            <div className="w-8 h-8 bg-purple-100 rounded-full border-2 border-white flex items-center justify-center text-purple-600 font-semibold text-xs">A</div>
          </div>
          <span>Trusted by 10,000+ educators using AI-enhanced learning</span>
        </div>
      </div>
    </div>
    
    <div className="flex-1 flex justify-center md:justify-end mb-8 md:mb-0 z-10">
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-blue-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 p-8 rounded-3xl shadow-2xl backdrop-blur-sm border border-white/50 transform group-hover:scale-105 transition-all duration-500">
          <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute top-4 right-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
          <Image 
            src="/images/high-school.jpg" 
            alt="CoEdu Learning Platform" 
            width={280} 
            height={280} 
            className="rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-semibold text-gray-800">WhatsApp</div>
                <div className="text-gray-500">Connected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;