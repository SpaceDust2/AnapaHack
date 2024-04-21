"use client"
// pages/admin/index.js

import { useState } from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Главный экран');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <div className="flex h-screen">
      <Head>
        <title>Admin Panel - {activeTab}</title>
      </Head>
      {isSidebarOpen && <Sidebar  activeTab={activeTab} setActiveTab={setActiveTab} />}
      {/* <Sidebar /> */}
      <div className="flex flex-col justify-between flex-grow">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}/>
        <MainContent activeTab={activeTab} />
        <Footer />
      </div>
    </div>
  );
}
