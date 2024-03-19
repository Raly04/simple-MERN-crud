import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon } from "../assets/iconsJsx/edit.icon";
import { DeleteIcon } from "../assets/iconsJsx/delete.icon";
import { columns } from "../utils/data";
import myaxios from "../utils/axios";
import { NavContext } from "../App";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TableComponent() {
  const [employes, setEmployes] = useState([]);
  const { cc, setCC } = useContext(NavContext);
  const [stats, setStats] = useState({});

  const getStats = async () => {
    const res = await myaxios.get("/employe/get-stats");
    if (res?.data?.success) {
      setStats(res.data.content);
    }
  };

  const getAllEmploye = async () => {
    try {
      const res = await myaxios.get("/employe/get-all");
      console.log(res.data);
      if (res?.data?.success) {
        setEmployes(res.data.content);
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteEmploye = async (employe) => {
    try {
      const res = await myaxios.delete(`/employe/delete/${employe._id}`);
      if (res?.data?.success) {
        getAllEmploye();
        getStats();
      }
    } catch (error) {
      throw error;
    }
  };

  const addEmploye = () => {
    setCC({ value: "Handler", action: "add", content: null });
  };

  const editEmploye = (employe) => {
    setCC({ value: "Handler", action: "edit", content: employe });
  };

  useEffect(() => {
    getAllEmploye();
    getStats();
  }, []);
  const renderCell = React.useCallback((employe, columnKey) => {
    const cellValue = employe[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: "" }}
            description={employe._id}
            name={cellValue}
          >
            {employe.email}
          </User>
        );
      case "salary":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {employe.team}
            </p>
          </div>
        );
      case "obs":
        switch (employe.obs) {
          case "mediocre":
            return (
              <Chip
                className="capitalize"
                color="danger"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
          case "grand":
            return (
              <Chip
                className="capitalize"
                color="success"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );

          default:
          case "mediocre":
            return (
              <Chip
                className="capitalize"
                color="warning"
                size="sm"
                variant="flat"
              >
                {cellValue}
              </Chip>
            );
        }
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span
                onClick={() => editEmploye(employe)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                onClick={() => deleteEmploye(employe)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div className="w-4/6 relative">
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={employes}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="absolute bottom-0 right-0">
          <Tooltip color="success" content="Add user">
            <button
              onClick={addEmploye}
              className="py-1 px-3 rounded-tl-xl rounded-br-xl bg-green-400 font-bold text-gray-500"
            >
              +
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="ml-4 text-gray-500 flex-col gap-2">
        <nav>Total : {stats.totalSalary}</nav>
        <nav>Minimal : {stats.minSalary}</nav>
        <nav>Maximal : {stats.maxSalary}</nav>
      </div>
    </>
  );
}
