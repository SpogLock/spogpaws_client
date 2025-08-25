"use client";
import "./app-section.css";
import Image from "next/image";

export default function AppSection() {
  return (
    <div className="app-section">
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-6">
            <h1 className="section-heading">GET MORE WITH OUR APP</h1>
            <p className="pt-3">
              Connect with vets anytime anywhere with our mobile app. Download
              the app now on PlayStore.
            </p>
            <div className="row pt-5">
              <div className="col-4">
                <Image
                  src="/apple-btn.png"
                  alt="App Section Image"
                  width={200}
                  height={200}
                />
              </div>
              <div className="col-4">
                <Image
                  src="/google-btn.png"
                  alt="App Section Image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <Image
              src="/app-img.png"
              alt="App Section Image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
