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
import iimageeee from "../../img/tempp.png"
import { saveAs } from "file-saver";
import QRCodeStyling from "qr-code-styling";
import SettingsIcon from "@mui/icons-material/Settings";

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

    const handlePrintTable2 = (tableSelectedRows) =>
    {
        const pdfWidth = 8.26; // in inches
        const pdfHeight = 6.04; // in inches

        // Create a new jsPDF instance with custom dimensions
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [pdfWidth, pdfHeight],
        });

        const headerStyle =
            "font-weight: bold; background:#3d41cf, color:white ;padding: 5px";
        const logsss = iimageeee;
        const imageshowss = 0;

        const loadImage1 = new Promise((resolve) =>
        {
            const img1 = new Image();
            img1.crossOrigin = "Anonymous";
            img1.src = logsss;
            img1.onload = () =>
            {
                resolve(img1);
            };
        });

        const loadImage2 = new Promise((resolve) =>
        {
            if (imageshowss) {
                const img2 = new Image();
                img2.crossOrigin = "Anonymous";
                img2.src = imageshowss;
                img2.onload = () =>
                {
                    resolve(img2);
                };
            } else {
                resolve(null);
            }
        });
        const QRCodeCell = (props) =>
        {
            const url = `https://mirsal2newdubaitradeae.com/view/VehicleCard/${tableSelectedRows[0].cardno}`;
            return <QRCode value={url} size={100} />;
        };
        Promise.all([loadImage1, loadImage2]).then(([img1, img2]) =>
        {
            doc.addImage(
                img1,
                "JPEG",
                0,
                0,
                doc.internal.pageSize.getWidth(),
                doc.internal.pageSize.getHeight()
            );

            const formatDate = (dateString) =>
            {
                if (!dateString) return ""; // Return empty string if dateString is empty
                const date = new Date(dateString);
                const day = date.getDate().toString().padStart(2, "0");
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const year = date.getFullYear().toString();
                return `${day}/${month}/${year}`;
            };
            var number = parseInt(tableSelectedRows[0].modelyear);
            function numberToWords(number)
            {
                var words = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
                var result = '';

                // Convert each digit to its word equivalent
                number.toString().split('').forEach(function (digit)
                {
                    result += words[parseInt(digit)] + ' ';
                });

                return result.trim(); // Trim any trailing space
            }
            const tableHtml = `
   <div style='position: relative;font-family: Arial; color:black'>
        <p style=" font-size: 0.15px;  margin-top:0.1px ; width:2px; margin-left:0.6px; position: absolute">${tableSelectedRows[0].cardno}</p>
        <p style="font-size: 0.15px;width:100px; margin-top:0.1px ; margin-left:6.6px; position: absolute ">${formatDate(tableSelectedRows[0].VCCGenerationDate)}</p>
        <p style="font-size: 0.15px;  margin-top:0.55px ; width:2px; margin-left:3px; position: absolute">${tableSelectedRows[0].load}</p>
<p style=" font-size: 0.15px;  margin-top:0.5px ;width:2.5px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].VehicleBrandName} - ${tableSelectedRows[0].Vehiclemodel}(${tableSelectedRows[0].vehicltype})</p>
        <p style=" font-size: 0.15px;  margin-top:1.3px ;width:3px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].modelyear} - ${numberToWords(number)}</p>
        <p style=" font-size: 0.15px; font-weight:500;width:3px; margin-top:1.8px ; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].origin}</p>
        <p style="font-size: 0.15px;  margin-top:2.3px ;width:2px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].chassisno}</p>
        <p style="font-size: 0.15px;  margin-top:2.8px ;width:2px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].color}</p>
        <p style="font-size: 0.15px;  margin-top:3.2px ;width:2px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].enginno}</p>
        <p style="font-size: 0.15px;  margin-top:3.9px ;width:2px; width:2px; margin-left:4.3px; position: absolute ">${tableSelectedRows[0].comments}</p>
        <p style="font-size: 0.15px;  margin-top:1.3px ;width:2px; margin-left:0.3px; position: absolute ">${tableSelectedRows[0].enginehp}</p>
        <p style="font-size: 0.15px;  margin-top:1.8px ;width:2px; margin-left:0.3px; position: absolute ">${tableSelectedRows[0].weight}</p>
        <p style="font-size: 0.15px;  margin-top:2.1px ;width:2px; margin-left:0.3px; position: absolute ">${tableSelectedRows[0].OwnerCode}</p>
        <p style="font-size: 0.15px;  margin-top:2.3px ;width:2.5px;line-height: 1; margin-left:0.3px; position: absolute ">${tableSelectedRows[0].importer_or_owner}</p>
<p style="font-size: 0.15px;  margin-top:2.8px ;width:3px; margin-left:0.3px; position: absolute ">${tableSelectedRows[0].declearationno} - ${formatDate(tableSelectedRows[0].DeclarationDate)}</p>       </div>
    `;

            const printContent = `
      <html>
        <head>
          <title>DataGrid Table</title>
          <style>
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              th {
                ${headerStyle}
              }
            }
          </style>
        </head>
        <body>${tableHtml}</body>
      </html>
    `;

            doc.html(printContent, {
                callback: () =>
                {
                    doc.save(`VCCReport_${tableSelectedRows[0].cardno}.pdf`);
                },
            });
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
            downloadQRCodeAsPNG(tableSelectedRows);
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
            <div className="bg">
                <div className="mt-md-3 mt-sm-1 p-lg-3 p-md-3 p-sm-1">
                    <Box sx={{ display: "flex" }}>
                        {/* <Siderbar /> */}
                        <AppBar
                            className="fortrans locationfortrans"
                            position="fixed"
                        ></AppBar>
                        <div
                            style={{
                                height: 450,
                                width: "100%",
                                background: `url("../../img/Printer.png")`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div className='d-flex justify-content-end me-3'>

<SettingsIcon style={{ cursor: 'pointer' }} onClick={handleClick}/>
                            </div>
                            <div className=" justify-content-between my-4 my-sm-2 w-100 d-sm-flex d-md-flex d-lg-flex shadow-sm shadow p-lg-4 p-sm-1 mb-4 bg-white">
                                <h5 className="text-lg-start my-auto text-sm-center d-none d-md-flex">
                                    vehicle List
                                </h5>
                                <div className="d-flex justify-content-md-start justify-content-sm-between ">
                                    <button
                                        type="button"
                                        className="rounded py-1 px-2 mx-1 color2 btnwork "
                                        onClick={() =>
                                        {
                                            navigate("/Create/Createtableprint");
                                        }}
                                    >
                                        <AddCircleOutlineIcon className="me-1" />
                                        Create
                                    </button>

                                    {/* <button
                                        onClick={printerfuunction}
                                        className='rounded py-1 px-2 mx-1 color2 btnwork'
                                    >
                                        <PrintIcon className='me-1' /> Print
                                    </button> */}
                                    <button
                                        onClick={printerfuunction}
                                        className="rounded py-1 px-2 mx-lg-1 mx-1 color2 btnwork"
                                    >
                                        <PictureAsPdfIcon className="me-1" />
                                        PDF
                                    </button>
                                </div>
                            </div>
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
                                    ,
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
                    </Box>
                </div>
            </div>
        </>
    );
}

export default PrinterTableData