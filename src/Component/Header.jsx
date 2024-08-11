import { useEffect, useState } from "react";
import "../Header.css";
import logo from "../../public/img/logo.jpg";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("#ideas"); // Set default to "Ideas"

  const controlHeader = () => {
    if (window.scrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(window.scrollY);
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = activeSection;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        // Adjust 60 based on your header height
        currentSection = `#${section.getAttribute("id")}`;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", controlHeader);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, activeSection]);

  return (
    <header className={`header ${showHeader ? "show" : "hide"}`}>
      <nav className="flex items-center justify-between p-4">
        <div className="logo">
          <img src={logo} alt="Logo" className="h-10" />
        </div>
        <ul className="flex space-x-8">
          <li>
            <a
              href="#work"
              className={`menu-item ${
                activeSection === "#work" ? "active" : ""
              }`}
            >
              Work
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`menu-item ${
                activeSection === "#about" ? "active" : ""
              }`}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`menu-item ${
                activeSection === "#services" ? "active" : ""
              }`}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#ideas"
              className={`menu-item ${
                activeSection === "#ideas" ? "active" : ""
              }`}
            >
              Ideas
            </a>
          </li>
          <li>
            <a
              href="#careers"
              className={`menu-item ${
                activeSection === "#careers" ? "active" : ""
              }`}
            >
              Careers
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`menu-item ${
                activeSection === "#contact" ? "active" : ""
              }`}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
