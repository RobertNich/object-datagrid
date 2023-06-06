import { Button, Chip, Typography, useTheme } from "@mui/material";
import _ from "lodash";
import { Link } from "react-router-dom";
import { DataItem } from "../../types/DataItem";
import { formatCents } from "../../utils/MoneyUtil";
import { ConfirmModal } from "./ConfirmModal";
import { DateItem } from "./DateItem";

interface IDataItemValueProps {
  itemData: any;
  itemProperties: DataItem;
}

export const DataItemValue = ({
  itemData,
  itemProperties,
}: IDataItemValueProps) => {
  const theme = useTheme();
  let itemValue = _.get(itemData, itemProperties.value, "unknown");
  const InitialValue = () => {
    if (itemProperties.type === "function") {
      const functionReturn = itemProperties.function(itemData);
      return <Typography>{functionReturn}</Typography>;
    }

    if (itemProperties.type === "link") {
      const link = itemProperties.url.replace("{value}", itemValue);
      const linkText =
        itemProperties.isProperty && itemProperties.text
          ? _.get(itemData, itemProperties.text, itemProperties.text)
          : itemProperties.text
          ? itemProperties.text
          : itemValue;

      return (
        <Link to={itemProperties.replace ? `/app/${link}` : link}>
          <Typography
            color={
              itemProperties.isChip ? theme.palette.common.white : undefined
            }
          >
            {linkText}
          </Typography>
        </Link>
      );
    }

    if (itemProperties.type === "time") {
      return (
        <DateItem
          time={itemValue}
          format={
            itemProperties.format ? itemProperties.format : "MM:DD:YYYY HH:MM"
          }
        />
      );
    }

    if (itemProperties.type === "enum") {
      const test = itemProperties.switch(itemValue);
      return <Chip label={test.message} color={test.color} size="small" />;
    }

    if (itemProperties.type === "currency") {
      itemValue = formatCents(itemValue);
    }

    if (itemProperties.type === "string") {
      itemValue = itemValue.replace(/\b(\w)/gm, (firstLetter: string) =>
        firstLetter.toUpperCase()
      );
    }

    return <Typography>{itemValue}</Typography>;
  };

  if (itemProperties.type === "image") {
    const imageUrl = _.get(itemData, itemProperties.imgUrl, "");
    return (
      <img
        src={imageUrl}
        alt={itemValue}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: itemProperties.isRound ? "50%" : 0,
        }}
      />
    );
  }

  if (itemProperties.type === "button") {
    const { functionArgs, hasModal, buttonText, color } = itemProperties;
    let args: any[] = [];
    if (functionArgs) {
      functionArgs.map((item: any) => {
        if (item.value) {
          args.push(item.value);
        } else if (item.key) {
          args.push(_.get(itemData, item.key, ""));
        }
      });
    }

    if (hasModal) {
      return (
        <ConfirmModal
          {...itemProperties}
          onSubmitFunction={() => itemProperties.function(...args)}
        />
      );
    } else {
      return (
        <Button color={color} onClick={() => itemProperties.function(...args)}>
          {buttonText}
        </Button>
      );
    }
  }

  if (itemValue === "unknown" && itemProperties.type !== "function") {
    return <></>;
  }

  if (itemProperties.isChip) {
    if (itemProperties.var) {
      const chipVar = _.get(itemData, itemProperties.var, "unknown");
      return chipVar ? (
        <Chip
          color={itemProperties.color}
          size={itemProperties.size}
          label={<InitialValue />}
        />
      ) : (
        <></>
      );
    }

    return (
      <Chip
        color={itemProperties.color}
        size={itemProperties.size}
        label={<InitialValue />}
      />
    );
  }
  return <InitialValue />;
};
