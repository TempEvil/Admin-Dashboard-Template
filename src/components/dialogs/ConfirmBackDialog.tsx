import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "confirm_message",
  message = "are_you_sure_you_want_to_exit?",
  confirmText = "yes",
  cancelText = "no",
}: ConfirmDialogProps) => {
  const { t } = useTranslation();
  const dialogTitle = t(title);
  const dialogMessage = t(message);
  const dialogConfirmText = t(confirmText);
  const dialogCancelText = t(cancelText);

  return (
    <Dialog.Root lazyMount open={isOpen} onOpenChange={onClose} placement="center" size="sm">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content padding="1.5rem" rounded="md" gap="1rem">
            <Dialog.Header>
              <Dialog.Title fontSize="1.35rem" fontWeight="bold">
                {dialogTitle}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body fontSize="1.05rem">{dialogMessage}</Dialog.Body>
            <Dialog.Footer>
              <Flex justifyContent="flex-end" gap="0.5rem" mt={4}>
                <Button variant="outline" onClick={onClose} px="1.25rem">
                  {dialogCancelText}
                </Button>
                <Button bg="red" onClick={onConfirm} px="1.25rem">
                  {dialogConfirmText}
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
