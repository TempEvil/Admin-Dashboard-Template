import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Field, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
// Components
import ConfirmDialog from "@/components/dialogs/ConfirmBackDialog";
import HeaderForm from "@/components/HeaderForm";
// Constant
import { PRIMARY_COLOR } from "@/constants/app";
// Styles
import { inputStyle, labelStyle } from "@/constants/styles";

const DashboardAddNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Confirm Back Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //* Handle Confirm Back
  const handleConfirmBack = () => {
    setIsDialogOpen(false);
    navigate("/dashboard");
  };

  //* AddNew useForm()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  //* HandleSubmit - Add New
  const onHandleSubmit = async (data: KeyValue) => {
    console.log(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)} noValidate>
      <HeaderForm title={t("add_new_dashboard")}>
        <Button px="1rem" bg="gray.200" color="#000" _hover={{ opacity: 0.7 }} onClick={() => setIsDialogOpen(true)}>
          {t("back")}
        </Button>
        <Button type="submit" px="1rem" bg={PRIMARY_COLOR} color="#fff" _hover={{ opacity: 0.7 }} disabled={!isDirty}>
          {t("create")}
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
            />
            {errors.name && <Field.ErrorText>{errors.name?.message}</Field.ErrorText>}
          </Field.Root>
        </GridItem>
      </SimpleGrid>
      {/*//? Confirm Back Dialog */}
      <ConfirmDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onConfirm={handleConfirmBack} />
    </form>
  );
};

export default DashboardAddNew;
