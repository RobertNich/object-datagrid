import { DataItem } from "../types/DataItem";
import { ReactElement } from "react";

export function getColumnTitle(data: DataItem) {
  let columnHeading = data.header ? data.header : data.value;

  if (!data.header && data.value.includes(".")) {
    const lastWord = columnHeading.match(/([^.]*)$/gm);
    columnHeading = lastWord !== null ? lastWord[0] : data.value;
  }

  columnHeading = columnHeading.replace(/_|-|\./gm, " ");
  columnHeading = columnHeading.replace(/\b(\w)/gm, (firstLetter) =>
    firstLetter.toUpperCase()
  );
  if (data.type === "currency") {
    columnHeading = columnHeading + " (CAF)";
  }

  return columnHeading;
}

export function newGetColumnTitle(data: ReactElement) {
  if (data) {
    let columnHeading = data.props.header
      ? data.props.header
      : data.props.children;

    if (!data.props.header && data.props.children.includes(".")) {
      const lastWord = columnHeading.match(/([^.]*)$/gm);
      columnHeading = lastWord !== null ? lastWord[0] : data.props.children;
    }

    columnHeading = columnHeading.replace(/_|-|\./gm, " ");
    columnHeading = columnHeading.replace(/\b(\w)/gm, (firstLetter: string) =>
      firstLetter.toUpperCase()
    );

    return columnHeading;
  } else return "unknown heading";
}
