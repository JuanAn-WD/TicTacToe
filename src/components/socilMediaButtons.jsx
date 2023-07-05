import { FaLinkedin, FaGithub } from 'react-icons/fa';

export const LinkedinButton = () => {
    return (
      <a
        href="https://www.linkedin.com/in/juanan-wd/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-button"
        title="LinkedIn"
      >
        <FaLinkedin className="linkedin-icon" />
      </a>
    );
  };
  
export const GithubButton = () => {
    return (
      <a
        href="https://github.com/JuanAn-WD"
        target="_blank"
        rel="noopener noreferrer"
        className="github-button"
        title="GitHub"
      >
        <FaGithub className="github-icon" />
      </a>
    );
  };
  