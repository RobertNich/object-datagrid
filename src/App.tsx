import "./App.css";
import { ThemeProvider, Typography } from "@mui/material";
import { DataGrid } from "./components/common/DataGrid";
import { DataItem, StatusMessage } from "./types/DataItem";
import { Ratings } from "./enums/EmployeeEnums";
import { testData } from "./data/TestData";
import { darkTheme } from "./themes/MainTheme";

const getRating = (rating: Ratings) => {
  let ratingName = Ratings[rating];
  let color;

  switch (rating) {
    case Ratings.Terrible:
      color = "error";
      break;
    case Ratings.VeryBad:
      color = "error";
      break;
    case Ratings.Bad:
      color = "warning";
      break;
    case Ratings.BelowAverage:
      color = "warning";
      break;
    case Ratings.Average:
      color = "secondary";
      break;
    case Ratings.AboveAverage:
      color = "secondary";
      break;
    case Ratings.Good:
      color = "primary";
      break;
    case Ratings.Great:
      color = "primary";
      break;
    case Ratings.Amazing:
      color = "success";
      break;
    case Ratings.Excellent:
      color = "success";
      break;
    default:
      color = "info";
      ratingName = "Unknown Status";
      break;
  }

  return {
    color,
    message: ratingName,
  } as StatusMessage;
};

const cellProperties: DataItem[] = [
  {
    type: "string",
    value: "name",
  },
  {
    type: "number",
    value: "employee_id",
  },
  {
    type: "enum",
    value: "rating",
    switch: getRating,
  },
  {
    type: "currency",
    value: "salary",
  },
  {
    type: "time",
    header: "employment date",
    value: "start_date",
    format: "DD/MM/YY",
  },
];

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Typography variant="h3" sx={{ marginBottom: 2 }}>
          Example Datagrid using objects.
        </Typography>
        <DataGrid data={testData} cellProperties={cellProperties} />
      </ThemeProvider>
    </>
  );
}

export default App;
