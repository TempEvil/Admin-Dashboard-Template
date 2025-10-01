import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Field, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
// Components
import HeaderForm from "@/components/HeaderForm";
// Styles
import { inputStyle, labelStyle } from "@/constants/styles";

const DashboardView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //* Handle Back Navigate
  const handleNavigate = () => {
    navigate("/dashboard");
  };

  //* AddNew useForm()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  //* HandleSubmit - Edit
  const onHandleSubmit = async (data: KeyValue) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
      <HeaderForm title={t("view_dashboard's_information")}>
        <Button px="1rem" bg="gray.200" color="#000" _hover={{ opacity: 0.7 }} onClick={handleNavigate}>
          {t("back")}
        </Button>
      </HeaderForm>
      <SimpleGrid columns={12} gap="1rem" padding={{ base: "0.75rem", md: "1rem" }}>
        {/*//? Name */}
        <GridItem colSpan={{ base: 12, md: 6, lg: 4 }}>
          <Field.Root required invalid={!!errors.name}>
            <Field.Label {...labelStyle}>
              {t("name")}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              {...inputStyle}
              type="text"
              {...register("name", {
                required: t("name_is_required"),
              })}
              disabled
            />
            {errors.name && <Field.ErrorText>{errors.name?.message}</Field.ErrorText>}
          </Field.Root>
        </GridItem>
      </SimpleGrid>
    </form>
  );
};

export default DashboardView;
