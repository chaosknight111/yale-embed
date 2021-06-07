import React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { styles } from "./android-select.style";

type Props = {
  items: any[];
  onSelect: (item: string) => void;
};

export const AndroidSelect: React.FC<Props> = ({ items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const paths = [{ id: "select", label: "Select Care Pathway" }, ...items];

  return (
    <Select
      style={styles.DROP_DOWN_VIEW}
      selectedIndex={selectedIndex}
      value={
        paths[selectedIndex.row]
          ? paths[selectedIndex.row].label
          : paths[0].label
      }
      placeholder="Select Care Pathway"
      onSelect={(index) => {
        const selected = index as IndexPath;
        setSelectedIndex(selected);
        onSelect(paths[selected.row]);
      }}
    >
      {paths.map((item, index) => (
        <SelectItem key={index} title={item.label} />
      ))}
    </Select>
  );
};
