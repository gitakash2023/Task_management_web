"use client"
import Image from 'next/image';

const Logo = () => (
  <div className="logo-container">
    <div className="logo">
      <Image src="/prismInfoways.jfif" alt="Company Logo" width={50} height={50} priority={true}/>
    </div>

    <style jsx>{`
      .logo-container {
       
      }
    `}</style>
  </div>
);

export default Logo;
