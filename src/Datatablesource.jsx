
import QRCode from 'qrcode.react';
const QRCodeCell = props => {
    const url = `https://hutchisonportsuaqe.com/view/VehicleCard/${props.value}`;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
            <QRCode value={url} size={60} />
        </div>
    );
};

export const ShipmentRequestColumns = [
  {
    field: "cardno",
    headerName: "Card No",
    width: 150,
    headerClassName: "header-red",
  },
  {
    field: "vehicltype",
    headerName: "Vehical Type",
    width: 200,
    headerClassName: "header-red",
  },
  {
    field: "modelyear",
    headerName: "Model Year",
    width: 200,
    headerClassName: "header-red",
  },
  {
    field: "chassisno",
    headerName: "Chassis No",
    width: 200,
    headerClassName: "header-red",
  },
  {
    field: "enginno",
    headerName: "Engine No",
    width: 200,
    headerClassName: "header-red",
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
    headerClassName: "header-red",
  },
  {
    field: "origin",
    headerName: "Origin",
    width: 200,
    headerClassName: "header-red",
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 170,
    headerClassName: "header-red",
  },
  {
    field: "VCCGenerationDate",
    headerName: "VCC Generation Date",
    width: 200,
    headerClassName: "header-red",
    valueFormatter: (params) => {
      const dateStr = params.value;
      if (dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      }
      return "";
    },
  },
  {
    field: "qrcode",
    headerName: "QR Code",
    width: 120,
    headerClassName: "header-red",
    sortable: false,
    filterable: false,
    renderCell: (params) => <QRCodeCell value={params.row.cardno} />,
  },
];