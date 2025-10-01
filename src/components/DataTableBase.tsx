/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ReactDataTable, { type TableColumn } from "react-data-table-component";
import { Badge } from "@chakra-ui/react";
// Utils
import { generateTableHeader, customTableStyle } from "../utils/columnGenerator";
// Component
import Loading from "@/components/LoadingComponent/Loading";
// Constant
import { paginationPerPage } from "@/constants/app";

interface DataTableBaseProps<T> {
  columns: Array<{ label: string; width?: string; center?: boolean; value: string }>;
  actions?: string[];
  events?: ((row: any) => void)[];
  data: T[];
  isLoading?: boolean;
  paginationTotalRows?: number;
  onChangeRowsPerPage?: (perPage: number, page: number) => void;
  onChangePage?: (page: number) => void;
  fixedHeaderScrollHeight?: string;
  paginationDefaultPage?: number;
  pagination?: boolean;
}

export default function DataTableBase<T>({
  columns,
  actions = [],
  events = [],
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
  fixedHeaderScrollHeight,
  paginationDefaultPage,
  ...props
}: DataTableBaseProps<T>) {
  const { t } = useTranslation();
  const { data, isLoading } = props;
  const [generatedColumns, setColumns] = useState<Partial<TableColumn<T>>[]>([]);

  const memorizedData = useMemo(() => data, [data]);

  useEffect(() => {
    setColumns(generateTableHeader<T>(columns, actions, events));
  }, [columns, actions, events]);

  const paginationOptions = {
    rowsPerPageText: t("Rows per page:"),
    rangeSeparatorText: t("of"),
    selectAllRowsItem: false, // or true if you want an "All" option
    selectAllRowsItemText: t("All"),
  };

  return (
    <ReactDataTable
      key={`datatable-page-${paginationDefaultPage}`}
      customStyles={customTableStyle}
      theme="UTRMS"
      highlightOnHover
      persistTableHead
      fixedHeader
      progressPending={isLoading}
      progressComponent={<Loading />}
      noDataComponent={
        <Badge bg="red" color="#fff" m="1rem" px="0.5rem" py="0.25rem">
          {t("There are no records to display.")}
        </Badge>
      }
      fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      columns={generatedColumns}
      data={memorizedData}
      pagination={props.pagination !== false}
      paginationServer={paginationTotalRows != null}
      paginationTotalRows={paginationTotalRows}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={[paginationPerPage, 30, 45, 60, 100, 200, 500]}
      paginationDefaultPage={paginationDefaultPage}
      paginationComponentOptions={paginationOptions}
    />
  );
}
