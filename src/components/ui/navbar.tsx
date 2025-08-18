import FilledButton from './filled-button';
import { OutlinedButton } from './ui_core';
import Image from 'next/image';
import Link from 'next/link';


export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-md bg-white py-3">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center flex-grow-1">
            <Link className="navbar-brand d-flex align-items-center me-5" href="/">
              <Image src="/logo.png" alt="SpogPaws Logo" width={180} height={45} className="me-3 mb-3" />
            </Link>
          </div>

          <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu"
            aria-controls="mobileMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse d-none d-md-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-0">
              <li className="nav-item px-1 px-lg-3">
                <Link className="nav-link text-dark fw-medium" href="/">Home</Link>
              </li>
              <li className="nav-item dropdown px-1 px-lg-3">
                <Link className="nav-link dropdown-toggle text-dark fw-medium" href="#" id="vetsDropdown" role="button"
                  data-bs-toggle="dropdown">
                  <span className="d-none d-lg-inline">For Veterinarians</span>
                  <span className="d-lg-none">For Vets</span>
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="/vets/register">Become a vet</Link></li>
                  <li><Link className="dropdown-item" href="#">Support</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown px-1 px-lg-3">
                <Link className="nav-link dropdown-toggle text-dark fw-medium" href="#" id="petOwnerDropdown" role="button"
                  data-bs-toggle="dropdown">
                  <span className="d-none d-lg-inline">For Pet Owners</span>
                  <span className="d-lg-none">Pet Owners</span>
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" href="/find-vets">Connect to vet</Link></li>
                  <li><Link className="dropdown-item" href="/adoption">Adopt a pet</Link></li>
                  <li><Link className="dropdown-item" href="/report-case">Report adoption</Link></li>
                </ul>
              </li>
              <li className="nav-item px-1 px-lg-3">
                <Link className="nav-link text-dark fw-medium" href="/case-studies">Case Studies</Link>
              </li>

              {/* Action Buttons */}
              <li className="nav-item mx-0 mx-lg-2">
                <FilledButton 
                  text="OWN A PET" 
                  className="d-none d-lg-inline-block" 
                  customColor='#25EBC3' 
                  borderColor='#25EBC3' 
                  textColor='#000000'
                />
                <FilledButton 
                  text="GET PET" 
                  className="d-lg-none" 
                  customColor='#25EBC3' 
                  borderColor='#25EBC3' 
                  textColor='#000000'
                />
              </li>
              <li className="nav-item mx-0 mx-lg-2">
                <OutlinedButton 
                  text="I NEED A SPECIALIST" 
                  className="d-none d-lg-inline-block" 
                  customColor='#000000'
                  textColor='#000000'
                />
                <OutlinedButton 
                  text="SPECIALIST" 
                  className="d-lg-none" 
                  customColor='#000000'
                  textColor='#000000'
                />
              </li>

              {/* Border Separator */}
              <li className="nav-item mx-1 mx-lg-4">
                <div className="border-start" style={{ height: '30px' }}></div>
              </li>

              {/* User Login Section */}
              <li className="nav-item px-1 px-lg-3">
                <Link className="nav-link text-dark text-center" href="/login">
                  <i className="bi bi-person-circle fs-4 d-block"></i>
                  <div className="small mt-1">Login</div>
                </Link>
              </li>

              {/* {user !== null && (
                  <li className="nav-item dropdown px-3">
                  <a className="nav-link dropdown-toggle text-dark" href="#" id="userDropdown" role="button"
                    data-bs-toggle="dropdown">
                    Hello, User
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/account">Manage Account</a></li>
                    <li>
                      <Link className="dropdown-item" href="/logout"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle logout logic here
                          console.log('Logout clicked');
                        }}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              )} */}
            </ul>
          </div>

          {/* Offcanvas Menu for Mobile */}
          <div className="offcanvas offcanvas-start d-md-none" tabIndex={-1} id="mobileMenu">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav">
                <li className="nav-item py-2 border-top mt-2 pt-3">
                  <Link className="btn btn-teal rounded-pill text-white px-4 py-2 w-100"
                    href="/adoption">OWN A PET</Link>
                </li>
                <li className="nav-item py-2">
                  <Link className="nav-link text-dark" href="/">Home</Link>
                </li>
                <li className="nav-item dropdown py-2">
                  <Link className="nav-link dropdown-toggle text-dark" href="#" id="vetsDropdownMobile" role="button"
                    data-bs-toggle="dropdown">
                    For Vets
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href="/vets/register">Become a vet</Link></li>
                    <li><Link className="dropdown-item" href="#">Support</Link></li>
                  </ul>
                </li>
                <li className="nav-item dropdown py-2">
                  <Link className="nav-link dropdown-toggle text-dark" href="#" id="petOwnerDropdownMobile" role="button"
                    data-bs-toggle="dropdown">
                    For Pet Owners
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" href="/find-vets">Connect to vet</Link></li>
                    <li><Link className="dropdown-item" href="/adoption">Adopt a pet</Link></li>
                    <li><Link className="dropdown-item" href="/report-case">Report adoption</Link></li>
                  </ul>
                </li>
                <li className="nav-item py-2">
                  <Link className="nav-link text-dark" href="/case-studies">Case Studies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}