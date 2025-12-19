import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Siderbar from '../../Component/Sidbar/Siderbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./Createtableprint.css";

function Createtableprint()
{

    const navigate = useNavigate();
    const [value, setvalue] = useState({
        image: '',
        CardNo: '', VehicalType: '', ModelYear: '',
        EngineHP: '', Origin: '', weight: '',
        chassisNo: '', importerorowner: '', color: '',
        Declaration: '', EngineNo: '', Comments: '',
        Vehicledrive: '', EngineCapacity: '', PassengerCapacity: '',
        CarriageCapacity: '', VehicleBrandName: '', SpecificationStandardName: '',
        VCCGenerationDate: new Date().toISOString().split('T')[0], DeclarationDate:new Date().toISOString().split('T')[0], OwnerCode: '',
        Datetime: new Date().toISOString().split('T')[0], Load: '',
        Vehiclemodel:'',
    })

    const addtransaction = () =>
    {
        axios
            .post(`/add-mirsal`, {
                cardno: value.CardNo,
                vehicltype: value.VehicalType,
                modelyear: value.ModelYear,
                enginehp: value.EngineHP,
                origin: value.Origin,
                Date: value.Datetime,
                load: value.Load,
                weight: value.weight,
                importer_or_owner: value.importerorowner,
                chassisno: value.chassisNo,
                declearationno: value.Declaration,
                color: value.color,
                enginno: value.EngineNo,
                comments: value.Comments,
                qrcode: value.CardNo,
                Vehicledrive: value.Vehicledrive,
                EngineCapacity: value.EngineCapacity,
                PassengerCapacity: value.PassengerCapacity,
                CarriageCapacity: value.CarriageCapacity,
                VehicleBrandName: value.VehicleBrandName,
                SpecificationStandardName: value.SpecificationStandardName,
                VCCGenerationDate: value.VCCGenerationDate,
                DeclarationDate: value.DeclarationDate,
                OwnerCode: value.OwnerCode,
                Vehiclemodel:value.Vehiclemodel
            })
            .then((res) =>
            {
                Swal.fire(
                    "Created!",
                    `vehicle Card No  ${value.CardNo} has been created successfully`,
                    "success"
                );
                navigate("/Table");
                console.log(res.data);
            })
            .catch((err) =>
            {
                console.log(err);
                Swal.fire("Error!", `${err.response.data.message}`, "error");
            });

    };

    return (
        <>
            <div className="create-page-container">
                <div className="create-background-decoration">
                    <div className="create-circle create-circle-1"></div>
                    <div className="create-circle create-circle-2"></div>
                </div>
                
                <div className="create-content-wrapper">
                    <Box sx={{ display: "flex" }}>
                        <AppBar
                            className="fortrans locationfortrans"
                            position="fixed"
                            sx={{ display: 'none' }}
                        ></AppBar>
                        
                        <div className="create-form-container">
                            <div className="create-header">
                                <h1 className="create-title">
                                    <span className="create-title-icon">
                                        <AddCircleOutlineIcon />
                                    </span>
                                    Create New Vehicle
                                </h1>
                            </div>

                            <div className="create-form-grid">
                                <div className="create-form-group">
                                    <label
                                        htmlFor="CardNo"
                                        className="create-label"
                                    >
                                        Card No<span className="required-star">*</span>
                                    </label>
                                    <input
                                        className="create-input"
                                        id="CardNo"
                                        placeholder="Enter Card No"
                                        type="number"
                                        value={value.CardNo}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                CardNo: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="VehicalType"
                                        className="create-label"
                                    >
                                        Vehicle Type
                                    </label>
                                    <input
                                        className="create-input"
                                        id="VehicalType"
                                        placeholder="Enter Vehicle Type"
                                        type="text"
                                        value={value.VehicalType}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                VehicalType: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="ModelYear"
                                        className="create-label"
                                    >
                                        Model Year
                                    </label>
                                    <input
                                        className="create-input"
                                        id="ModelYear"
                                        placeholder="Enter Model Year"
                                        type="text"
                                        value={value.ModelYear}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                ModelYear: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                                <div className="create-form-group">
                                    <label
                                        htmlFor="Vehiclemodel"
                                        className="create-label"
                                    >
                                        Vehicle Model
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Vehiclemodel"
                                        placeholder="Enter Vehicle Model"
                                        type="text"
                                        value={value.Vehiclemodel}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Vehiclemodel: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="EngineHP"
                                        className="create-label"
                                    >
                                        Engine HP<span className="required-star">*</span>
                                    </label>
                                    <input
                                        className="create-input"
                                        id="EngineHP"
                                        placeholder="Enter Engine HP"
                                        type="text"
                                        value={value.EngineHP}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                EngineHP: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="Origin"
                                        className="create-label"
                                    >
                                        Origin
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Origin"
                                        placeholder="Enter Origin"
                                        type="text"
                                        value={value.Origin}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Origin: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="weight"
                                        className="create-label"
                                    >
                                        Weight
                                    </label>
                                    <input
                                        className="create-input"
                                        id="weight"
                                        placeholder="Enter Weight"
                                        type="text"
                                        value={value.weight}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                weight: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="chassisNo"
                                        className="create-label"
                                    >
                                        Chassis No<span className="required-star">*</span>
                                    </label>
                                    <input
                                        className="create-input"
                                        id="chassisNo"
                                        placeholder="Enter Chassis No"
                                        type="text"
                                        value={value.chassisNo}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                chassisNo: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="importerorowner"
                                        className="create-label"
                                    >
                                        Importer Or Owner
                                    </label>
                                    <input
                                        className="create-input"
                                        id="importerorowner"
                                        placeholder="Enter Importer Or Owner"
                                        type="text"
                                        value={value.importerorowner}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                importerorowner: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="color"
                                        className="create-label"
                                    >
                                        Color
                                    </label>
                                    <input
                                        className="create-input"
                                        id="color"
                                        placeholder="Enter Color"
                                        type="text"
                                        value={value.color}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                color: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="EngineNo"
                                        className="create-label"
                                    >
                                        Engine No
                                    </label>
                                    <input
                                        className="create-input"
                                        id="EngineNo"
                                        placeholder="Enter Engine No"
                                        type="text"
                                        value={value.EngineNo}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                EngineNo: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="Load"
                                        className="create-label"
                                    >
                                        Load
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Load"
                                        placeholder="Enter Load"
                                        type="text"
                                        value={value.Load}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Load: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="Vehicledrive"
                                        className="create-label"
                                    >
                                        Vehicle Drive
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Vehicledrive"
                                        placeholder="Enter Vehicle Drive"
                                        type="text"
                                        value={value.Vehicledrive}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Vehicledrive: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="EngineCapacity"
                                        className="create-label"
                                    >
                                        Engine Capacity
                                    </label>
                                    <input
                                        className="create-input"
                                        id="EngineCapacity"
                                        placeholder="Enter Engine Capacity"
                                        type="text"
                                        value={value.EngineCapacity}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                EngineCapacity: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="PassengerCapacity"
                                        className="create-label"
                                    >
                                        Passenger Capacity
                                    </label>
                                    <input
                                        className="create-input"
                                        id="PassengerCapacity"
                                        placeholder="Enter Passenger Capacity"
                                        type="text"
                                        value={value.PassengerCapacity}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                PassengerCapacity: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="CarriageCapacity"
                                        className="create-label"
                                    >
                                        Carriage Capacity
                                    </label>
                                    <input
                                        className="create-input"
                                        id="CarriageCapacity"
                                        placeholder="Enter Carriage Capacity"
                                        type="text"
                                        value={value.CarriageCapacity}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                CarriageCapacity: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="VehicleBrandName"
                                        className="create-label"
                                    >
                                        Vehicle Brand Name
                                    </label>
                                    <input
                                        className="create-input"
                                        id="VehicleBrandName"
                                        placeholder="Enter Vehicle Brand Name"
                                        type="text"
                                        value={value.VehicleBrandName}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                VehicleBrandName: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="SpecificationStandardName"
                                        className="create-label"
                                    >
                                        Specification Standard Name
                                    </label>
                                    <input
                                        className="create-input"
                                        id="SpecificationStandardName"
                                        placeholder="Enter Specification Standard Name"
                                        type="text"
                                        value={value.SpecificationStandardName}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                SpecificationStandardName: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="OwnerCode"
                                        className="create-label"
                                    >
                                        Owner Code
                                    </label>
                                    <input
                                        className="create-input"
                                        id="OwnerCode"
                                        placeholder="Enter Owner Code"
                                        type="text"
                                        value={value.OwnerCode}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                OwnerCode: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="Declaration"
                                        className="create-label"
                                    >
                                        Declaration
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Declaration"
                                        placeholder="Enter Declaration"
                                        type="text"
                                        value={value.Declaration}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Declaration: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="Datetime"
                                        className="create-label"
                                    >
                                        Date
                                    </label>
                                    <input
                                        className="create-input"
                                        id="Datetime"
                                        type="date"
                                        value={value.Datetime}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Datetime: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="VCCGenerationDate"
                                        className="create-label"
                                    >
                                        VCC Generation Date
                                    </label>
                                    <input
                                        className="create-input"
                                        id="VCCGenerationDate"
                                        type="date"
                                        value={value.VCCGenerationDate}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                VCCGenerationDate: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group">
                                    <label
                                        htmlFor="DeclarationDate"
                                        className="create-label"
                                    >
                                        Declaration Date
                                    </label>
                                    <input
                                        className="create-input"
                                        id="DeclarationDate"
                                        type="date"
                                        value={value.DeclarationDate}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                DeclarationDate: e.target.value,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="create-form-group create-textarea-group">
                                    <label
                                        htmlFor="Comments"
                                        className="create-label"
                                    >
                                        Comments
                                    </label>
                                    <textarea
                                        id="Comments"
                                        value={value.Comments}
                                        onChange={(e) =>
                                        {
                                            setvalue((prevValue) => ({
                                                ...prevValue,
                                                Comments: e.target.value,
                                            }));
                                        }}
                                        className="create-textarea"
                                        placeholder="Enter your Comments"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="create-actions">
                                <button
                                    type="button"
                                    className="create-btn create-btn-back"
                                    onClick={() => navigate("/Table")}
                                >
                                    <ArrowCircleLeftOutlinedIcon />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="create-btn create-btn-save"
                                    onClick={addtransaction}
                                >
                                    <SaveIcon />
                                    Save
                                </button>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Createtableprint