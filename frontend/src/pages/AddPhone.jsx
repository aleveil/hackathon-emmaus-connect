import React, { useState } from "react";
import "./AddPhone.css";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function AddPhone() {
  const [ram, setRam] = useState(1);
  const [memory, setMemory] = useState(16);

  const ramValues = [
    { ram: 1, valM: 30 },
    { ram: 2, valM: 40 },
    { ram: 3, valM: 54 },
    { ram: 4, valM: 72 },
    { ram: 6, valM: 108 },
    { ram: 8, valM: 144 },
    { ram: 12, valM: 216 },
    { ram: 16, valM: 288 },
  ];

  const memoryValues = [
    { memory: 16, valS: 31 },
    { memory: 32, valS: 45 },
    { memory: 64, valS: 65 },
    { memory: 128, valS: 95 },
    { memory: 256, valS: 137 },
    { memory: 512, valS: 199 },
    { memory: 1000, valS: 288 },
  ];

  const handleChange = (event) => {
    setRam(Number(event.target.value));
  };

  const handleChangeMemory = (event) => {
    setMemory(Number(event.target.value));
  };

  const valS = memoryValues.find((value) => value.memory === memory)?.valS;
  const valM = ramValues.find((value) => value.ram === ram)?.valM;
  const sum = valS + valM;

  let category = "";
  if (sum >= 0 && sum < 90) {
    category = "1 – HC";
  } else if (sum >= 90 && sum < 165) {
    category = "2 – C";
  } else if (sum >= 165 && sum < 255) {
    category = "3 – B";
  } else if (sum >= 255 && sum < 375) {
    category = "4 – A";
  } else if (sum >= 375) {
    category = "5 – Premium";
  }

  return (
    <div className="AddPhoneCard">
      <div className="CardContainer">
        <FormControl fullWidth>
          <InputLabel id="ram-select-label">RAM</InputLabel>
          <Select
            labelId="ram-select-label"
            id="ram-select"
            value={ram}
            label="RAM"
            onChange={handleChange}
          >
            {ramValues.map((value) => (
              <MenuItem key={value.ram} value={value.ram}>
                {value.ram}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ margin: "30px" }} />
        <FormControl fullWidth>
          <InputLabel id="memory-select-label">Memory</InputLabel>
          <Select
            labelId="memory-select-label"
            id="memory-select"
            value={memory}
            label="Memory"
            onChange={handleChangeMemory}
          >
            {memoryValues.map((value) => (
              <MenuItem key={value.memory} value={value.memory}>
                {value.memory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ margin: "40px" }} />
        <div>Category : {category}</div>
      </div>
    </div>
  );
}

export default AddPhone;
