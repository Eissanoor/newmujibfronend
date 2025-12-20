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
                const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                const month = months[date.getMonth()];
                const year = date.getFullYear().toString();
                return `${day}-${month}-${year}`;
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
            doc.setFontSize(8);

            // Card No at top left (in red as per template)
            doc.setTextColor(255, 0, 0); // Red color for card number
            doc.setFont(undefined, 'bold');
            doc.text(`${vehicleData.cardno || ''}`, 0.6, 0.15);
            
            // Date at top right
            doc.setTextColor(0, 0, 0); // Black for date
            doc.setFont(undefined, 'normal');
            doc.text(`${formatDate(vehicleData.VCCGenerationDate)}`, 6.6, 0.15);

            // Left Column Fields - Starting positions based on template
            const leftX = 0.3; // Left column X position
            let leftY = 0.55; // Starting Y position for left column
            const leftLineHeight = 0.18; // Line spacing for left column

            doc.setFont(undefined, 'normal');
            doc.setFontSize(7);
            doc.setTextColor(0, 0, 0);

            // Left Column Fields (matching template positions)
            doc.text(`${vehicleData.load || ''}`, leftX, leftY);
            leftY += leftLineHeight;
            doc.text(`${vehicleData.enginehp || ''}`, leftX, leftY);
            leftY += leftLineHeight;
            doc.text(`${vehicleData.weight || ''}`, leftX, leftY);
            leftY += leftLineHeight;
            doc.text(`${vehicleData.OwnerCode || ''}`, leftX, leftY);
            leftY += leftLineHeight;
            // Importer or Owner - may need to wrap text
            const importerText = vehicleData.importer_or_owner || '';
            doc.text(importerText, leftX, leftY, { maxWidth: 2.5 });
            leftY += leftLineHeight * 1.5;
            doc.text(`${vehicleData.declearationno || ''}`, leftX, leftY);
            leftY += leftLineHeight;
            doc.text(`${formatDate(vehicleData.DeclarationDate)}`, leftX, leftY);

            // Right Column Fields - Starting positions based on template
            const rightX = 4.3; // Right column X position
            let rightY = 0.5; // Starting Y position for right column
            const rightLineHeight = 0.18; // Line spacing for right column

            // Right Column Fields (matching template positions)
            const vehicleType = `${vehicleData.VehicleBrandName || ''} - ${vehicleData.Vehiclemodel || ''} (${vehicleData.vehicltype || ''})`;
            doc.text(vehicleType, rightX, rightY, { maxWidth: 3.5 });
            rightY += rightLineHeight;
            doc.text(`${vehicleData.modelyear || ''} - ${numberToWords(vehicleData.modelyear)}`, rightX, rightY);
            rightY += rightLineHeight;
            doc.text(`${vehicleData.origin || ''}`, rightX, rightY);
            rightY += rightLineHeight;
            doc.text(`${vehicleData.chassisno || ''}`, rightX, rightY);
            rightY += rightLineHeight;
            doc.text(`${vehicleData.color || ''}`, rightX, rightY);
            rightY += rightLineHeight;
            doc.text(`${vehicleData.enginno || ''}`, rightX, rightY);

            // Comments Section - positioned at bottom area
            doc.setFontSize(7);
            doc.text(`${vehicleData.comments || ''}`, 4.3, 3.9);

            // Add QR Code at bottom left (matching template position)
            if (qrCodeBase64) {
                try {
                    // Position QR code at bottom left area
                    doc.addImage(qrCodeBase64, 'PNG', 0.3, 4.7, 1.0, 1.0);
                } catch (e) {
                    console.error("Error adding QR code to PDF:", e);
                }
            }

            // Footer text at bottom right (matching template)
            doc.setFontSize(6);
            doc.setTextColor(100, 100, 100);
            const footerY = 5.5;
            doc.text('هذه الشهادة تم اصدارها الكترونيا', 5.5, footerY);
            doc.text('This is a system generated certificate', 5.5, footerY + 0.12);
            doc.setFontSize(6);
            doc.text('Email: customs@uaqport.ae', 5.5, footerY + 0.24);

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