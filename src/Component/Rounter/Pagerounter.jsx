import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import your pages
import PrinterTableData from '../../Pages/PrinterTableData/PrinterTableData';
import Createtableprint from '../../Pages/PrinterTableData/Createtableprint';
import DataTableProvider from '../../Contexts/DataTableContext';
import UpdataVehicle from '../../Pages/PrinterTableData/UpdataVehicle';
import ViewVehicle from '../../Pages/PrinterTableData/ViewVehicle';
import VehicleDetailsqrcode from '../../Pages/PrinterTableData/VehicleDetailsqrcode';
import Downloads from '../../Pages/PrinterTableData/Downloads';
import Login from '../../Pages/Login/Login';
import ChangePasswordForm from '../../Pages/Setting/PasswordChange/ChangePasswordForm';

function App() {
    return (
        <DataTableProvider>
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/Table' element={<PrinterTableData />} />
                    <Route path='/Create/Createtableprint' element={<Createtableprint />} />
                    <Route path='/Update/VehicleCard/:userId' element={<UpdataVehicle />} />
                    <Route path='/view/VehicleCard/:userId' element={<ViewVehicle />} />
                    
                    <Route path='/VehicleDetail/:cardNo' element={<VehicleDetailsqrcode />} />
                    
                    <Route path='/Change/password' element={<ChangePasswordForm />} />
                    <Route path='/Download' element={<Downloads />} />

            </Routes>
        </BrowserRouter>
        </DataTableProvider>
    );
}

export default App;
