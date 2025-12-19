import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";

const VehicleDetailsqrcode = () => {
  let { cardNo } = useParams();
  const [value, setvalue] = useState({
    image: '',
    CardNo: '', VehicalType: '', ModelYear: '',
    EngineHP: '', Origin: '', weight: '',
    chassisNo: '', importerorowner: '', color: '',
    Declaration: '', EngineNo: '', Comments: '',
    Datetime: '', Load: '', qrcode: "",
    Vehicledrive: '', EngineCapacity: '', PassengerCapacity: '',
    CarriageCapacity: '', VehicleBrandName: '', SpecificationStandardName: '',
    VCCGenerationDate: '', DeclarationDate: '', OwnerCode: '',
    Vehiclemodel:'',
  })
  const getapi = () => {
    axios.get(`/get-mirsal/${cardNo}`)
      .then((res) => {
        setvalue((prevValue) => ({
          ...prevValue,
          CardNo: res.data.data.cardno || "",
          VehicalType: res.data.data.vehicltype || "",
          ModelYear: res.data.data.modelyear || "",
          EngineHP: res.data.data.enginehp || "",
          weight: res.data.data.weight || "",
          chassisNo: res.data.data.chassisno || "",
          importerorowner: res.data.data.importer_or_owner || "",
          color: res.data.data.color || "",
          Declaration: res.data.data.declearationno || "",
          EngineNo: res.data.data.enginno || "",
          Comments: res.data.data.comments || "",
          Datetime: res.data.data.Date || "",
          Load: res.data.data.load || "",
          Origin: res.data.data.origin || "",
          Vehicledrive: res.data.data.Vehicledrive,
          EngineCapacity: res.data.data.EngineCapacity || "",
          PassengerCapacity: res.data.data.PassengerCapacity || "",
          CarriageCapacity: res.data.data.CarriageCapacity || "",
          VehicleBrandName: res.data.data.VehicleBrandName || "",
          SpecificationStandardName:
            res.data.data.SpecificationStandardName || "",
          VCCGenerationDate: res.data.data.VCCGenerationDate || "",
          DeclarationDate: res.data.data.DeclarationDate || "",
          OwnerCode: res.data.data.OwnerCode || "",
          Vehiclemodel:res.data.data.Vehiclemodel || ""
        }));
      }).catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getapi()
  }, [])

   const handlePrintTable2 = (tableSelectedRows) => {
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
     const logsss = "https://i.ibb.co/bPNS38G/Printer.png";
     const imageshowss = 0;

     const loadImage1 = new Promise((resolve) => {
       const img1 = new Image();
       img1.crossOrigin = "Anonymous";
       img1.src = logsss;
       img1.onload = () => {
         resolve(img1);
       };
     });

     const loadImage2 = new Promise((resolve) => {
       if (imageshowss) {
         const img2 = new Image();
         img2.crossOrigin = "Anonymous";
         img2.src = imageshowss;
         img2.onload = () => {
           resolve(img2);
         };
       } else {
         resolve(null);
       }
     });
    const QRCodeCell = (props) => {
  const url = `https://mirsal2newdubaitradeae.com/view/VehicleCard/${props.cardNo}`;
  return <QRCode value={url} size={1} />;
};

     Promise.all([loadImage1, loadImage2]).then(([img1, img2]) => {
     const qrCodeContainer = document.createElement("div");
     ReactDOM.render(<QRCodeCell value={value} />, qrCodeContainer);
     const qrCodeHtml = qrCodeContainer.innerHTML;
       doc.addImage(
         img1,
         "JPEG",
         0,
         0,
         doc.internal.pageSize.getWidth(),
         doc.internal.pageSize.getHeight()
       );

       const formatDate = (dateString) => {
         if (!dateString) return ""; // Return empty string if dateString is empty
         const date = new Date(dateString);
         const day = date.getDate().toString().padStart(2, "0");
         const month = (date.getMonth() + 1).toString().padStart(2, "0");
         const year = date.getFullYear().toString();
         return `${day}/${month}/${year}`;
       };

       const tableHtml = `

      </div>
        <div style='position: relative;font-family: Arimo'>
        <p style=" font-size: 0.15px;  margin-top:0.1px ; width:5px; margin-left:0.8px; position: absolute">${value.CardNo}</p>
        <p style="font-size: 0.15px;width:100px; margin-top:0.1px ; margin-left:6.6px; position: absolute "> ${formatDate(value.Datetime)}</p>
         <p style="font-size: 0.15px;  margin-top:0.55px ; width:5px; margin-left:3px; position: absolute">${value.Load}</p>
        <p style=" font-size: 0.15px;  margin-top:0.5px ;width:10px; margin-left:4.3px; position: absolute ">${value.VehicalType}</p>
        <p style=" font-size: 0.15px;  margin-top:1.3px ;width:5px; margin-left:4.3px; position: absolute ">${value.ModelYear}</p>
        <p style=" font-size: 0.15px; font-weight:500;width:5px; margin-top:1.8px ; margin-left:4.3px; position: absolute ">${value.Origin}</p>
        <p style="font-size: 0.15px;  margin-top:2.3px ;width:5px; margin-left:4.3px; position: absolute ">${value.chassisNo}</p>
        <p style="font-size: 0.15px;  margin-top:2.8px ;width:5px; margin-left:4.3px; position: absolute ">${value.color}</p>
        <p style="font-size: 0.15px;  margin-top:3.2px ;width:5px; margin-left:4.3px; position: absolute ">${value.EngineNo}</p>
        <p style="font-size: 0.15px;  margin-top:4px ;width:5px; width:5px; margin-left:4.3px; position: absolute ">${value.Comments}</p>
        <p style="font-size: 0.15px;  margin-top:1.3px ;width:5px; margin-left:0.3px; position: absolute ">${value.EngineHP}</p>
        <p style="font-size: 0.15px;  margin-top:1.8px ;width:5px; margin-left:0.3px; position: absolute ">${value.weight}</p>
        <p style="font-size: 0.15px;  margin-top:2.1px ;width:10px; margin-left:0.3px; position: absolute ">${value.OwnerCode}</p>
        <p style="font-size: 0.15px;  margin-top:2.3px ;width:10px; margin-left:0.3px; position: absolute ">${value.importerorowner}</p>
        <p style="font-size: 0.15px;  margin-top:2.8px ;width:5px; margin-left:0.3px; position: absolute ">${value.Declaration}</p>
      
 <p style="font-size: 0.15px;height: 0.5px;   margin-top:4.9px ;width:4px; margin-left:0.5px; position: absolute ">${qrCodeHtml}</p>
      </div>
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
         callback: () => {
           doc.save("table.pdf");
         },
       });
     });
   };

const formatDate = (dateString) => {
  if (!dateString) return ""; // Return empty string if dateString is empty
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

  return (
    <div className="container text-start">
      <div className="border border-secondary mt-4 ">
        <p className="bg-custom text-white text-start py-lg-3 py-md-3 py-sm-2 py-2 px-3 fw-bolder">
          View VCC Details
        </p>
        <h4
          className="toperheading text-start mx-3 fw-bold"
          style={{ backgroundColor: "white" }}
        >
          VCC/Vehicle Details
        </h4>
        <div className="border border-secondary rounded-top w-100 mt-2  ">
          <div className="mx-lg-3 mx-md-3 mx-sm-0 py-sm-4 py-md-0 py-md-0 py-0 bg-light my-2 mx-sm-2 ">
            <div className="row mx-lg-3 mx-md-3 mx-sm-1 py-2 mx-1 text_lable">
              <div className="col-md-6 col-sm-12 ">
                <div className="row my-2">
                  <p className="col-6 ">VCC No :</p>
                  <p className="col-6 lablevaluecolor">{value.CardNo}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1">
                <div className="row">
                  <p className="col-6 ">VCC Status :</p>
                  <a
                    className="col-6 donloadbuton"
                    style={{ color: "red" }}
                    // onClick={handlePrintTable2}
                  >
                    Printed/Downloaded
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1 ">
                <div className="row">
                  <p className="col-6">VCC Generation Date:</p>
                  <p className="col-6 lablevaluecolor">
                    {formatDate(value.VCCGenerationDate)}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Chassis No:</p>
                  <p className="col-6 lablevaluecolor">{value.chassisNo}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Engine Number:</p>
                  <p className="col-6 lablevaluecolor">{value.EngineNo}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Years of Build:</p>
                  <p className="col-6 lablevaluecolor">{value.ModelYear}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Vehicle Drive:</p>
                  <p className="col-6 lablevaluecolor">{value.Vehicledrive}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Country of Origin:</p>
                  <p className="col-6 lablevaluecolor">{value.Origin}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Engine Capacity:</p>
                  <p className="col-6 lablevaluecolor">
                    {value.EngineCapacity}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Carriage Capacity:</p>
                  <p className="col-6 lablevaluecolor">
                    {value.CarriageCapacity}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Passenger Capacity :</p>
                  <p className="col-6 lablevaluecolor">
                    {value.PassengerCapacity}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Vehicle Model :</p>
                  <p className="col-6 lablevaluecolor">{value.Vehiclemodel}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Vehicle Brand Name :</p>
                  <p className="col-6 lablevaluecolor">
                    {value.VehicleBrandName}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Vehicle Type :</p>
                  <p className="col-6 lablevaluecolor">{value.VehicalType}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Vehicle Color :</p>
                  <p className="col-6 lablevaluecolor">{value.color}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Specification Standard Name :</p>
                  <p className="col-6 lablevaluecolor">
                    {value.SpecificationStandardName}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12  mt-1">
                <div className="row">
                  <p className="col-6">Declaration Number :</p>
                  <p className="col-6" style={{ color: "blue" }}>
                    {value.Declaration}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Declaration Date :</p>
                  <p className="col-6 lablevaluecolor">
                    {formatDate(value.DeclarationDate)}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Owner Code :</p>
                  <p className="col-6 lablevaluecolor">{value.OwnerCode}</p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Owner Name :</p>
                  <p className="col-6 lablevaluecolor">
                    {value.importerorowner}
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 mt-1 ">
                <div className="row">
                  <p className="col-6">Print Remarks :</p>
                  <p className="col-6 lablevaluecolor">{value.Comments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsqrcode;
