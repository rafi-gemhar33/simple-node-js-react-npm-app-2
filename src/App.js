import React from 'react';
import './App.css';

const App = () => {
  // var test = "fail";
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">DevOps Pipeline Project</h1>
      </header>
      
      <main className="project-overview">
        <h2>1. Introduction</h2>
        <h3>1.1 Project Overview</h3>
        
        <p>
          This project demonstrates the implementation of a modern DevOps pipeline for a React application, 
          incorporating industry-standard practices for continuous integration, containerization, and orchestration. 
          The primary goal is to establish an automated, scalable, and maintainable deployment process that 
          encompasses the entire software development lifecycle.
        </p>
        
        <div className="key-objectives">
          <h4>Key Objectives:</h4>
          <ul>
            <li>Implement automated testing and deployment workflows</li>
            <li>Establish robust version control practices</li>
            <li>Set up containerization for consistent deployment</li>
            <li>Configure Kubernetes for orchestration</li>
            <li>Integrate monitoring and quality assurance tools</li>
          </ul>
        </div>

        <div className="key-objectives">
          <h4>2.2 React Application Setup</h4>
          <ul>
            <li>We used a simple CRA react application with just node & npm as dependency for the reduced complexity.</li>
            <li>Made sure the exposed port of the app is public-ip-address:30007</li>
          </ul>
        </div>
        

        <div className="key-objectives">
          <h4>3.1 CI CD Setup</h4>
          <ul>
            <li>We used minilkube & kubectl via argo-cd to deploy our app.</li>
            <li>Made sure the exposed port of the app is public-ip-address:30007</li>
          </ul>
        </div>

        <div className="key-objectives">
          <h4>4 Conclusion</h4>
          <ul>
            <li>This project successfully demonstrated the implementation of modern DevOps practices in a React application deployment</li>
            <li>Made sure the exposed port of the app is public-ip-address:30007</li>
          </ul>
        </div>


      </main>
    </div>
  );
};

export default App;