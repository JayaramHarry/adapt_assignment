import React, { useState, useEffect } from 'react';

import { AiTwotoneDashboard } from "react-icons/ai";
import { IoPricetagOutline } from "react-icons/io5";
import { FaRegRectangleList } from "react-icons/fa6";
import { MdOutlineLocalShipping } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import { LiaFileImportSolid } from "react-icons/lia";
import { LuSendHorizonal } from "react-icons/lu";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoIosClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { SiGoogletranslate } from "react-icons/si";


import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState('Order');
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [statusOptions] = useState([
    'Pending', 'Accepted', 'AWB Created', 'Ready to Ship', 'Shipped', 'Completed', 'Cancelled'
  ]);
  const [openedPage, setOpenedPage] = useState('Order');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; 
  

  const orders = [
    { 
      channel: 'Phone', 
      orderNo: '#TKN20203754',
      orderDate: '2022-05-04', 
      city: 'Lucknow', 
      customerName: 'Abhishek Dixit', 
      imageUrl: 'images/Shopify.png', 
      orderValue: '0.00', 
      status: 'Pending' 
    },
    { 
      channel: 'Email', 
      orderNo: '#TKN20203753', 
      orderDate: '2022-05-04', 
      city: 'Lucknow', 
      customerName: 'Abhishek Dixit', 
      imageUrl: 'images/Shopify.png', 
      orderValue: '0.00', 
      status: 'Pending'
    },
    { 
      channel: 'Social Media', 
      orderNo: '#TKN20203752',
      orderDate: '2022-05-04', 
      city: 'Lucknow', 
      customerName: 'Abhishek Dixit', 
      imageUrl: 'images/Shopify.png', 
      orderValue: '0.00', 
      status: 'Pending'
    },
  ];

  useEffect(() => {
    setOpenedPage('Order'); // Set default opened page to "Order" when component mounts
  }, []);

  
  useEffect(() => {
    setOpenedPage('Order'); // Set default opened page to "Order" when component mounts
    // Calculate total pages based on the number of orders and items per page
    setTotalPages(Math.ceil(orders.length / itemsPerPage));
  }, [orders.length]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setOpenedPage(option);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, endIndex);

  return (
    <>
    <div className="navbar">
      <div className="navbar-logo">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>
      <div className="navbar-icons">
        <FaRegMoon className="icon" />
        <CiBellOn className="icon" />
        <SiGoogletranslate className="icon" />
      </div>
    </div>
    <div className="app">
      <div className="sidebar">
      <ul>
    {[
      { name: 'Dashboard', icon: <AiTwotoneDashboard />},
      { name: 'Inventory', icon: <IoPricetagOutline /> },
      { name: 'Order', icon: <FaRegRectangleList /> },
      { name: 'Shipping', icon: <MdOutlineLocalShipping /> },
      { name: 'Channel', icon: <CiShare2 /> }
    ].map((option) => (
            <li key={option.name} className={selectedOption === option.name ? 'active' : ''} onClick={() => handleOptionSelect(option.name)}>
               <span className="icon">{option.icon}</span>
              {option.name}
            </li>
          ))}
        </ul>
      </div>
      <div className='main-container'>
      <div className="opened-page">
        {openedPage && <p>{openedPage} <IoIosClose /></p>}
      </div>
      <div className="status-options">
        <ul>
          {statusOptions.map((status, index) => (
            <li key={index} className={selectedStatus === status ? 'selected' : ''} onClick={() => handleStatusSelect(status)}>
              {status}
            </li>
          ))}
        </ul>
      </div>
        <div className='table-contianer'>
        <div className='button-container'>
          <div>
            <button className='input-button'><LiaFileImportSolid /><span>Import Orders</span></button>
            <button><LuSendHorizonal /><span>Accept</span></button>
            <button><MdOutlineLocalPrintshop /><span>Print</span></button>
          </div>
          <button className='refresh-button'><HiOutlineRefresh /><span>Refresh</span></button>
        </div>
        <table className="order-table">
          <thead>
            <tr>
              <th></th>
              <th><input type="checkbox" /></th>
              <th>Channel</th>
              <th>Order No</th>
              <th>Order Date</th>
              <th>City</th>
              <th>Customer Name</th>
              <th>Order Value</th>
              <th>Status</th>
              <th>Operation</th>
            </tr>
          </thead>
        <tbody>
        {paginatedOrders.map((order, index) => (
      <tr key={index}>
        <td>+</td>
        <td><input type="checkbox" /></td>
        <td><img src={order.imageUrl} alt="Channel" width="80" /></td>
        <td><a href="#">{order.orderNo}</a></td>
        <td>{order.orderDate}</td>
        <td>{order.city}</td>
        <td>{order.customerName}</td>
        <td>{order.orderValue}</td>
        <td><p className='order-pending'>{order.status}</p></td>
        <td>
          <select>
            <option value="edit">Actions</option>
            <option value="delete">Delete</option>
            <option value="view">View</option>
          </select>
        </td>
      </tr>   
    ))}
  </tbody>
        </table>
           <div className="pagination">
            <button><IoIosArrowBack /></button>
            <p>{currentPage}</p> 
            <button>
            <MdNavigateNext /> 
            </button> 
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>{totalPages}/Pages</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
