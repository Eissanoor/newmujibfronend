import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import logo1 from "../../img/logo1.png";
import logo2 from "../../img/logo2.png";
import logo3 from "../../img/logo3.png";

const DigitalVCCDetails = () => {
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get("ApplicationId");
  
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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const decodeApplicationId = (encodedId) => {
    try {
      // First URL decode, then base64 decode
      const urlDecoded = decodeURIComponent(encodedId);
      const base64Decoded = atob(urlDecoded);
      console.log("Decoded ApplicationId:", base64Decoded);
      return base64Decoded;
    } catch (err) {
      console.error("Error decoding ApplicationId:", err);
      return null;
    }
  };

  const getapi = () => {
    if (!applicationId) {
      setError("ApplicationId parameter is missing");
      setLoading(false);
      return;
    }

    const decodedId = decodeApplicationId(applicationId);
    
    if (!decodedId) {
      setError("Invalid ApplicationId format");
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log("Fetching data for ID:", decodedId);
    axios.get(`/get-mirsal/${decodedId}`)
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data && res.data.data) {
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
            Vehicledrive: res.data.data.Vehicledrive || "",
            EngineCapacity: res.data.data.EngineCapacity || "",
            PassengerCapacity: res.data.data.PassengerCapacity || "",
            CarriageCapacity: res.data.data.CarriageCapacity || "",
            VehicleBrandName: res.data.data.VehicleBrandName || "",
            SpecificationStandardName: res.data.data.SpecificationStandardName || "",
            VCCGenerationDate: res.data.data.VCCGenerationDate || "",
            DeclarationDate: res.data.data.DeclarationDate || "",
            OwnerCode: res.data.data.OwnerCode || "",
            Vehiclemodel: res.data.data.Vehiclemodel || ""
          }));
          setError(null);
        } else {
          setError("No data found for this ApplicationId");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load vehicle details. Please check if the ApplicationId is valid.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getapi();
  }, [applicationId]);

  const formatDate = (dateString) => {
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

  if (loading) {
    return (
      <div className="container text-start">
        <div className="w-100 py-3 px-3" style={{ backgroundColor: "#E6F2FF" }}>
          <div className="d-flex justify-content-between align-items-center flex-nowrap" style={{ gap: "clamp(0.25rem, 1vw, 0.75rem)" }}>
            <div className="d-flex justify-content-start align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo1} alt="Logo 1" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo2} alt="Logo 2" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
            <div className="d-flex justify-content-end align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo3} alt="Logo 3" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
          </div>
        </div>
        <div className="border border-secondary">
          <p className="text-white text-start py-lg-3 py-md-3 py-sm-2 py-2 px-3 fw-bolder" style={{ backgroundColor: "#033268" }}>
            View VCC/Vehicle Details
          </p>
          <div className="w-100 p-5 text-center">
            <p>Loading vehicle details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-start">
        <div className="w-100 py-3 px-3" style={{ backgroundColor: "#E6F2FF" }}>
          <div className="d-flex justify-content-between align-items-center flex-nowrap" style={{ gap: "clamp(0.25rem, 1vw, 0.75rem)" }}>
            <div className="d-flex justify-content-start align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo1} alt="Logo 1" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo2} alt="Logo 2" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
            <div className="d-flex justify-content-end align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
              <img src={logo3} alt="Logo 3" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
          </div>
        </div>
        <div className="border border-secondary">
          <p className="text-white text-start py-lg-3 py-md-3 py-sm-2 py-2 px-3 fw-bolder" style={{ backgroundColor: "#033268" }}>
            View VCC/Vehicle Details
          </p>
          <div className="w-100 p-5 text-center">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container text-start">
      {/* Three Logos at the top */}
      <div className="w-100 py-3 px-3" style={{ backgroundColor: "#E6F2FF" }}>
        <div className="d-flex justify-content-between align-items-center flex-nowrap" style={{ gap: "clamp(0.25rem, 1vw, 0.75rem)" }}>
          <div className="d-flex justify-content-start align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
            <img src={logo1} alt="Logo 1" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
          <div className="d-flex justify-content-center align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
            <img src={logo2} alt="Logo 2" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
          <div className="d-flex justify-content-end align-items-center" style={{ flex: "0 1 auto", minWidth: 0 }}>
            <img src={logo3} alt="Logo 3" className="img-fluid" style={{ maxHeight: "clamp(35px, 8vw, 80px)", objectFit: "contain", width: "auto", height: "auto" }} />
          </div>
        </div>
      </div>
      <div className="border border-secondary ">
        <p className=" text-white text-start py-lg-3 py-md-3 py-sm-2 py-2 px-3 fw-bolder" style={{ backgroundColor: "#033268" }}>
          View VCC/Vehicle Details
        </p>
       
        <div className=" w-100   ">
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

export default DigitalVCCDetails;

