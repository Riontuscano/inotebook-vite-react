import React from 'react';

const AboutPage = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'CSS', level: 75 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <img 
              src={`https://avatar.iran.liara.run/public/boy?username=rio`}
              alt="Profile"
              className="rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
            <p className="text-xl text-gray-600">Full Stack Developer</p>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-gray-600">
              I'm a passionate developer with 5+ years of experience building web applications.
              I love creating intuitive user interfaces and solving complex problems.
              When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
            </p>
          </div>

          {/* Skills Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="relative pt-1">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div 
                      className="h-2 bg-blue-500 rounded"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
            <div className="flex justify-center space-x-6">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Email Me
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;