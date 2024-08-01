import "./App.css";
import LeftBar from "./containers/LeftBar";
import Content from "./containers/Content";
import Header from "./containers/Header";
import PersonelSearchPage from './PersonelYonetim/PersonelSearchPage';
import ZimmetDetailPage from './ZimmetYonetim/ZimmetDetailPage';
import Dashboard from './page/Dashboard';
import Login from './Login/login'; 
import { useEffect, useState } from "react";

function App() {
  let page;
  const path = window.location.pathname;

  const [isLogin,setIsLogin]=useState();
  
  useEffect(()=>{
     setIsLogin(localStorage.getItem("isLogin")?true:false)
  },[localStorage.getItem("isLogin")])

  if (!isLogin) {
    page = <Login />;
  } else {
    if (path === '/zimmet-page') {
      page = <PersonelSearchPage />;
    } else if (path.startsWith('/zimmet/personel/') && path.endsWith('/zimmet')) {
      page = <ZimmetDetailPage />;
    } else if (path === '/') {
      page = <Dashboard />;
    } else {
      page = <Dashboard />;
    }
  }

  return (
    <div style={{ height: "100%" }}>
      {isLogin ? (
        <>
          <Header id="header" setIsLogin={setIsLogin}/>
          <Content id="content">{page}</Content>
        </>
      ) : (
        page
      )}
    </div>
  );
}

export default App;
