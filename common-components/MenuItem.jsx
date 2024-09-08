"use client"
import Link from 'next/link';


const MenuItem = ({ href, icon: Icon, label }) => {
  return (
    <li className="mb-3 list-group-item border-0 p-0">
      <Link href={href} passHref className="text-decoration-none">
        <div className="d-flex flex-column align-items-center cursor-pointer p-3 hover:bg-dark rounded transition">
          <Icon size={30} className="mb-0" />
          <span className="mt-2">{label}</span>
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
