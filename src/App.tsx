import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./components/views/home/Home";
import Layout from "./components/views/layout/Layout";
import "./globals.css";
import { store } from "./store/store";
import Employee from "./components/views/employee/Employee";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='employees' element={<Employee />} />
            <Route
              path='*'
              element={
                <div className='w-full max-w-7xl mx-auto text-center shadow bg-gradient-to-b from-primary/5 mt-5 px-5 rounded-md py-8 border'>
                  Oops! Page not found. Error 404 !
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
