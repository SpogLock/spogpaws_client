import FilledButton from './filled-button';
import { OutlinedButton } from './ui_core';
import Image from 'next/image';

interface User {
  name: string;
  id: string;
}

export default function Navbar() {
  // Mock user state - in a real app, this would come from your auth context/hook
  const user: User | null = null; // Replace with actual auth state

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white py-3">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center flex-grow-1">
            <a className="navbar-brand d-flex align-items-center me-5" href="#">
              <Image src="/logo.png" alt="SpogPaws Logo" width={180} height={45} className="me-3 mb-3" />
            </a>
          </div>

          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu"
            aria-controls="mobileMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-lg-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-1">
              <li className="nav-item px-4">
                <a className="nav-link text-dark fw-medium" href="/">Home</a>
              </li>
              <li className="nav-item dropdown px-4">
                <a className="nav-link dropdown-toggle text-dark fw-medium" href="#" id="vetsDropdown" role="button"
                  data-bs-toggle="dropdown">
                  For Vets
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/vets/register">Become a vet</a></li>
                  <li><a className="dropdown-item" href="#">Support</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown px-4">
                <a className="nav-link dropdown-toggle text-dark fw-medium" href="#" id="petOwnerDropdown" role="button"
                  data-bs-toggle="dropdown">
                  For Pet Owners
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/find-vets">Connect to vet</a></li>
                  <li><a className="dropdown-item" href="/adoption">Adopt a pet</a></li>
                  <li><a className="dropdown-item" href="/report-case">Report adoption</a></li>
                </ul>
              </li>
              <li className="nav-item px-4">
                <a className="nav-link text-dark fw-medium" href="/case-studies">Case Studies</a>
              </li>

              {/* Action Buttons */}
              <li className="nav-item mx-2">
                <FilledButton text="OWN A PET" className="" />
              </li>
              <li className="nav-item mx-2">
                <OutlinedButton text="I NEED A SPECIALIST" className="" />
              </li>

              {/* Border Separator */}
              <li className="nav-item mx-4">
                <div className="border-start" style={{ height: '30px' }}></div>
              </li>

              {/* User Login Section */}
              <li className="nav-item px-3">
                <a className="nav-link text-dark text-center" href="/login">
                  <i className="bi bi-person-circle fs-4 d-block"></i>
                  <div className="small mt-1">Login</div>
                </a>
              </li>

              {user !== null && (
                  <li className="nav-item dropdown px-3">
                  <a className="nav-link dropdown-toggle text-dark" href="#" id="userDropdown" role="button"
                    data-bs-toggle="dropdown">
                    Hello, User
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/account">Manage Account</a></li>
                    <li>
                      <a className="dropdown-item" href="/logout"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle logout logic here
                          console.log('Logout clicked');
                        }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>

          {/* Offcanvas Menu for Mobile */}
          <div className="offcanvas offcanvas-start d-lg-none" tabIndex={-1} id="mobileMenu">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item py-2 border-top mt-2 pt-3">
                  <a className="btn btn-teal rounded-pill text-white px-4 py-2 w-100"
                    href="/adoption">OWN A PET</a>
                </li>
                <li className="nav-item py-2">
                  <a className="nav-link text-dark" href="/">Home</a>
                </li>
                <li className="nav-item dropdown py-2">
                  <a className="nav-link dropdown-toggle text-dark" href="#" id="vetsDropdownMobile" role="button"
                    data-bs-toggle="dropdown">
                    For Vets
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/vets/register">Become a vet</a></li>
                    <li><a className="dropdown-item" href="#">Support</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown py-2">
                  <a className="nav-link dropdown-toggle text-dark" href="#" id="petOwnerDropdownMobile" role="button"
                    data-bs-toggle="dropdown">
                    For Pet Owners
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/find-vets">Connect to vet</a></li>
                    <li><a className="dropdown-item" href="/adoption">Adopt a pet</a></li>
                    <li><a className="dropdown-item" href="/report-case">Report adoption</a></li>
                  </ul>
                </li>
                <li className="nav-item py-2">
                  <a className="nav-link text-dark" href="/case-studies">Case Studies</a>
                </li>
                {/* User Login Section */}
                {!user ? (
                  <li className="nav-item py-2">
                    <a className="nav-link text-dark" href="/login">
                      <i className="bi bi-person-circle fs-4 d-block"></i>
                      <div className="small">Login</div>
                    </a>
                  </li>
                ) : (
                  <li className="nav-item dropdown py-2">
                    <a className="nav-link dropdown-toggle text-dark" href="#" id="userDropdownMobile" role="button"
                      data-bs-toggle="dropdown">
                      Account
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="/account">Manage Account</a></li>
                      <li>
                        <a className="dropdown-item" href="/logout"
                          onClick={(e) => {
                            e.preventDefault();
                            // Handle logout logic here
                            console.log('Logout clicked');
                          }}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}