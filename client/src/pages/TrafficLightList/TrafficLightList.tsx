import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { MdDelete, MdEditSquare, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TrafficLight, deleteTrafficLight } from "../../store/trafficSlice";
import { useState } from "react";
import Toast from "../../utils/Toast";
import TrafficLightItem from "./TrafficLightItem";
import notfound from "../../assets/notfound.jpg";
import "../../App.css";
import "./TrafficLightList.css";

const columns = [
  { id: "id", label: "id", minWidth: 100, align: "center" },
  { id: "name", label: "Name", minWidth: 100, align: "center" },
  { id: "location", label: "Location", minWidth: 100, align: "center" },
  { id: "lights", label: "Lights", minWidth: 100, align: "center" },
  { id: "actions", label: "Actions", minWidth: 100, align: "center" },
];

export default function TrafficList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const trafficLights: TrafficLight[] = useAppSelector(
    (state) => state.trafficLight.trafficLights
  );

  const onClickDeleteTrafficLight = (id: number) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this traffic light?"
    );

    if (!confirmDeletion) {
      return;
    }
    dispatch(deleteTrafficLight(id));
    Toast.fire({
      icon: "success",
      title: "Traffic Light Deleted Successfully",
    });
  };

  return (
    <>
      {trafficLights.length === 0 ? (
        <div className="not-found-container">
          <h1 className="app-main-heading">No Traffic Lights Found</h1>
          <img
            src={notfound}
            alt="No Traffic Lights Found"
            className="not-found-image"
          />
          <button
            className="app-main-button"
            onClick={() => navigate("/add-traffic-light")}
          >
            Add Traffic Light
          </button>
        </div>
      ) : (
        <div className="traffic-list-container">
          <button
            style={{ alignSelf: "flex-end", margin: "10px" }}
            onClick={() => navigate("/add-traffic-light")}
            className="app-main-button"
          >
            Add Traffic Light
          </button>
          <Paper sx={{ width: "100vw", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align as any}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#293b51",
                          color: "#fff",
                          zIndex: 0,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trafficLights
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((light) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={light.id}
                        className="rowHover"
                      >
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align as any}
                          >
                            {column.id === "id" && light[column.id]}
                            {column.id === "name" && light[column.id]}
                            {column.id === "location" && light[column.id]}
                            {column.id === "lights" && (
                              <TrafficLightItem lightId={light.id} />
                            )}
                            {column.id === "actions" && (
                              <div>
                                <MdEditSquare
                                  color="green"
                                  size={25}
                                  onClick={() =>
                                    navigate(`/traffic-light-edit/${light.id}`)
                                  }
                                />
                                <MdDelete
                                  color="red"
                                  size={25}
                                  onClick={() =>
                                    onClickDeleteTrafficLight(light.id)
                                  }
                                />
                                <MdVisibility
                                  color="blue"
                                  size={25}
                                  onClick={() =>
                                    navigate(`/traffic-light/${light.id}`)
                                  }
                                />
                              </div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={trafficLights.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      )}
    </>
  );
}
