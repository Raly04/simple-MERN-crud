import React, { useContext, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { NavContext } from "../App";
import myaxios from "../utils/axios";

export default function Handler() {
  const [name, setName] = React.useState("");
  const [salary, setSalary] = React.useState("");
  const { cc, setCC } = useContext(NavContext);

  useEffect(() => {
    if (cc?.content) {
      setName(cc.content.name);
      setSalary(cc.content.salary);
    }
  },[]);

  const handleSubmit = async () => {
    switch (cc.action) {
      case "add":
        const resAdd = await myaxios.post("/employe/add", {
          name: name,
          salary: salary,
        });

        if (resAdd?.data?.success) {
          setCC({ ...cc, value: "TableComponent" });
        }
        break;
      case "edit":
        const resEdt = await myaxios.put("/employe/update", {
          id: cc.content._id,
          name: name,
          salary: salary,
        });

        if (resEdt?.data?.success) {
          setCC({ ...cc, value: "TableComponent", content: null });
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 max-w-[240px]">
      <Input
        label="Name"
        placeholder="Enter name"
        value={name}
        onValueChange={setName}
      />

      <Input
        label="Salary"
        type="number"
        placeholder="Enter salary"
        value={salary}
        onValueChange={setSalary}
      />
      <Button onClick={handleSubmit}>Sauvergarder</Button>
    </div>
  );
}
