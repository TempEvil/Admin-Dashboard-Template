/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, type TableColumn } from "react-data-table-component";
import { HStack, Box, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { t } from "i18next";
// Components
import { Tooltip } from "@/components/ui/tooltip";
// Import Image
import NoImage from "@/assets/imgs/no_image.png";
// Import Icons
import IconView from "@/assets/icons/icon_view.png";
import IconEdit from "@/assets/icons/icon_edit.png";
import IconDelete from "@/assets/icons/icon_delete.png";

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function generateTableHeader<T>(
  headersArray: Array<{
    label: string;
    width?: string;
    center?: boolean;
    value: string;
  }>,
  actions: string[] = [],
  events: ((row: T) => void)[] = []
): Partial<TableColumn<T>>[] {
  const columns: Array<Partial<TableColumn<T>>> = [];
  const isBooleanData = [
    "includedBreakfast",
    "isRequestable",
    "isOffsite",
    "isAdditionalCharge",
    "isFree",
    "isVisibleProduct",
    "isVisibleService",
    "isVisibleRoomType",
  ];
  const isArrayData = ["telephone", "email", "policy", "roomAmenities"];

  headersArray.map((header, index) => {
    const column: Partial<TableColumn<T>> = {
      name: t(header.label).toUpperCase(),
      width: header.width,
      center: header.center,
    };

    if (header.value.toLowerCase().includes("distance")) {
      column.cell = (row: any) => {
        const value = row[header.value];
        const display = typeof value === "number" ? `${value} km` : "N/A";
        return (
          <Tooltip content={display} positioning={{ placement: "bottom" }} openDelay={500} showArrow>
            <span>{display}</span>
          </Tooltip>
        );
      };
    } else if (isBooleanData.includes(header.value)) {
      column.cell = (row: any) => {
        const flag = row[header.value];
        return (
          <Tooltip showArrow positioning={{ placement: "bottom" }} content={<Text>{flag ? "Allow" : "Not Allow"}</Text>}>
            <Text>{flag ? "Allow" : "Not Allow"}</Text>
          </Tooltip>
        );
      };
    } else if (isArrayData.includes(header.value)) {
      column.cell = (row: any) => {
        const arr = Array.isArray(row[header.value]) ? row[header.value] : [];
        if (arr.length === 0) {
          return <span>0</span>;
        }
        return (
          <Tooltip
            content={
              <Box as="ul" listStyleType="decimal" listStylePosition="inside" m={0} p={0}>
                {arr.map((t: string, i: number) => (
                  <Box as="li" key={i} textIndent="0.5rem">
                    {t}
                  </Box>
                ))}
              </Box>
            }
            positioning={{ placement: "bottom" }}
            openDelay={500}
            showArrow
          >
            <span>{arr.length}</span>
          </Tooltip>
        );
      };
    } else if (header.value === "nearbyLocation") {
      column.cell = (row: any) => {
        const value = row[header.value];
        const items = Array.isArray(value) ? value : [];
        return (
          <Tooltip
            content={
              <Box as="ul" listStyleType="decimal" listStylePosition="inside" m={0} p={0}>
                {items.map((entry: any, i: number) => (
                  <Box as="li" key={i} textIndent="0.5rem">
                    {entry?.name} ({entry?.distance} km)
                  </Box>
                ))}
              </Box>
            }
            showArrow
          >
            <Box as="span" cursor="pointer">
              {items.length}
            </Box>
          </Tooltip>
        );
      };
    } else if (header.value.toLowerCase().includes("photo")) {
      column.cell = (row: any) => {
        const value = row[header.value];

        const validImage = value && value.trim() !== "" ? value : NoImage;

        return (
          <Tooltip
            showArrow
            positioning={{ placement: "bottom" }}
            content={<Image src={`${validImage}`} alt="image" width="200px" height="120px" rounded="sm" objectFit="cover" />}
          >
            <Image src={`${validImage}`} alt="image" width="85%" height="40px" objectFit="cover" rounded="sm" border="1px solid #e7e7e7" />
          </Tooltip>
        );
      };
    } else if (header.value === "discount") {
      column.cell = (row: any) => {
        const value = row[header.value];
        const display = typeof value === "number" ? `${value}%` : "N/A";
        return (
          <Tooltip content={display} positioning={{ placement: "bottom" }} openDelay={500} showArrow>
            <span>{display}</span>
          </Tooltip>
        );
      };
    } else if (header.value.toLowerCase().includes("date")) {
      column.cell = (row: any) => {
        const rawDate = row[header.value];
        const display = rawDate && moment(rawDate, moment.ISO_8601, true).isValid() ? moment(rawDate).format("DD-MMM-YYYY") : "N/A";
        return (
          <Tooltip positioning={{ placement: "bottom" }} openDelay={500} showArrow content={display}>
            <span>{display}</span>
          </Tooltip>
        );
      };
    } else if (header.value === "action") {
      column.cell = (row: T) => (
        <HStack key={index}>
          {actions.map((action, i) => {
            let icon: string | null = null;
            switch (action) {
              case "view":
                icon = IconView;
                break;
              case "edit":
                icon = IconEdit;
                break;
              case "delete":
                icon = IconDelete;
                break;
              default:
                break;
            }

            const safeIcon = icon && icon.trim() !== "" ? icon : NoImage;

            return (
              <Tooltip key={i} content={action} positioning={{ placement: "bottom" }} openDelay={500} showArrow>
                <Box boxSize="25px" rounded="sm" overflow="hidden" border="1px solid #e1e4ec">
                  <Image
                    w="100%"
                    height="100%"
                    objectFit="contain"
                    cursor="pointer"
                    src={safeIcon}
                    onClick={() => typeof events[i] === "function" && events[i](row)}
                  />
                </Box>
              </Tooltip>
            );
          })}
        </HStack>
      );
    } else {
      column.cell = (row: any) => {
        const value = getNestedValue(row, header.value);
        return (
          <Tooltip content={value ? value : "N/A"} positioning={{ placement: "bottom" }} openDelay={500} showArrow>
            <span>{value ? value : "N/A"}</span>
          </Tooltip>
        );
      };
    }

    columns.push(column);
    return null;
  });

  return columns;
}

export const customTableStyle = {
  table: {
    style: {},
  },
  headCells: {
    style: {
      backgroundColor: "#f1f3f6",
      whiteSpace: "nowrap",
      fontWeight: 800,
      fontSize: "13px",
      padding: "0 1.25rem",
    },
  },
  rows: {
    style: {},
  },
  cells: {
    style: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      padding: "0.45rem 1.25rem",
    },
  },
};

export const customTableTheme = createTheme("UTRMS", {
  background: {},
  divider: {
    default: "#EEEEEE",
  },
});
