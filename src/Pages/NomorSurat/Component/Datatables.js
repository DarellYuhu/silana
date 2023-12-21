import DataTable from "react-data-table-component";

const Datatables = ({ item }) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">No.</span>,
      selector: (row, index) => row.id,
      sortable: true,
      width: "50px",
    },
    {
      name: <span className="font-weight-bold fs-13">Nomor Surat</span>,
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Perihal</span>,
      selector: (row) => <div>{row.letters?.assignedTo ?? "-"}</div>,
      sortable: true,
      wrap: true,
      style: {
        padding: "10px 0px",
      },
      width: "300px",
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      sortable: true,
      selector: (row) => {
        switch (row.status) {
          case "KOSONG":
            return (
              <span className="badge badge-soft-danger"> {row.status} </span>
            );
          case "DIPAKAI":
            return (
              <span className="badge badge-soft-primary"> {row.status} </span>
            );
          default:
            return (
              <span className="badge badge-soft-success"> {row.status} </span>
            );
        }
      },
    },
    // {
    //   name: <span className="font-weight-bold fs-13">Action</span>,
    //   sortable: false,
    //   width: "80px",
    //   cell: (item) => {
    //     return (
    //       <UncontrolledDropdown className="dropdown d-inline-block">
    //         <DropdownToggle
    //           className="btn btn-soft-secondary btn-sm"
    //           tag="button"
    //         >
    //           <i className="ri-more-fill align-middle"></i>
    //         </DropdownToggle>
    //         <DropdownMenu className="dropdown-menu-end">
    //           <DropdownItem
    //             onClick={() => handleEditClick(item)}
    //             className="edit-item-btn"
    //           >
    //             <i className="mdi mdi-pencil-outline align-bottom me-2 text-muted"></i>
    //             Edit
    //           </DropdownItem>
    //           <DropdownItem
    //             onClick={() => handleDeleteClick(item)}
    //             className="edit-item-btn"
    //           >
    //             <i className="mdi mdi-delete-outline align-bottom me-2 text-muted"></i>
    //             Delete
    //           </DropdownItem>
    //         </DropdownMenu>
    //       </UncontrolledDropdown>
    //     );
    //   },
    // },
  ];

  return (
    <DataTable
      columns={columns}
      data={item}
      pagination
      customStyles={{
        cells: {
          style: {
            width: 100,
          },
        },
      }}
    />
  );
};

export default Datatables;
