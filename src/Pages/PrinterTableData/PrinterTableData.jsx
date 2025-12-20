import React, { useState, useEffect, useContext, useRef } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Siderbar from '../../Component/Sidbar/Siderbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import PrintIcon from '@mui/icons-material/Print'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import { ShipmentRequestColumns } from '../../Datatablesource'
import Datatable from '../../Component/DataTable/Datatable'
import { DataTableContext } from '../../Contexts/DataTableContext'
import QRCode from "qrcode.react";
import iimageeee from "../../img/temp1.1.png"
import { saveAs } from "file-saver";
import QRCodeStyling from "qr-code-styling";
import SettingsIcon from "@mui/icons-material/Settings";
import "./PrinterTableData.css";

function PrinterTableData()
{
    const [getdata, setgetdata] = useState([])
    const { tableSelectedRows, setTableSelectedExportRows } =
        useContext(DataTableContext)
    const [imageshow, setimageshow] = useState()
    const navigate = useNavigate()

    const getapi = () =>
    {
        axios.get(`/get-mirsal`).then(res =>
        {
            setgetdata(res.data.data)
            console.log(res.data.data)
        }).catch(err =>
        {
            console.log(err)
        })
    }

    useEffect(() =>
    {
        getapi()
    }, [])



    const handleRowClickInParent = item =>
    {
        if (!item || item?.length === 0) {
            // setTableSelectedRows(data)
            setTableSelectedExportRows(item)
            return
        }
    }

    const handlePrintTable2 = async (tableSelectedRows) =>
    {
        const pdfWidth = 8.26; // in inches
        const pdfHeight = 6.04; // in inches

        // Create a new jsPDF instance with custom dimensions
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [pdfWidth, pdfHeight],
        });

        const logsss = iimageeee;
        const vehicleData = tableSelectedRows[0];

        // Helper functions
        const formatDate = (dateString) =>
        {
            if (!dateString) return "";
            try {
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
            } catch (e) {
                return dateString || "";
            }
        };

        const numberToWords = (number) =>
        {
            if (!number) return "";
            const words = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
            return number.toString().split('').map(digit => words[parseInt(digit)]).join(' ');
        };

        // Generate QR Code as base64
        const generateQRCodeBase64 = async (url) => {
            try {
                const qrCode = new QRCodeStyling({
                    width: 150,
                    height: 150,
                    data: url,
                    dotsOptions: {
                        color: "#000000",
                        type: "rounded"
                    },
                    backgroundOptions: {
                        color: "#ffffff"
                    }
                });

                return new Promise((resolve) => {
                    const canvas = document.createElement("canvas");
                    canvas.width = 150;
                    canvas.height = 150;
                    qrCode.append(canvas);
                    setTimeout(() => {
                        try {
                            const base64 = canvas.toDataURL("image/png");
                            resolve(base64);
                        } catch (e) {
                            console.error("QR Code canvas error:", e);
                            resolve(null);
                        }
                    }, 800);
                });
            } catch (error) {
                console.error("QR Code generation error:", error);
                return null;
            }
        };

        const loadImage1 = new Promise((resolve) =>
        {
            const img1 = new Image();
            img1.crossOrigin = "Anonymous";
            img1.src = logsss;
            img1.onload = () => resolve(img1);
            img1.onerror = () => resolve(null);
        });

        Promise.all([loadImage1]).then(async ([img1]) =>
        {
            // Add background image
            if (img1) {
                doc.addImage(
                    img1,
                    "JPEG",
                    0,
                    0,
                    doc.internal.pageSize.getWidth(),
                    doc.internal.pageSize.getHeight()
                );
            }

            // Generate QR Code
            const qrUrl = `https://mirsal2newdubaitradeae.com/view/VehicleCard/${vehicleData.cardno}`;
            const qrCodeBase64 = await generateQRCodeBase64(qrUrl);

            // Set text color to black for visibility
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);

            // Card No and Date at top
            doc.setFont(undefined, 'bold');
            doc.text(`No. ${vehicleData.cardno || ''}`, 0.5, 0.4);
            doc.text(`Date: ${formatDate(vehicleData.VCCGenerationDate)}`, pdfWidth - 1.5, 0.4);

            // Left Column - Starting position
            let leftY = 0.7;
            const leftX = 0.5;
            const rightX = 4.5;
            let rightY = 0.7;
            const lineHeight = 0.25;

            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);

            // Left Column Fields
            doc.text(`Load: ${vehicleData.load || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Engine HP: ${vehicleData.enginehp || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Weight: ${vehicleData.weight || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Owner Code: ${vehicleData.OwnerCode || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Importer or Owner: ${vehicleData.importer_or_owner || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Declaration No: ${vehicleData.declearationno || ''}`, leftX, leftY);
            leftY += lineHeight;
            doc.text(`Declaration Date: ${formatDate(vehicleData.DeclarationDate)}`, leftX, leftY);

            // Right Column Fields
            const vehicleType = `${vehicleData.VehicleBrandName || ''} - ${vehicleData.Vehiclemodel || ''} (${vehicleData.vehicltype || ''})`;
            doc.text(`Vehicle Type: ${vehicleType}`, rightX, rightY);
            rightY += lineHeight;
            doc.text(`Model Year: ${vehicleData.modelyear || ''} - ${numberToWords(vehicleData.modelyear)}`, rightX, rightY);
            rightY += lineHeight;
            doc.text(`Origin: ${vehicleData.origin || ''}`, rightX, rightY);
            rightY += lineHeight;
            doc.text(`Chassis No: ${vehicleData.chassisno || ''}`, rightX, rightY);
            rightY += lineHeight;
            doc.text(`Color: ${vehicleData.color || ''}`, rightX, rightY);
            rightY += lineHeight;
            doc.text(`Engine No: ${vehicleData.enginno || ''}`, rightX, rightY);

            // Comments Section
            const commentsY = Math.max(leftY, rightY) + lineHeight;
            doc.text(`Comments: ${vehicleData.comments || ''}`, 0.5, commentsY);

            // Add QR Code at bottom left
            if (qrCodeBase64) {
                try {
                    doc.addImage(qrCodeBase64, 'PNG', 0.5, pdfHeight - 1.8, 1.2, 1.2);
                } catch (e) {
                    console.error("Error adding QR code to PDF:", e);
                }
            }

            // Footer text at bottom right
            doc.setFontSize(7);
            doc.setTextColor(100, 100, 100);
            const footerY = pdfHeight - 0.3;
            doc.text('هذه الشهادة تم اصدارها الكترونيا', pdfWidth - 2, footerY);
            doc.text('This is a system generated certificate', pdfWidth - 2, footerY + 0.15);
            doc.text('Email: customs@uaqport.ae', pdfWidth - 2, footerY + 0.3);

            // Save PDF
            doc.save(`VCCReport_${vehicleData.cardno}.pdf`);
        });
    };

    const downloadQRCodeAsPNG = async (tableSelectedRows) =>
    {

        const cardNumber = tableSelectedRows[0].cardno;
        const url = `https://mirsal2newdubaitradeae.com/VehicleDetail/${cardNumber}`;

        try {
            const qrCode = new QRCodeStyling({
                width: 200,
                height: 200,
                data: url,
                //   image: "../../img/tempp.png", // Replace with your logo image URL
                imageOptions: {
                    crossOrigin: "anonymous", // Ensure cross-origin for the logo
                    margin: 10,
                },
            });

            // Create a canvas element to render the QR code
            const canvas = document.createElement("canvas");
            qrCode.append(canvas);
            console.log(canvas);
            // Wait for a short delay to ensure the QR code is rendered
            await new Promise((resolve) =>
            {
                qrCode.download({
                    name: `qrcode_${cardNumber}`,
                    extension: "png",
                });
                setTimeout(resolve, 500);
            });
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };





    const printerfuunction = (selectedRow) =>
    {
        console.log(tableSelectedRows);
        if (tableSelectedRows.length === 1) {
            handlePrintTable2(tableSelectedRows);
        } else if (tableSelectedRows.length > 1) {
            Swal.fire("Error!", "Select only one row to print the data", "error");
        } else {
            Swal.fire("Error!", `To Select the Row to Print the Data`, "error");
        }
    };

    const handleView = row =>
    {
        navigate(`/view/VehicleCard/${row.cardno}`)
    }

    const handleUpdate = row =>
    {
        navigate(`/Update/VehicleCard/${row.cardno}`)
    }
  const handleClick = () => {
        navigate(`/Change/password`);
  };
    const handleDelete = row =>
    {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success mx-2',
                cancelButton: 'btn btn-danger mx-2'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons
            .fire({
                title: 'Are you sure?',
                text: `You want to delete this ${row.cardno} Card Number`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            })
            .then(result =>
            {
                if (result.isConfirmed) {
                    axios
                        .delete(`/delete-mirsal/${row.cardno}`)
                        .then(res =>
                        {
                            getapi()
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                `Card Number ${row.cardno} has been deleted.`,
                                'success'
                            )
                            getapi()
                        })
                        .catch(err =>
                        {
                            console.log('Error deleting', err)
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Something went wrong!'
                            })
                        })
                }
            })
    }

    return (
        <>
            <div className="table-page-container">
                <div className="table-background-decoration">
                    <div className="table-circle table-circle-1"></div>
                    <div className="table-circle table-circle-2"></div>
                </div>
                
                <div className="table-content-wrapper">
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <AppBar
                            className="fortrans locationfortrans"
                            position="fixed"
                            sx={{ display: 'none' }}
                        ></AppBar>
                        
                        <div className="table-container-wrapper">
                            <div className="settings-icon-wrapper">
                                <div className="settings-icon" onClick={handleClick}>
                                    <SettingsIcon />
                                </div>
                            </div>

                            <div className="table-header-section">
                                <h1 className="table-title">Vehicle List</h1>
                                <div className="table-actions-container">
                                    <button
                                        type="button"
                                        className="modern-action-btn btn-create"
                                        onClick={() => {
                                            navigate("/Create/Createtableprint");
                                        }}
                                    >
                                        <AddCircleOutlineIcon />
                                        Create
                                    </button>
                                    <button
                                        onClick={printerfuunction}
                                        className="modern-action-btn btn-pdf"
                                    >
                                        <PictureAsPdfIcon />
                                        Export PDF
                                    </button>
                                </div>
                            </div>

                            <div className="table-data-container">
                                <Datatable
                                    data={getdata}
                                    columnsName={ShipmentRequestColumns}
                                    checkboxSelection
                                    disableRowSelectionOnClick
                                    disableMultipleSelection
                                    uniqueId="customerListId"
                                    handleRowClickInParent={handleRowClickInParent}
                                    dropDownOptions={[
                                        {
                                            label: "View",
                                            icon: (
                                                <VisibilityIcon
                                                    fontSize="small"
                                                    color="action"
                                                    style={{ color: "rgb(37 99 235)" }}
                                                />
                                            ),
                                            action: handleView,
                                        },
                                        {
                                            label: "Update",
                                            icon: (
                                                <EditIcon
                                                    fontSize="small"
                                                    style={{ color: "rgb(37 99 235)" }}
                                                />
                                            ),
                                            action: handleUpdate,
                                        },
                                        {
                                            label: "Delete",
                                            icon: (
                                                <DeleteIcon
                                                    fontSize="small"
                                                    style={{ color: "#FF0032" }}
                                                />
                                            ),
                                            action: handleDelete,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default PrinterTableData