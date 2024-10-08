import React from 'react';
import './DashboardPage.css'
import SideNav from './components/sidenav/SideNav';
import MainPage from './components/mainpage/MainPage';
import { useParams } from 'react-router-dom';

const DashboardPage = () => {

  const organization = useParams().organization;
  const classs = useParams().class;

  return (
    <div className='dashboard-container'>
        <SideNav organization={organization} />
        <MainPage classs={classs} />
    </div>
  )
}

export default DashboardPage