import React, { useState } from "react";

const SegmentPopup = ({ onSave }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "First Name" },
    { label: "Last Name", value: "Last Name" },
    { label: "Gender", value: "Gender" },
    { label: "Age", value: "Age" },
    { label: "Account Name", value: "Account Name" },
    { label: "City", value: "City" },
    { label: "State", value: "State" },
  ]);
  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://webhook.site/f7e7690c-3672-4f82-bec0-a0e31841646d", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedSchemas),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data submitted");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setSelectedSchemas([...selectedSchemas, selectedSchema]);
      setAvailableSchemas(
        availableSchemas.filter((schema) => schema.value !== selectedSchema)
      );
      setSelectedSchema("");
    }
  };

  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };

  return (
    <div className="popup">
      <form>
        <label>
          Enter the name of the Segment   
          <input
            type="text"
            value={segmentName}
            placeholder="Name of the Segment"
            onChange={handleSegmentNameChange}
          />
        </label>
        <p> To save your segments, You need to add the schemas to build the query</p>
      <span className="dot"></span>
      <p className='traits'> -User Traits</p>
      <span className="dot1"></span>
      <p className='traits'> -Group Traits</p>
      <div className="selected-schemas">
         {selectedSchemas.map((schema) => (
            <div>
              <select>
                <option>{schema}</option>
              </select>
              <button className="delete" type="button">---</button>
            </div>
          ))}
        </div>
        <label>
          <select value={selectedSchema} onChange={handleSchemaChange}>
            <option value="">Add schema to segment</option>
            {availableSchemas.map((schema) => (
              <option key={schema.value} value={schema.value}>
                {schema.label}
              </option>
            ))}
          </select>
          <button type="button" id="add-btn" onClick={handleAddSchema}>
            +<u> Add new schema</u>
          </button>
        </label>
        <button type="button" id="save-btn" onClick={handleSubmit}>
          Save the segment
        </button>
        <button type="button" id="cancel-btn">
          Cancel X
        </button>
      </form>
    </div>
  );
};

export default SegmentPopup;