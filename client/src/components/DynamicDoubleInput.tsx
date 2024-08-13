import {useState} from "react";
import addSign from "../assets/svg/plus.svg";
import trashSign from "../assets/svg/trash.svg";

interface DynamicDoubleInputProps {
  label: string;
  firstPlaceholder: string;
  onChange: (names: string[], classes: string[]) => void;
  error?: string;
}

const DynamicDoubleInput: React.FC<DynamicDoubleInputProps> = ({
  label,
  firstPlaceholder,
  onChange,
  error,
}) => {
  const [fields, setFields] = useState([{firstValue: "", secondValue: ""}]);

  const handleAddField = () => {
    setFields([...fields, {firstValue: "", secondValue: ""}]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    onChange(
      newFields.map(f => f.firstValue),
      newFields.map(f => f.secondValue)
    );
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target;
    const newFields = fields.map((field, i) =>
      i === index ? {...field, [name]: value} : field
    );
    setFields(newFields);
    onChange(
      newFields.map(f => f.firstValue),
      newFields.map(f => f.secondValue)
    );
  };

  return (
    <div className="flex flex-col space-y-2  md:col-span-2">
      <label className="text-littleRockWhite-500">{label}</label>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            name="firstValue"
            value={field.firstValue}
            onChange={event => handleChange(index, event)}
            className="border-2 border-[#D9D9D9] px-5 py-3 rounded-xl w-1/2"
            placeholder={firstPlaceholder}
          />
          <select
            name="secondValue"
            value={field.secondValue}
            onChange={event => handleChange(index, event)}
            className="border-2 border-[#D9D9D9] px-5 py-3 rounded-xl w-1/2"
          >
            <option value="" disabled>
              Select Class
            </option>
            <option value="Peridot">Peridot</option>
            <option value="Jade">Jade</option>
            <option value="Diamond">Diamond</option>
          </select>
          <button
            type="button"
            onClick={handleAddField}
            className="bg-pinkish-10 p-2 rounded-lg"
          >
            <img src={addSign} alt="" className="h-8 w-8" />
          </button>
          {index > 0 && (
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className=" text-white p-3 rounded-lg"
            >
              <img src={trashSign} alt="" className="h-8 w-8" />
            </button>
          )}
        </div>
      ))}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default DynamicDoubleInput;
