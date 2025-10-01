  import { Portal, Flex, Text, CloseButton, Button, Dialog } from "@chakra-ui/react";
  import type { FC, ReactNode } from "react";
  import { useTranslation } from "react-i18next";

  interface ConfirmDeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: ReactNode;
    itemName?: string;
  }

  const ConfirmDeleteDialog: FC<ConfirmDeleteDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    itemName,
  }) => {
    const { t } = useTranslation();
    const dialogTitle = title || t("confirm_message");

    return (
      <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center" size="sm">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content padding="1.5rem" rounded="md" gap="1rem">
              <Dialog.Header>
                <Dialog.Title fontSize="1.35rem" fontWeight="bold" >
                  {dialogTitle}
                </Dialog.Title>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body fontSize='1.05rem'>
                {message || (
                  <>
                    {t("are_you_sure_you_want_to_delete")}{" "}
                    <Text as="span" fontWeight="bold">
                      {itemName}
                    </Text>{" "}
                    ?
                  </>
                )}
              </Dialog.Body>
              <Flex justifyContent="flex-end" gap="0.5rem" mt={4}>
                <Button variant="outline" onClick={onClose} px="1rem">
                  {t("cancel")}
                </Button>
                <Button colorScheme="red" onClick={onConfirm} px="1rem" bg="red">
                  {t("delete")}
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  };

  export default ConfirmDeleteDialog;
