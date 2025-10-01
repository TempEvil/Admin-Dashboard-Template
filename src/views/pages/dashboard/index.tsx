import { useState } from "react";
import ReactSelect from "react-select";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Flex, GridItem, Input, SimpleGrid, Text, useBreakpointValue } from "@chakra-ui/react";
// Styles
import { customReactSelectStyles, floatText, inputStyle } from "@/constants/styles";
// Components
import { Tooltip } from "@/components/ui/tooltip";
import DataTable from "@/components/DataTableBase";
// Icons
import { IoSearch } from "react-icons/io5";
import { TbReload } from "react-icons/tb";
// Constants
import { paginationPerPage, PRIMARY_COLOR } from "@/constants/app";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Pagination State
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(paginationPerPage);
  const [totalRows] = useState(10);
  // orderBy
  const [orderBy] = useState("createdAt:desc");

  const TestData = [{ no: 1, name: "Testing" }];

  //* Set height for table
  const scrollHeight = useBreakpointValue({
    base: "calc(100dvh - 245px)",
    md: "calc(100dvh - 230px)",
    lg: "calc(100dvh - 232px)",
  });

  //* Branch Options
  const branchOptions = [
    {
      value: 1,
      label: "testing01",
    },
    {
      value: 2,
      label: "testing02",
    },
  ];

  //* Filter useForm() for payload
  const { control, register, handleSubmit } = useForm<KeyValue>({
    defaultValues: {
      searchText: "",
      page: page,
      rowsPerPage: rowsPerPage,
      orderBy: orderBy,
    },
  });

  //* OnSubmit for filter and pagination
  const onSubmit = (data: KeyValue) => {
    console.log(data);
  };

  //* Action Handler
  const actionHandlers: Record<ActionName, (row: KeyValue) => void> = {
    view: (row) => {
      navigate(`/dashboard/view/${row.id}`, { state: { dashboard: row } });
    },
    edit: (row) => {
      navigate(`/dashboard/edit/${row.id}`, { state: { dashboard: row } });
    },
    delete: () => {},
  };
  const actionNames = ["view", "edit", "delete"] as const;
  type ActionName = (typeof actionNames)[number];
  const [actions] = useState<ActionName[]>([...actionNames]);
  const events = actions.map((action) => actionHandlers[action]);

  //* Handle Navigate Add New Page
  const navigateToAddNewPage = () => {
    navigate("/dashboard/add-new");
  };

  return (
    <SimpleGrid gap={{ base: "0.5rem", md: "1rem" }} padding={{ base: "1rem 0.5rem", md: "1rem" }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/*//? Filter Section */}
        <SimpleGrid columns={12} gap="0.75rem" mb="1rem">
          <GridItem colSpan={{ base: 12, md: 6, lg: 3 }}>
            <Box position="relative" flex={1} zIndex={999}>
              <Text {...floatText}>{t("dashboard")}</Text>
              <Input type="text" {...register("searchText")} {...inputStyle} />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6, lg: 3 }} zIndex={850}>
            <Flex gap="0.5rem">
              <Box position="relative" flex={1} zIndex={999}>
                <Text {...floatText}>{t("demo")}</Text>
                <Controller
                  name="branchId"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      placeholder={t("all")}
                      options={branchOptions}
                      isClearable
                      value={branchOptions.find((opt) => opt.value === field.value) || null}
                      onChange={(val) => field.onChange(val?.value ?? "")}
                      styles={customReactSelectStyles}
                    />
                  )}
                />
              </Box>
              <Button type="submit" bg={PRIMARY_COLOR} color="#fff" _hover={{ opacity: 0.8 }} boxSize="38px" display={{ base: "none", lg: "flex" }}>
                <IoSearch />
              </Button>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }}>
            <Flex justifyContent={{ base: "flex-end", md: "flex-start", lg: "flex-end" }} gap="0.5rem">
              <Button bg={PRIMARY_COLOR} color="#fff" _hover={{ opacity: 0.8 }} px="1rem" height="38px" onClick={navigateToAddNewPage}>
                {t("add_new")}
              </Button>
              <Tooltip content={t("reload_page")}>
                <Button bg={PRIMARY_COLOR} color="#fff" _hover={{ opacity: 0.8 }} boxSize="38px">
                  <TbReload />
                </Button>
              </Tooltip>
              <Button type="submit" bg={PRIMARY_COLOR} color="#fff" _hover={{ opacity: 0.8 }} boxSize="38px" display={{ base: "flex", lg: "none" }}>
                <IoSearch />
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
        {/*//? Table Section */}
        <SimpleGrid>
          <DataTable
            columns={[
              { label: "N°", value: "no", width: "80px" },
              { label: "name", value: "name" },
              {
                label: "action",
                value: "action",
                width: "130px",
              },
            ]}
            actions={actions}
            events={events}
            data={TestData}
            fixedHeaderScrollHeight={scrollHeight}
            pagination
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={setRowsPerPage}
            onChangePage={(page) => {
              setPage(page);
            }}
          />
        </SimpleGrid>
      </form>
    </SimpleGrid>
  );
};

export default Dashboard;
