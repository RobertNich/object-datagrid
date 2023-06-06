type ItemProperties = {
  value: string;
  header?: string;
} & (
  | {
      isChip: true;
      color?: MuiColor;
      size?: MuiSize;
      var?: string;
    }
  | {
      isChip?: false;
    }
);

type LinkItem = {
  type: "link";
  url: string;
  text?: string;
  isProperty?: boolean;
  replace?: boolean;
} & ItemProperties;

type TimeItem = {
  type: "time";
  format?: string;
} & ItemProperties;

type FunctionItem = {
  type: "function";
  function: (data: any) => string;
} & ItemProperties;

type BooleanItem = {
  type: "boolean";
  check: any;
  true: any;
  false: any;
} & ItemProperties;

type EnumItem = {
  type: "enum";
  switch: (status: any) => StatusMessage;
} & ItemProperties;

type ImageItem = {
  type: "image";
  imgUrl: string;
  isRound?: boolean;
} & ItemProperties;

type ButtonItem = {
  type: "button";
  buttonText: string;
  color?: MuiButtonColor;
  function: (...args: any) => void;
  functionArgs?: ButtonFunctionArgs[];
} & ItemProperties &
  (
    | {
        hasModal: true;
        title: MuiSize;
        subtitle: string;
      }
    | {
        hasModal?: false;
      }
  );

type MultipleValueItem = {
  type: "multiple-values";
  value2: string;
} & ItemProperties;

type DefaultItem = {
  type?: "currency" | "string" | "number";
} & ItemProperties;

export type DataItem =
  | LinkItem
  | TimeItem
  | FunctionItem
  | BooleanItem
  | EnumItem
  | ImageItem
  | ButtonItem
  | MultipleValueItem
  | DefaultItem;

export type StatusMessage = {
  message: string;
  color: MuiColor;
};

export type MuiColor =
  | "success"
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "warning";

export type MuiButtonColor =
  | "success"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "warning"
  | "inherit";

export type MuiSize = "small" | "medium";

type ButtonFunctionArgs =
  | {
      value?: string | number | boolean;
      key: string;
    }
  | {
      value: string | number | boolean;
      key?: string;
    };
