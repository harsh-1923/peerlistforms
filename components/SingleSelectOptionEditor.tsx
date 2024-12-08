import Plus from "./icons/Plus";
import Trash from "./icons/Trash";
import InlineEditableField from "./InlineEditableHeader";

const SingleSelectOptionEditor = ({
  options,
  onUpdate,
}: {
  options: string[] | undefined;
  onUpdate: (newOptions: string[]) => void;
}) => {
  const handleOptionSave = (index: number, newText: string) => {
    if (!options) return;
    const updatedOptions = [...options];
    updatedOptions[index] = newText;
    onUpdate(updatedOptions);
  };

  const handleAddOption = () => {
    const newOption = "Option";
    const updatedOptions = options ? [...options, newOption] : [newOption];
    onUpdate(updatedOptions);
  };

  const handleDeleteOption = (index: number) => {
    if (!options) return;

    const updatedOptions = options.filter((_, idx) => idx !== index);
    onUpdate(updatedOptions);
  };
  return (
    <div className="w-full space-y-2">
      {options?.map((option, idx) => (
        <div key={idx} className="w-full flex items-center gap-2 h-8">
          <div className="w-4 aspect-square rounded-full border border-gray-400 cursor-not-allowed"></div>
          <div className="border border-gray-200 w-full h-full rounded-lg flex items-center px-2">
            <InlineEditableField
              style="text-sm"
              initialText={option}
              onSave={(newText) => handleOptionSave(idx, newText)}
            />
          </div>
          <div className="h-full flex items-center">
            <button
              className=" p-0 h-full aspect-square"
              onClick={() => handleDeleteOption(idx)}
            >
              <Trash />
            </button>

            {idx === options.length - 1 && (
              <button
                onClick={handleAddOption}
                className=" h-full aspect-square p-0"
              >
                <Plus />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleSelectOptionEditor;
