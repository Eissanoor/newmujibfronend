import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GridToolbar } from "@mui/x-data-grid";
import { MuiCustomTable } from "../../utils/MuiCustomTable";
import ActionDropdown from "../../utils/ActionDropdown";
import { DataTableContext } from "../../Contexts/DataTableContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const Datatable = ({
    columnsName = [],
    data,
    actionColumnVisibility,
    uniqueId,
    checkboxSelection,
    processRowUpdate,
    dropDownOptions,
    handleRowClickInParent,
    loading,
    secondaryColor,
    getFilteredOptions,
    showToolbarSlot,
}) => {
    const [selectedRow, setSelectedRow] = useState([]);
    const [record, setRecord] = useState([]);
    const { rowSelectionModel, setRowSelectionModel, setTableSelectedRows, setTableSelectedExportRows } = useContext(DataTableContext);

    const handleRowClick = (item) => {
        if (item && item._id && item._id.includes(uniqueId)) {
            handleRowClickInParent(item);
        }
    };

    useEffect(() => {
        if (data) {
            setRecord(data.map((item, index) => ({ ...item, no: index + 1 })));
        }
    }, [data]);

    const idColumn = [
        {
            field: "no",
            headerName: 'ID',
            width: 30,
        },
    ];

    const actionColumn = [
        {
            field: "action",
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <ActionDropdown
                    row={params.row}
                    dropDownOptions={dropDownOptions || []}
                    getFilteredOptions={getFilteredOptions}
                />
            ),
        },
    ];
const isSmallScreen = useMediaQuery("(max-width:600px)");
    return (
        <>
            <div
                className="datatable"
                style = {{width:'100%' ,overflowX: "auto" ,height:'500px'}}
            >
              <MuiCustomTable
    secondaryColor={secondaryColor ? secondaryColor : null}
    loading={loading}
    getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
    }
    editMode="row"
    processRowUpdate={processRowUpdate ? processRowUpdate : null}
    onProcessRowUpdateError={(params, error) => {
        console.log(error);
    }}
    slots={{
        toolbar: showToolbarSlot !== false && !isSmallScreen ? GridToolbar : undefined
    }}
    rows={record}
    columns={
        actionColumnVisibility !== false
            ? [
                ...idColumn,
                ...(isSmallScreen
                    ? [columnsName[0], ...actionColumn] // Show action column only once on small screens
                    : [...columnsName, ...actionColumn]) // Show action column for each data row on larger screens
            ]
            : [...idColumn, ...(isSmallScreen ? [columnsName[0]] : columnsName)]
    }
    pageSize={30}
    pageSizeOptions={[50, 100, { value: -1, label: "All" }]}
    checkboxSelection={checkboxSelection !== "disabled"}
    getRowId={(row) => row.no}
    rowSelectionModel={rowSelectionModel}
    onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel);
        const selectedRows = record.filter((row) =>
            newRowSelectionModel.includes(row.no)
        );
        setSelectedRow(
            selectedRows.map((item, index) => ({ data: item, index }))
        );
        setTableSelectedRows(selectedRows);
        setTableSelectedExportRows(selectedRows);
        handleRowClick(selectedRows);
    }}
/>

            </div>
        </>
    );
};

export default Datatable;
