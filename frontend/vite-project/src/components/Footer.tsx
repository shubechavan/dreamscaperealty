import { Link } from "react-router-dom";
import React from 'react';

function Footer() {
  return (
    <footer className="px-4 pt-12 pb-32 bg-gray-200 border-t border-gray-900">
      <div className="lg:flex lg:justify-evenly">
        <div className="max-w-sm mt-6 text-center lg:mt-0">
          <h6 className="mb-4 text-4xl font-semibold text-gray-700"> 𝓓𝓻𝓮𝓪𝓶𝓼𝓬𝓪𝓹𝓮 𝓡𝓮𝓪𝓵𝓽𝔂</h6>
          <p>
            Dreamscape Realty is your trusted partner in finding the perfect home. Whether you're looking to buy or rent, we provide a wide range of properties to suit every need and budget. Our expert agents are here to guide you through every step of the process, ensuring a smooth and hassle-free experience.
          </p>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/" className="block py-2 text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block py-2 text-gray-600">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/properties" className="block py-2 text-gray-600">
                Property
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/help" className="block py-2 text-gray-600">
                Help
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-center lg:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700">Quick links</h6>
          <ul>
            <li>
              <Link to="/faq" className="block py-2 text-gray-600">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 text-gray-600">
                About us
              </Link>
            </li>
            <li>
              <Link to="/new-property" className="block py-2 text-gray-600">
                New Property
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
