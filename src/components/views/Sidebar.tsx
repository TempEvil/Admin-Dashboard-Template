/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, Box, Button, CloseButton, Dialog, Flex, Image, Menu, Portal, RadioGroup, SimpleGrid, Span, Text } from "@chakra-ui/react";
import KH from "@/assets/icons/kh-icon.png";
import EN from "@/assets/icons/en-icon.png";
// Icons
import { RiMenuUnfold2Line, RiMenuUnfoldLine } from "react-icons/ri";
import { IoLanguage } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import { LuChevronsUpDown } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
// Components
import { Tooltip } from "@/components/ui/tooltip";
// i18next
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
// Import Logo from Public folder
// import Logo from "";
// Constants
import { BG_SIDEBAR } from "@/constants/app";

const MotionBox = motion.create(Box);

const Sidebar = () => {
  //! Toggle States
  const [openDesktopMenu, setOpenDesktopMenu] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(true);
  //! Dialog
  const [isLangDialogOpen, setIsLangDialogOpen] = useState(false);

  //* Translation
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>("en");

  //* Set Language
  useEffect(() => {
    const storedValue = localStorage.getItem("language");
    if (storedValue) {
      setLanguage(storedValue);
      changeLanguage(storedValue);
    }
  }, []);

  //* Handle Change Language
  const handleRadioChange = (newValue: any) => {
    const valueStr = typeof newValue === "string" ? newValue : newValue?.value;
    if (typeof valueStr === "string") {
      setLanguage(valueStr);
      localStorage.setItem("language", valueStr);
      changeLanguage(valueStr);
    } else {
      console.warn("Unexpected radio value:", newValue);
    }
  };

  //* NavItem Style
  const navItemStyle = ({ isActive }: { isActive: boolean }) => ({
    align: "center",
    gap: "0.5rem",
    borderRadius: "0.25rem",
    px: "0.25rem",
    py: "0.5rem",
    color: isActive ? "#000" : "#fff",
    bg: isActive ? "#fff" : "transparent",
    transition: "all 0.3s",
    _hover: {
      bg: "#fff",
      color: "#000",
    },
  });

  //* Background Color - Sidebar
  const SIDEBAR_BG = BG_SIDEBAR?.trim() || "#24245e";

  //* NavItem for Sidebar
  const MenuList = [
    {
      label: t("dashboard"),
      icon: <RxDashboard />,
      url: "/dashboard",
    },
  ];

  return (
    <SimpleGrid bg={SIDEBAR_BG} position="sticky" top="0" left="0">
      {/* Desktop Menu */}
      <Box display={{ base: "none", lg: "block" }}>
        {openDesktopMenu ? (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 300, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 60, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex direction="column" width="300px" paddingInline="0.75rem" gap="1.85rem">
                <Flex direction="column-reverse" alignItems="center" justifyContent="space-between" width="100%" mt="1.05rem" gap="1.5rem">
                  <Link to="/">
                    <Box boxSize="150px" border="1px solid #fff" rounded="sm" overflow="hidden">
                      <Image src={"Logo"} alt="LOGO" width="100%" height="100%" loading="lazy" />
                    </Box>
                  </Link>
                  <Flex
                    justifyContent="flex-end"
                    width="100%"
                    fontSize="1.75rem"
                    color="#fff"
                    cursor="pointer"
                    onClick={() => setOpenDesktopMenu(!openDesktopMenu)}
                  >
                    <RiMenuUnfold2Line />
                  </Flex>
                </Flex>
                <Flex direction="column" as="ul" color="#fff" gap="0.35rem">
                  {MenuList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#fff", color: "#000" }}>
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Span fontSize="1.5rem">{item.icon}</Span>
                            <Text lineHeight="0.5" mt="0.25rem">
                              {item.label}
                            </Text>
                          </Flex>
                        </Flex>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.75rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Flex
                          width="100%"
                          bg="#fff"
                          color="#000"
                          _hover={{
                            bg: "rgba(200, 200, 200, 1)",
                            color: "black",
                          }}
                          transition="all 0.3s"
                          alignItems="center"
                          justifyContent="space-between"
                          padding="0.5rem 0.75rem"
                          rounded="sm"
                          cursor="pointer"
                        >
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box>
                              <MdOutlineSettings size="1.5rem" />
                            </Box>
                            <Span>{t("setting")}</Span>
                          </Flex>
                          <LuChevronsUpDown size="1.25rem" />
                        </Flex>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content width="225px">
                            <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)} cursor="pointer">
                              <Flex
                                width="100%"
                                alignItems="center"
                                bg="#fff"
                                gap="0.75rem"
                                color="#000"
                                padding="0.5rem 0.75rem"
                                _hover={{
                                  bg: "rgba(180, 180, 180, 0.5)",
                                  color: "black",
                                }}
                                transition="all 0.3s"
                              >
                                <IoLanguage size="1.25rem" />
                                <Text>{t("languages")}</Text>
                              </Flex>
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 60, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              exit={{ width: 300, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Flex direction="column" width="60px" paddingInline="0.6rem" gap="2.45rem">
                <Flex justifyContent="center" alignItems="center" mt="1.05rem">
                  <Box fontSize="1.75rem" color="#fff" cursor="pointer" onClick={() => setOpenDesktopMenu(!openDesktopMenu)}>
                    <RiMenuUnfoldLine />
                  </Box>
                </Flex>
                <Flex direction="column" as="ul" color="#fff" gap="0.35rem">
                  {MenuList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Tooltip content={item.label} showArrow positioning={{ placement: "right" }} openDelay={0} closeDelay={100}>
                          <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#fff", color: "#000" }}>
                            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
                              <Box fontSize="1.5rem">{item.icon}</Box>
                            </Flex>
                          </Flex>
                        </Tooltip>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.75rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Box>
                          <Tooltip content={t("setting")} positioning={{ placement: "right" }} showArrow>
                            <Flex
                              width="100%"
                              color="#fff"
                              _hover={{
                                bg: "rgba(200, 200, 200, 1)",
                                color: "black",
                              }}
                              transition="all 0.3s"
                              justifyContent="center"
                              alignItems="center"
                              rounded="sm"
                              paddingBlock="0.5rem"
                              cursor="pointer"
                            >
                              <MdOutlineSettings size="1.5rem" />
                            </Flex>
                          </Tooltip>
                        </Box>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                              <Flex
                                width="100%"
                                alignItems="center"
                                bg="#fff"
                                gap="0.75rem"
                                color="#000"
                                padding="0.5rem 0.75rem"
                                _hover={{
                                  bg: "rgba(180, 180, 180, 0.5)",
                                  color: "black",
                                }}
                                transition="all 0.3s"
                                cursor="pointer"
                              >
                                <IoLanguage size="1.25rem" />
                                <Text>{t("languages")}</Text>
                              </Flex>
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>
      {/* Mobile Menu */}
      <Box display={{ base: "block", lg: "none" }}>
        {openMobileMenu ? (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 60, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              exit={{ width: 250, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Flex direction="column" width="60px" paddingInline="0.6rem" gap="2.4rem" mt="1.15rem">
                <Flex justifyContent="center" alignItems="center">
                  <Box fontSize="1.75rem" color="#fff" cursor="pointer" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                    <RiMenuUnfoldLine />
                  </Box>
                </Flex>
                <Flex direction="column" as="ul" color="#fff" gap="0.35rem">
                  {MenuList.map((item, index) => (
                    <NavLink to={item.url} key={index}>
                      {({ isActive }) => (
                        <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#fff", color: "#000" }}>
                          <Tooltip content={item.label} showArrow positioning={{ placement: "right" }} openDelay={0} closeDelay={100}>
                            <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
                              <Box fontSize="1.5rem">{item.icon}</Box>
                            </Flex>
                          </Tooltip>
                        </Flex>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.75rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Box>
                          <Tooltip content={t("setting")} positioning={{ placement: "right" }} showArrow>
                            <Flex
                              width="100%"
                              color="#fff"
                              _hover={{
                                bg: "rgba(200, 200, 200, 1)",
                                color: "black",
                              }}
                              transition="all 0.3s"
                              justifyContent="center"
                              alignItems="center"
                              rounded="sm"
                              paddingBlock="0.5rem"
                              cursor="pointer"
                            >
                              <MdOutlineSettings size="1.5rem" />
                            </Flex>
                          </Tooltip>
                        </Box>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)}>
                              <Flex
                                width="100%"
                                alignItems="center"
                                bg="#fff"
                                gap="0.75rem"
                                color="#000"
                                padding="0.5rem 0.75rem"
                                _hover={{
                                  bg: "rgba(180, 180, 180, 0.5)",
                                  color: "black",
                                }}
                                transition="all 0.3s"
                                cursor="pointer"
                              >
                                <IoLanguage size="1.25rem" />
                                <Text>{t("languages")}</Text>
                              </Flex>
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <MotionBox
              overflow="hidden"
              initial={{ width: 250, opacity: 0 }}
              animate={{ width: 250, opacity: 1 }}
              exit={{ width: 60, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex direction="column" width="250px" paddingInline="0.75rem" gap="1.5rem">
                <Flex direction="column-reverse" alignItems="center" justifyContent="space-between" width="100%" mt="1rem">
                  <Link to="/">
                    <Box boxSize="120px" border="1px solid #fff" rounded="sm" overflow="hidden">
                      <Image src={"Logo"} alt="LOGO" width="100%" height="100%" loading="lazy" />
                    </Box>
                  </Link>
                  <Flex
                    width="100%"
                    justifyContent="flex-end"
                    mb="1.5rem"
                    fontSize="1.75rem"
                    color="#fff"
                    cursor="pointer"
                    onClick={() => setOpenMobileMenu(!openMobileMenu)}
                  >
                    <RiMenuUnfold2Line />
                  </Flex>
                </Flex>
                <Flex direction="column" as="ul" color="#fff" gap="0.35rem">
                  {MenuList.map((item, index) => (
                    <NavLink to={item.url} key={index} onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                      {({ isActive }) => (
                        <Flex as="li" {...navItemStyle({ isActive })} _hover={{ bg: "#fff", color: "#000" }}>
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box fontSize="1.5rem">{item.icon}</Box>
                            <Span>{item.label}</Span>
                          </Flex>
                        </Flex>
                      )}
                    </NavLink>
                  ))}
                </Flex>
                <Box position="absolute" bottom="0" left="0" paddingInline="0.75rem" mb="0.75rem" width="100%">
                  <SimpleGrid width="100%">
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Flex
                          width="100%"
                          bg="#fff"
                          color="#000"
                          _hover={{
                            bg: "rgba(200, 200, 200, 1)",
                            color: "black",
                          }}
                          transition="all 0.3s"
                          alignItems="center"
                          justifyContent="space-between"
                          padding="0.5rem 0.75rem"
                          rounded="sm"
                          cursor="pointer"
                        >
                          <Flex justifyContent="center" alignItems="center" gap="0.5rem" height="100%">
                            <Box>
                              <MdOutlineSettings size="1.5rem" />
                            </Box>
                            <Span>{t("setting")}</Span>
                          </Flex>
                          <LuChevronsUpDown size="1.25rem" />
                        </Flex>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content width="225px">
                            <Menu.Item value="language" onSelect={() => setIsLangDialogOpen(true)} cursor="pointer">
                              <Flex
                                width="100%"
                                alignItems="center"
                                bg="#fff"
                                gap="0.75rem"
                                color="#000"
                                padding="0.5rem 0.75rem"
                                _hover={{
                                  bg: "rgba(180, 180, 180, 0.5)",
                                  color: "black",
                                }}
                                transition="all 0.3s"
                              >
                                <IoLanguage size="1.25rem" />
                                <Text>{t("languages")}</Text>
                              </Flex>
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </SimpleGrid>
                </Box>
              </Flex>
            </MotionBox>
          </AnimatePresence>
        )}
      </Box>
      {/*//? Language Dialog */}
      <Dialog.Root open={isLangDialogOpen} onOpenChange={({ open }) => setIsLangDialogOpen(open)} placement="center" motionPreset="none">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content padding="1.25rem" gap="1.25rem">
              <Dialog.Header>
                <Dialog.Title>{t("choose_language")}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <RadioGroup.Root defaultValue={language} onValueChange={handleRadioChange}>
                  <Flex direction="column" gap="1rem">
                    <RadioGroup.Item value="kh">
                      <RadioGroup.ItemHiddenInput />
                      <Flex width="100%" justifyContent="space-between" alignItems="center">
                        <RadioGroup.ItemText>
                          <Flex alignItems="center" gap="0.5rem">
                            <Avatar.Root shape="full" size="lg">
                              <Avatar.Fallback name="Khmer" />
                              <Avatar.Image src={KH} />
                            </Avatar.Root>
                            <Text>{t("khmer")}</Text>
                          </Flex>
                        </RadioGroup.ItemText>
                        <RadioGroup.ItemIndicator
                          boxSize="1rem"
                          rounded="full"
                          bg="transparent"
                          border="2px solid black"
                          _checked={{
                            bg: SIDEBAR_BG,
                            borderColor: SIDEBAR_BG,
                          }}
                        />
                      </Flex>
                    </RadioGroup.Item>
                    <RadioGroup.Item value="en">
                      <RadioGroup.ItemHiddenInput />
                      <Flex width="100%" justifyContent="space-between" alignItems="center">
                        <RadioGroup.ItemText>
                          <Flex alignItems="center" gap="0.5rem">
                            <Avatar.Root shape="full" size="lg">
                              <Avatar.Fallback name="English" />
                              <Avatar.Image src={EN} />
                            </Avatar.Root>
                            <Text>{t("english")}</Text>
                          </Flex>
                        </RadioGroup.ItemText>
                        <RadioGroup.ItemIndicator
                          boxSize="1rem"
                          rounded="full"
                          bg="transparent"
                          border="2px solid black"
                          _checked={{
                            bg: SIDEBAR_BG,
                            borderColor: SIDEBAR_BG,
                          }}
                        />
                      </Flex>
                    </RadioGroup.Item>
                  </Flex>
                </RadioGroup.Root>
              </Dialog.Body>
              <Dialog.Footer>
                <Button px="0.5rem" onClick={() => setIsLangDialogOpen(false)} bg={SIDEBAR_BG} _hover={{ bg: SIDEBAR_BG, opacity: 0.65 }}>
                  {t("close")}
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </SimpleGrid>
  );
};

export default Sidebar;
