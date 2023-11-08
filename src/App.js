import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './Chat';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import ListRole from './component/role/ListRole';
import Login from './component/user/Login';
import Home from './component/Home';
import ListProduct from './component/nhaphang/ListProduct';
import Thongke from './component/admin/Thongke';
import ListCoHuu from './component/cohuu/ListCoHuu';
import { Content } from './component/support/Content';
import StudentList from './component/student/StudentList';
function App() {

  return (
    <Router>
      <div className="App">

        <header className="App-header">


          <Routes>
            {/* Quans */}
            <Route path="/role/list" element={<ListRole />} />
            <Route path="/student/list" element={<StudentList />} />
            {/* cabin
          <Route path="/cabin/show" element={<Calendar />} />
          <Route path="/cabin/add" element={<Cabin_add />} />
          
          <Route path="*" element={<NotFound />} /> */}
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/chat" element={<Chat />} />
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Content />} />
            {/* product */}
            <Route path="/product/list" element={<ListProduct />} />
            <Route path="/admin/thongke" element={<Thongke />} />
            <Route path="/cohuu/list" element={<ListCoHuu />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </header>

      </div>
    </Router>
  );
}

export default App;
